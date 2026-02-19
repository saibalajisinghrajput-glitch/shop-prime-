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
| `VITE_RAZORPAY_KEY_ID` | `rzp_live_SHrEMkovoCPgzC` | Production |
| `MONGODB_URI` | Your MongoDB connection string | Production |
| `JWT_SECRET` | Your JWT secret key | Production |
| `NODE_ENV` | `production` | Production |

**Note:** `VITE_RAZORPAY_KEY_ID` is the client-side key (safe to expose, starts with `rzp_live_` or `rzp_test_`). `RAZORPAY_KEY_SECRET` stays server-side only.

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

## Troubleshooting - 400 Bad Request Error

If you see `400 (Bad Request)` from Razorpay, check these:

### 1. Domain Whitelisting (Most Common Issue)
Razorpay requires your domain to be whitelisted:

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate to **Settings** → **API Keys**
3. Click on the key you're using (live or test)
4. Add your domain to **Allowed Domains**:
   - `https://shop-prime.vercel.app`
   - `https://*.vercel.app` (for preview deployments)

### 2. Check API Key Format
- Live keys start with: `rzp_live_`
- Test keys start with: `rzp_test_`
- Make sure there's no extra whitespace or quotes

### 3. Backend Deployment Issues
The 400 error might mean the backend isn't creating the order properly:

1. Check Vercel Functions logs:
   - Go to Vercel Dashboard → Your Project → Functions
   - Look for `/api/payment/create-order` errors

2. Verify environment variables are set:
   ```bash
   # In Vercel dashboard, check these are set:
   RAZORPAY_KEY_ID=rzp_live_SHrEMkovoCPgzC
   RAZORPAY_KEY_SECRET=DHV5FyQU5o7tW4qGU3K0dUqt
   MONGODB_URI=your_mongodb_uri
   ```

3. Test the backend directly:
   ```bash
   curl https://shop-prime.vercel.app/api/health
   # Should return: {"status":"ok","message":"ShopPrime API is running"}
   ```

### 4. Quick Fix Steps

1. **Whitelist domain in Razorpay** (most important!)
2. **Redeploy after adding env vars:**
   ```bash
   git add .
   git commit -m "Fix Razorpay integration"
   git push
   ```
3. **Clear browser cache** and try again

### 5. Alternative: Use Test Mode
If live mode isn't working, switch to test mode:

1. In Razorpay Dashboard, switch to **Test Mode**
2. Copy test keys (start with `rzp_test_`)
3. Update Vercel environment variables with test keys
4. Test with these UPI IDs:
   - `success@razorpay` - Simulates successful payment
   - `failure@razorpay` - Simulates failed payment

## Support

If issues persist:
- Razorpay Support: support@razorpay.com
- Check [Razorpay Docs](https://razorpay.com/docs/)
