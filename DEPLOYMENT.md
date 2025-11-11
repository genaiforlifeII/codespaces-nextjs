# 📈 Stock Signals Platform

A complete, production-ready Next.js web application for delivering stock trading signals with subscription management, user authentication, and admin dashboard.

## ✨ Features

### Core Features
- 🎯 **Stock Trading Signals** - Expert analysis and real-time trading signals
- 💳 **Subscription Management** - Free (5 signals/day) and Premium ($9/month unlimited) tiers
- 🔐 **Secure Authentication** - Auth0 integration with role-based access control
- 💰 **Payment Processing** - Stripe integration for subscriptions
- 📊 **Admin Dashboard** - Comprehensive user management and analytics
- 📱 **Multi-Channel Delivery** - Discord (active), Telegram & WhatsApp (coming soon)
- 🎨 **Responsive Design** - Mobile-first design with Tailwind CSS

### Technical Features
- ⚡ **Next.js 14** with TypeScript
- 🗄️ **MongoDB** database with connection pooling
- 🔒 **Security Best Practices** - HTTPS, secure headers, CSRF protection
- 🚀 **Production Ready** - Docker, PM2, Nginx configurations included
- 📈 **Analytics Ready** - Google Analytics integration
- 🌍 **SEO Optimized** - Meta tags, Open Graph, sitemap support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 7+
- Auth0 account
- Stripe account

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and fill in your credentials:
   - Auth0 credentials
   - Stripe API keys
   - MongoDB connection string
   - Discord invite link
   - Admin user emails

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🔧 Configuration

### Auth0 Setup

1. Create an Auth0 application (Regular Web Application)
2. Configure Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
3. Configure Allowed Logout URLs: `http://localhost:3000`
4. Copy credentials to `.env`

### Stripe Setup

1. Create a Stripe account
2. Create a Premium product with recurring pricing ($9/month)
3. Copy the Price ID and API keys to `.env`
4. Setup webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`

### MongoDB Setup

**Local:** `mongodb://localhost:27017/stock-signals`  
**Atlas:** `mongodb+srv://username:password@cluster.mongodb.net/stock-signals`

## 🌐 Deployment to VPS/Cloud

### Automatic Deployment

```bash
# SSH into your server
ssh user@your-server-ip

# Clone and deploy
cd /var/www
git clone <your-repo> stock-signals
cd stock-signals
chmod +x deploy.sh
./deploy.sh
```

### Docker Deployment

```bash
docker-compose up -d
```

### PM2 Commands

```bash
npm run pm2:start    # Start
npm run pm2:stop     # Stop
npm run pm2:restart  # Restart
pm2 logs             # View logs
```

## 📁 Project Structure

```
├── components/      # React components
├── pages/          # Next.js pages and API routes
├── lib/            # Utilities and configurations
├── types/          # TypeScript definitions
├── styles/         # Global styles
├── public/         # Static assets
└── deploy.sh       # Deployment script
```

## 🔒 Security

- Never commit `.env` files
- Always use HTTPS in production
- Auth0 handles authentication
- Stripe handles payment processing
- Role-based admin access control

## 📊 Admin Dashboard

Access at `/admin` (requires admin email in `ADMIN_USERS`):
- View all users and subscriptions
- Monitor activity logs
- Manage user accounts

## ⚠️ Disclaimer

**This platform provides stock trading signals for educational purposes only.** Trading involves risk and may result in losses. This is not financial advice.

## 🎯 Roadmap

- [ ] Telegram integration
- [ ] WhatsApp integration  
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Mobile app

---

Built with ❤️ using Next.js, Auth0, Stripe, and MongoDB
