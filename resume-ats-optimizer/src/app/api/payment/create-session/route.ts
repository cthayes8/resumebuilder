import { NextRequest, NextResponse } from 'next/server';
import { StripeService } from '@/services/stripe';
import { config } from '@/config';

const products = {
  oneTime: {
    id: 'resume-optimization-single',
    name: 'Resume Optimization',
    description: 'One-time resume optimization with ATS analysis',
    price: 1999, // $19.99
    currency: 'usd',
    type: 'one-time' as const,
  },
  subscription: {
    id: 'resume-optimization-unlimited',
    name: 'Unlimited Resume Optimization',
    description: 'Monthly subscription for unlimited resume optimizations',
    price: 999, // $9.99
    currency: 'usd',
    type: 'subscription' as const,
  },
};

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();

    // Validate product selection
    const product = Object.values(products).find(p => p.id === productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Invalid product selected' },
        { status: 400 }
      );
    }

    const stripeService = new StripeService();
    const baseUrl = request.headers.get('origin') || config.app.baseUrl;

    const session = await stripeService.createCheckoutSession(
      product,
      `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      `${baseUrl}/payment/cancel`
    );

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Payment session creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    );
  }
} 