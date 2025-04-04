'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSupabase } from '@/contexts/SupabaseContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Download, CheckCircle } from "lucide-react";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading } = useSupabase();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'processing' | 'completed' | 'error'>('processing');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/sign-up?redirect=/results/${params.id}`);
    }
  }, [user, isLoading, router, params.id]);

  useEffect(() => {
    if (!user) return; // Don't start polling until user is authenticated

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/optimize/${params.id}/status`);
        if (!response.ok) throw new Error('Failed to fetch status');
        
        const data = await response.json();
        setStatus(data.status);
        setProgress(data.progress);
        
        if (data.status === 'completed') {
          setResults(data.results);
        }
      } catch (err) {
        console.error('Error checking status:', err);
        setError('Failed to load optimization status');
      }
    };

    const interval = setInterval(checkStatus, 2000);
    return () => clearInterval(interval);
  }, [params.id, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <Progress value={100} className="w-24 h-2" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-start py-16 px-4">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Resume Optimization</h1>
            <p className="text-muted-foreground">
              {status === 'processing' ? 'Optimizing your resume...' : 
               status === 'completed' ? 'Optimization completed!' :
               'An error occurred'}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
              <CardDescription>
                {status === 'processing' ? 'Please wait while we analyze and optimize your resume' :
                 status === 'completed' ? 'Your optimized resume is ready' :
                 'Failed to optimize resume'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={progress} className="h-2" />
                
                {status === 'processing' && (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                )}

                {status === 'completed' && results && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span>Optimization Complete!</span>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download Optimized Resume
                      </Button>
                    </div>
                  </div>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 