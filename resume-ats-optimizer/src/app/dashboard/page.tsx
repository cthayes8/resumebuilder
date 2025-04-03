import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Dashboard | Resume ATS Optimizer',
  description: 'Manage your resumes and optimization history.',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your resumes and optimization history
          </p>
        </div>
        <Button asChild>
          <Link href="/upload">
            Optimize New Resume
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Optimizations */}
        <div className="col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Recent Optimizations</h2>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="text-center text-muted-foreground">
                <p>No optimizations yet.</p>
                <p className="mt-2">
                  Start by uploading a resume to optimize it for your target job.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="text-2xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">Total Optimizations</p>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="text-2xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">Active Resumes</p>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="text-2xl font-bold">0%</div>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="text-2xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">Jobs Applied</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 