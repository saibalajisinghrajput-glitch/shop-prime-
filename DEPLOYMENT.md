# Deployment Guide - Razorpay Integration

## Environment Variables Setup

### For Vercel Deployment:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your "shop-prime-" project
3. Navigate to **Settings** → **Environment Variables**
4. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `RAZORPAY_KEY_ID` | `rzp_live_SHrEMkovoCPgzC` | Production |
| `RAZORPAY_KEY_SECRET` | `DHV5FyQU5o7tW4qGU3K0dUqt` | Production |
| `MONGODB_URI` | Your MongoDB connection string | Production |
| `JWT_SECRET` | Your JWT secret key | Production |
| `NODE_ENV` | `production` | Production |

5. Click **Save**
6. Redeploy the project (Vercel will automatically redeploy with new variables)

### For Local Development:

Create a `server/.env` file:

```env
RAZORPAY_KEY_ID=rzp_test_your_test_key
RAZORPAY_KEY_SECRET=your_test_secret
MONGODB_URI=mongodb://localhost:27017/shopprime
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
```

**Note:** Use test keys for local development, live keys only for production.

## Testing the Payment Flow

1. Add items to cart
2. Go to checkout
3. Select "UPI Payment" as payment method
4. Enter any UPI ID (format: `name@upi`)
5. Click "Place Order"
6. On the payment page, click "Pay" button
7. Razorpay checkout will open with multiple payment options:
   - UPI (Google Pay, PhonePe, Paytm, etc.)
   - Credit/Debit Cards
   - Net Banking
   - Wallets

## Important Security Notes

- **Never commit `.env` files to git** - they are already in `.gitignore`
- **Never share API secrets in public channels**
- **Use test keys for development** - Live keys process real money
- **Enable 2FA on your Razorpay account**

## Razorpay Dashboard

Monitor payments at: [dashboard.razorpay.com](https://dashboard.razorpay.com)

- View all transactions
- Check payment status
- Process refunds
- Download reports
