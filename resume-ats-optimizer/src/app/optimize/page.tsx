"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/contexts/SupabaseContext";
import { FileUpload } from "@/components/FileUpload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, Target, FileText, BarChart, ArrowRight, Upload, CheckCircle, Lock } from "lucide-react";
import { Check, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function OptimizePage() {
  const router = useRouter();
  const { user, isLoading } = useSupabase();
  const [file, setFile] = React.useState<File | null>(null);
  const [jobDescription, setJobDescription] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push('/sign-up?redirect=/optimize');
    }
  }, [user, isLoading, router]);

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

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setError(null);
  };

  const handleOptimize = async () => {
    if (!file) {
      setError("Please upload your resume first");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter the job description");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // Create FormData to send the file
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', jobDescription);

      // Send the optimization request
      const response = await fetch('/api/optimize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to optimize resume');
      }

      const data = await response.json();
      
      // Redirect to results page
      router.push(`/results/${data.sessionId}`);
    } catch (err) {
      console.error('Optimization error:', err);
      setError("An error occurred while optimizing your resume. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-start py-16 px-4">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Optimize Your Resume</h1>
            <p className="text-muted-foreground">
              Upload your resume and paste the job description to get personalized optimization suggestions
            </p>
          </div>

          <div className="grid gap-8 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Upload Resume</CardTitle>
                <CardDescription>
                  Upload your resume in PDF or DOCX format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  id="resume-upload"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  maxSize={5 * 1024 * 1024} // 5MB
                  onUpload={handleFileUpload}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
                <CardDescription>
                  Paste the job description you want to optimize your resume for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the job description here..."
                  className="min-h-[200px]"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleOptimize}
              disabled={isProcessing || !file || !jobDescription.trim()}
            >
              {isProcessing ? "Optimizing..." : "Optimize Resume"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureItem({ children, available }: { children: React.ReactNode; available?: boolean }) {
  return (
    <li className="flex items-center gap-2">
      {available ? (
        <Check className="w-5 h-5 text-green-500" />
      ) : (
        <X className="w-5 h-5 text-red-500" />
      )}
      <span className={available ? "text-foreground" : "text-muted-foreground"}>
        {children}
      </span>
    </li>
  );
} 