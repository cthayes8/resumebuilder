'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Auth as AuthComponent } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSupabase } from '@/contexts/SupabaseContext';

interface AuthProps {
  view?: 'sign_in' | 'sign_up' | 'magic_link' | 'forgotten_password';
  showHeader?: boolean;
}

export function Auth({ view = 'sign_in', showHeader = true }: AuthProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { supabase, user } = useSupabase();

  useEffect(() => {
    if (user) {
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      router.push(redirectTo);
    }
  }, [user, router, searchParams]);

  // Get the current URL for the redirect
  const redirectUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/auth/callback`
    : '/auth/callback';

  return (
    <div className="w-full">
      {showHeader && (
        <div className="flex flex-col space-y-2 text-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            {view === 'sign_up' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {view === 'sign_up' 
              ? 'Enter your email below to create your account and start optimizing'
              : 'Enter your email to sign in to your account'}
          </p>
        </div>
      )}
      <AuthComponent
        supabaseClient={supabase.client}
        view={view}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#000000',
                brandAccent: '#333333',
                brandButtonText: 'white',
                defaultButtonBackground: '#000000',
                defaultButtonBackgroundHover: '#333333',
                defaultButtonBorder: '#000000',
                defaultButtonText: 'white',
                inputBackground: 'white',
                inputBorder: '#e2e8f0',
                inputText: '#000000',
                inputPlaceholder: '#a0aec0',
              },
            },
          },
          className: {
            container: 'w-full',
            button: 'w-full bg-black text-white hover:bg-gray-800 py-2 rounded-md font-medium shadow-sm',
            input: 'bg-background border border-gray-300 rounded-md px-3 py-2',
            divider: 'my-4',
            message: 'text-sm text-muted-foreground text-center',
          },
        }}
        providers={['google']}
        redirectTo={redirectUrl}
        localization={{
          variables: {
            sign_up: {
              email_label: 'Email',
              password_label: 'Create a password',
              button_label: 'Create account',
              social_provider_text: 'Continue with Google',
              link_text: view === 'sign_in' ? '' : 'Already have an account? Sign in',
            },
            sign_in: {
              email_label: 'Email',
              password_label: 'Your password',
              button_label: 'Sign in',
              social_provider_text: 'Continue with Google',
              link_text: view === 'sign_in' ? '' : "Don't have an account? Sign up",
            },
          },
        }}
      />
    </div>
  );
} 