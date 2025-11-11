# 🚀 Quick Start Guide

Get your Stock Signals platform running in 5 minutes!

## ⚡ Prerequisites

- Node.js 18+
- MongoDB (or MongoDB Atlas account)
- Auth0 account
- Stripe account

## 📝 Quick Setup

### 1. Install Dependencies (1 min)

```bash
npm install
```

### 2. Configure Environment (2 min)

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
- Auth0: domain, client ID, client secret
- Stripe: API keys, webhook secret
- MongoDB: connection string
- Discord: invite link (optional)

**Don't have credentials yet?** See detailed setup in [SETUP.md](./SETUP.md)

### 3. Run Development Server (30 sec)

```bash
npm run dev
```

Visit: http://localhost:3000

## 🎯 Test the Platform

1. **View Landing Page** - http://localhost:3000
2. **Sign In** - Click "Sign In" button
3. **View Dashboard** - After login, see your dashboard
4. **Test Upgrade** - Try the premium upgrade flow
5. **Admin Panel** - Visit /admin (if you're an admin)

## 🔑 Test Credentials

### Stripe Test Card
```
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

## 📚 Documentation

- **Complete Setup**: See [SETUP.md](./SETUP.md)
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Project Overview**: See [PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md)

## 🚀 Deploy to Production

### VPS/Cloud Server

```bash
ssh user@your-server
cd /var/www
git clone <your-repo> stock-signals
cd stock-signals
nano .env  # Add production credentials
./deploy.sh
```

### Docker

```bash
docker-compose up -d
```

## ❓ Need Help?

1. Check [SETUP.md](./SETUP.md) for detailed instructions
2. Review the [PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md)
3. Verify all environment variables are set correctly

## ✅ Checklist

- [ ] Dependencies installed
- [ ] `.env` file configured
- [ ] Auth0 application created
- [ ] Stripe products created
- [ ] MongoDB running
- [ ] Development server started
- [ ] Able to sign in
- [ ] Dashboard accessible

---

🎉 **You're all set!** Start building your trading signals platform!
