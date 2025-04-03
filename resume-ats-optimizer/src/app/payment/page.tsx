'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface PricingOption {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  type: 'one-time' | 'subscription';
}

const pricingOptions: PricingOption[] = [
  {
    id: 'resume-optimization-single',
    name: 'Single Resume',
    description: 'Perfect for one-time optimization',
    price: '$19.99',
    features: [
      'ATS compatibility analysis',
      'Keyword optimization',
      'Formatting improvements',
      'Downloadable in multiple formats',
      'Detailed improvement report',
    ],
    type: 'one-time',
  },
  {
    id: 'resume-optimization-unlimited',
    name: 'Unlimited Access',
    description: 'Best for active job seekers',
    price: '$9.99/month',
    features: [
      'All Single Resume features',
      'Unlimited resume optimizations',
      'Multiple resume versions',
      'Priority support',
      'Cancel anytime',
    ],
    type: 'subscription',
  },
];

export default function PaymentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleCheckout = async (productId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/payment/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      // Here you would show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Choose Your Plan</h1>
        <p className="text-gray-600 text-center mb-8">
          Select the plan that best fits your needs and start optimizing your resume today.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {pricingOptions.map((option) => (
            <div
              key={option.id}
              className={`bg-white rounded-lg shadow-sm p-6 border-2 ${
                selectedOption === option.id
                  ? 'border-blue-600'
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              <h2 className="text-2xl font-semibold mb-2">{option.name}</h2>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold">{option.price}</span>
                {option.type === 'subscription' && (
                  <span className="text-gray-500 ml-1">per month</span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(option.id)}
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner className="w-5 h-5 mr-2" />
                    Processing...
                  </div>
                ) : (
                  `Get Started${option.type === 'subscription' ? ' - Monthly' : ''}`
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">100% Satisfaction Guarantee</h3>
          <p className="text-gray-600">
            Not satisfied with our service? Get a full refund within 30 days, no questions asked.
          </p>
        </div>
      </div>
    </main>
  );
} 