# 🚀 Stock Signals Platform - Setup Instructions

Complete step-by-step guide to get your Stock Signals platform up and running.

## 📋 Prerequisites Checklist

Before you begin, ensure you have:

- [ ] Node.js 18 or higher installed
- [ ] MongoDB installed (local) or MongoDB Atlas account (cloud)
- [ ] Auth0 account (free tier available)
- [ ] Stripe account (test mode is free)
- [ ] A domain name (for production deployment)
- [ ] VPS/Cloud server (for deployment)

## 🔧 Step 1: Initial Setup

### 1.1 Install Dependencies

```bash
npm install
```

### 1.2 Create Environment File

```bash
cp .env.example .env
```

## 🔐 Step 2: Auth0 Configuration

### 2.1 Create Auth0 Application

1. Go to https://auth0.com and sign up/login
2. Navigate to Applications > Create Application
3. Choose "Regular Web Application"
4. Name it "Stock Signals Platform"

### 2.2 Configure Application Settings

In your Auth0 application settings:

**Allowed Callback URLs:**
```
http://localhost:3000/api/auth/callback
https://yourdomain.com/api/auth/callback
```

**Allowed Logout URLs:**
```
http://localhost:3000
https://yourdomain.com
```

**Allowed Web Origins:**
```
http://localhost:3000
https://yourdomain.com
```

### 2.3 Add to .env

```env
AUTH0_SECRET=<generate-a-32-char-random-string>
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://YOUR_DOMAIN.auth0.com
AUTH0_CLIENT_ID=<your-client-id>
AUTH0_CLIENT_SECRET=<your-client-secret>
```

**Generate AUTH0_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 💳 Step 3: Stripe Configuration

### 3.1 Create Stripe Account

1. Go to https://stripe.com and sign up
2. Activate your account
3. Switch to Test Mode (toggle in top right)

### 3.2 Create Premium Product

1. Go to Products > Add Product
2. Name: "Premium Subscription"
3. Price: $9.00 USD
4. Billing period: Monthly
5. Click "Save product"
6. Copy the Price ID (starts with `price_`)

### 3.3 Get API Keys

1. Go to Developers > API keys
2. Copy your **Publishable key** and **Secret key**

### 3.4 Setup Webhook

1. Go to Developers > Webhooks > Add endpoint
2. Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
3. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the **Signing secret**

### 3.5 Add to .env

```env
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_ID_PREMIUM=price_xxxxx
```

## 🗄️ Step 4: MongoDB Configuration

### Option A: Local MongoDB

```bash
# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

Add to .env:
```env
MONGODB_URI=mongodb://localhost:27017/stock-signals
```

### Option B: MongoDB Atlas (Cloud)

1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Create a database user
4. Add your IP to whitelist (or 0.0.0.0/0 for testing)
5. Click "Connect" > "Connect your application"
6. Copy connection string

Add to .env:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stock-signals
```

## 📱 Step 5: Discord Integration

### 5.1 Create Discord Server

1. Create a new Discord server for your trading signals
2. Create channels: #signals, #announcements, #general
3. Generate an invite link

### 5.2 Add to .env

```env
NEXT_PUBLIC_DISCORD_INVITE=https://discord.gg/your-invite-code
```

## 👨‍💼 Step 6: Admin Configuration

Add admin user emails to .env (comma-separated):

```env
ADMIN_USERS=admin@example.com,another-admin@example.com
```

These users will have access to the admin dashboard at `/admin`.

## 📊 Step 7: Google Analytics (Optional)

1. Go to https://analytics.google.com
2. Create a new property
3. Copy your Measurement ID (G-XXXXXXXXXX)

Add to .env:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🎯 Step 8: Complete .env Example

Your final .env should look like:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Auth0
AUTH0_SECRET=your-32-char-secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_ID_PREMIUM=price_xxxxx

# MongoDB
MONGODB_URI=mongodb://localhost:27017/stock-signals

# Discord
NEXT_PUBLIC_DISCORD_INVITE=https://discord.gg/xxxxx

# Admin
ADMIN_USERS=admin@example.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Rate Limiting
FREE_TIER_DAILY_LIMIT=5
PREMIUM_TIER_DAILY_LIMIT=999999
```

## ▶️ Step 9: Run the Application

### Development Mode

```bash
npm run dev
```

Open http://localhost:3000

### Test the Application

1. **Visit homepage** - Should see landing page
2. **Click "Sign In"** - Auth0 login should work
3. **Access dashboard** - See your user dashboard
4. **Test upgrade** - Click upgrade (use Stripe test card: 4242 4242 4242 4242)
5. **Access admin** - If you're an admin, visit `/admin`

## 🚀 Step 10: Production Deployment

### Option A: VPS Deployment

```bash
# SSH into your server
ssh user@your-server-ip

# Clone repository
cd /var/www
git clone <your-repo> stock-signals
cd stock-signals

# Create .env with production values
nano .env

# Run deployment script
chmod +x deploy.sh
./deploy.sh
```

### Option B: Docker Deployment

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f
```

## 🔍 Troubleshooting

### Auth0 Issues
- **Callback error**: Check callback URLs match exactly
- **Login loop**: Verify AUTH0_SECRET is set correctly
- **Session errors**: Clear cookies and try again

### Stripe Issues
- **Webhook not working**: Ensure webhook secret is correct
- **Payment not processing**: Verify you're in test mode
- **Subscription not updating**: Check webhook events are configured

### MongoDB Issues
- **Connection refused**: Ensure MongoDB is running
- **Authentication failed**: Check username/password in connection string
- **Network error**: Whitelist your IP in MongoDB Atlas

### Build Issues
- **Type errors**: Run `npm install` to ensure all dependencies are installed
- **Module not found**: Check import paths and ensure files exist
- **Port in use**: Kill process on port 3000 or use different port

## 📚 Next Steps

1. **Customize branding** - Update colors, logo, and text
2. **Add trading signals** - Implement your signal generation logic
3. **Test webhooks** - Use Stripe CLI for local webhook testing
4. **Setup monitoring** - Add error tracking and uptime monitoring
5. **Configure SSL** - Use Let's Encrypt for HTTPS
6. **Optimize performance** - Enable caching and CDN

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review environment variables
3. Check application logs: `pm2 logs` or `docker-compose logs`
4. Verify all services are running

---

🎉 Congratulations! Your Stock Signals platform should now be running!
