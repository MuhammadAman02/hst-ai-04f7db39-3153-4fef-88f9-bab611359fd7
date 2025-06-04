import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

// Stripe configuration
export const stripeConfig = {
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
  secretKey: import.meta.env.STRIPE_SECRET_KEY,
};

// Mock payment processing function (in a real app, this would be handled by your backend)
export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  console.log('Creating payment intent for:', { amount, currency });
  
  // In a real application, you would make an API call to your backend
  // which would create a payment intent using the Stripe secret key
  // For demo purposes, we'll simulate this
  
  if (!stripeConfig.publishableKey || stripeConfig.publishableKey === 'your_stripe_publishable_key_here') {
    throw new Error('Stripe publishable key not configured');
  }
  
  // Mock response - in reality this comes from your backend
  return {
    client_secret: 'pi_mock_client_secret_' + Math.random().toString(36).substr(2, 9),
    amount,
    currency,
  };
};

// Product configurations
export const products = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 999, // $9.99 in cents
    description: 'Perfect for getting started with AI',
    features: [
      '100 AI text generations per month',
      '10 AI image generations per month',
      'Basic support',
      'Standard response time'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 2999, // $29.99 in cents
    description: 'For power users and professionals',
    features: [
      'Unlimited AI text generations',
      '100 AI image generations per month',
      'Priority support',
      'Faster response time',
      'Advanced AI models'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 9999, // $99.99 in cents
    description: 'For teams and large organizations',
    features: [
      'Unlimited everything',
      'Custom AI model training',
      'Dedicated support',
      'API access',
      'Custom integrations'
    ]
  }
];