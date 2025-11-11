#!/bin/bash

# Deployment script for VPS/Hostinger

set -e

echo "🚀 Starting deployment..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt-get update

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install PM2 globally if not present
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
fi

# Install MongoDB if not present
if ! command -v mongod &> /dev/null; then
    echo "📦 Installing MongoDB..."
    wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
    sudo systemctl start mongod
    sudo systemctl enable mongod
fi

# Navigate to app directory
cd /var/www/stock-signals || exit

# Pull latest changes
echo "📥 Pulling latest changes from Git..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Build application
echo "🏗️ Building application..."
npm run build

# Setup environment
if [ ! -f .env ]; then
    echo "⚠️ .env file not found. Please create one based on .env.example"
    exit 1
fi

# Create logs directory
mkdir -p logs

# Restart application with PM2
echo "🔄 Restarting application..."
pm2 stop stock-signals-platform || true
pm2 start ecosystem.config.js
pm2 save

# Setup PM2 startup script
sudo pm2 startup systemd -u $USER --hp $HOME

# Setup Nginx if not already configured
if [ ! -f /etc/nginx/sites-available/stock-signals ]; then
    echo "🌐 Setting up Nginx..."
    sudo cp nginx.conf /etc/nginx/sites-available/stock-signals
    sudo ln -s /etc/nginx/sites-available/stock-signals /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx
fi

# Setup SSL with Let's Encrypt (optional)
if ! sudo test -d /etc/letsencrypt/live/your-domain.com; then
    echo "🔒 Would you like to setup SSL with Let's Encrypt? (y/n)"
    read -r setup_ssl
    if [ "$setup_ssl" = "y" ]; then
        sudo apt-get install -y certbot python3-certbot-nginx
        sudo certbot --nginx -d your-domain.com -d www.your-domain.com
    fi
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Application is running on http://localhost:3000"
echo "📊 View logs with: pm2 logs stock-signals-platform"
echo "📈 Monitor with: pm2 monit"
