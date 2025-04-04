"use client";

import * as React from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function OptimizePage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [jobDescription, setJobDescription] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

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
    setIsLoading(true);

    try {
      // TODO: Implement the optimization logic here
      console.log("Optimizing resume...", { file, jobDescription });
    } catch (err) {
      setError("An error occurred while optimizing your resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container max-w-4xl py-8 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Optimize Your Resume</h1>
        <p className="text-muted-foreground">
          Upload your resume and paste the job description to get personalized optimization suggestions
        </p>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Resume</CardTitle>
            <CardDescription>
              Upload your resume in PDF or DOCX format
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload
              accept="application/pdf,.docx"
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
          disabled={isLoading || !file || !jobDescription.trim()}
        >
          {isLoading ? "Optimizing..." : "Optimize Resume"}
        </Button>
      </div>
    </main>
  );
} 