'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth as AuthComponent } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSupabase } from '@/contexts/SupabaseContext';

interface AuthProps {
  view?: 'sign_in' | 'sign_up' | 'magic_link' | 'forgotten_password';
}

export function Auth({ view = 'sign_in' }: AuthProps) {
  const router = useRouter();
  const { supabase, user } = useSupabase();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="w-full">
      <AuthComponent
        supabaseClient={supabase.client}
        view={view}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'rgb(var(--color-primary))',
                brandAccent: 'rgb(var(--color-primary-dark))',
              },
            },
          },
          className: {
            container: 'w-full',
            button: 'w-full bg-primary text-primary-foreground hover:bg-primary/90',
            input: 'bg-background',
          },
        }}
        providers={['google', 'github']}
        redirectTo={`${window.location.origin}/auth/callback`}
      />
    </div>
  );
} 