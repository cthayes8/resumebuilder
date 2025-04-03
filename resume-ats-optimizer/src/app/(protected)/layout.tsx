'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSupabase } from '@/contexts/SupabaseContext';
import { Button } from '@/components/ui/button';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const pathname = usePathname();
  const { supabase, user } = useSupabase();

  const handleSignOut = async () => {
    await supabase.signOut();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-semibold">
              Resume ATS Optimizer
            </Link>
            <nav className="flex gap-4">
              <Link
                href="/dashboard"
                className={`text-sm ${
                  pathname === '/dashboard'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/upload"
                className={`text-sm ${
                  pathname === '/upload'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                Upload
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.email}
            </span>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 