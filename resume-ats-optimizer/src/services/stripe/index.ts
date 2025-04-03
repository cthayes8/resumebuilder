import Stripe from 'stripe';
import { config } from '@/config';

export interface PaymentProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: 'one-time' | 'subscription';
}

export interface PaymentSession {
  id: string;
  url: string;
  status: string;
}

export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(config.stripe.secretKey, {
      apiVersion: '2025-03-31.basil',
    });
  }

  async createCheckoutSession(
    product: PaymentProduct,
    successUrl: string,
    cancelUrl: string
  ): Promise<PaymentSession> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: product.currency,
              product_data: {
                name: product.name,
                description: product.description,
              },
              unit_amount: product.price,
              recurring: product.type === 'subscription' ? {
                interval: 'month',
              } : undefined,
            },
            quantity: 1,
          },
        ],
        mode: product.type === 'subscription' ? 'subscription' : 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      return {
        id: session.id,
        url: session.url || '',
        status: session.status || 'created',
      };
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      throw new Error('Failed to create checkout session');
    }
  }

  async createCustomer(email: string, name: string): Promise<string> {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
      });

      return customer.id;
    } catch (error) {
      console.error('Failed to create customer:', error);
      throw new Error('Failed to create customer');
    }
  }

  async getSubscriptionStatus(subscriptionId: string): Promise<string> {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
      return subscription.status;
    } catch (error) {
      console.error('Failed to get subscription status:', error);
      throw new Error('Failed to get subscription status');
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    try {
      await this.stripe.subscriptions.cancel(subscriptionId);
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      throw new Error('Failed to cancel subscription');
    }
  }

  async handleWebhook(
    body: string | Buffer,
    signature: string
  ): Promise<{ type: string; data: any }> {
    try {
      const event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        config.stripe.webhookSecret
      );

      return {
        type: event.type,
        data: event.data.object,
      };
    } catch (error) {
      console.error('Failed to handle webhook:', error);
      throw new Error('Failed to handle webhook');
    }
  }
} 