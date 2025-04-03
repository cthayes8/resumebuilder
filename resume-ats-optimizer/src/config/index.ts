export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
  },
  app: {
    name: 'Resume ATS Optimizer',
    description: 'Optimize your resume for Applicant Tracking Systems',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['pdf', 'docx'] as const,
} as const;

export type Config = typeof config; 