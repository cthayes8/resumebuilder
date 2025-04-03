'use client';

import { useRouter } from 'next/navigation';

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-gray-600 mb-8">
            Your payment was cancelled. If you have any questions or concerns,
            please don't hesitate to contact our support team.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/payment')}
              className="inline-flex items-center justify-center py-3 px-6 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center justify-center py-3 px-6 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Return Home
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <p className="text-gray-600">
            Our support team is available 24/7 to assist you with any questions.
            Contact us at{' '}
            <a
              href="mailto:support@resumeoptimizer.com"
              className="text-blue-600 hover:text-blue-700"
            >
              support@resumeoptimizer.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
} 