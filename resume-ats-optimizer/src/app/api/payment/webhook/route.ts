import { NextRequest, NextResponse } from 'next/server';
import { StripeService } from '@/services/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    const stripeService = new StripeService();
    const event = await stripeService.handleWebhook(body, signature);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        // Handle successful payment
        const session = event.data;
        console.log('Payment successful:', session.id);
        // Here you would:
        // 1. Update user's subscription status
        // 2. Grant access to premium features
        // 3. Send confirmation email
        break;

      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        const subscription = event.data;
        console.log('Subscription cancelled:', subscription.id);
        // Here you would:
        // 1. Update user's subscription status
        // 2. Revoke access to premium features
        break;

      case 'payment_intent.payment_failed':
        // Handle failed payment
        const paymentIntent = event.data;
        console.log('Payment failed:', paymentIntent.id);
        // Here you would:
        // 1. Notify the user
        // 2. Update payment status
        break;

      // Add more event handlers as needed
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
} 