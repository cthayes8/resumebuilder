'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileTrigger } from 'react-aria-components';
import { Upload, FileText, X, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useSupabase } from '@/contexts/SupabaseContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  file: File | null;
  isLoading: boolean;
  error: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  file,
  isLoading,
  error
}) => {
  const dropzoneRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const validateAndSetFile = (file: File) => {
    const fileType = file.name.split('.').pop()?.toLowerCase();
    
    if (fileType === 'pdf' || fileType === 'docx') {
      onFileSelect(file);
    } else {
      onFileSelect(null);
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const removeFile = () => {
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      <div
        ref={dropzoneRef}
        className={cn(
          "relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-gray-200",
          file ? "bg-background" : "bg-background/50",
          error ? "border-destructive" : ""
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="p-3 rounded-full bg-primary/10">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-medium">Upload your resume</h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop your file here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, DOCX
              </p>
            </div>
            <FileTrigger
              onSelect={(e) => handleFileSelect(e as FileList)}
              acceptedFileTypes={[".pdf", ".docx"]}
            >
              <Button variant="outline" size="sm">
                Browse files
              </Button>
            </FileTrigger>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-md bg-primary/10">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={removeFile}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
            <div className="flex flex-col items-center space-y-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="text-sm font-medium">Processing file...</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

interface JobDescriptionProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

const JobDescription: React.FC<JobDescriptionProps> = ({
  value,
  onChange,
  error
}) => {
  return (
    <div className="w-full space-y-2">
      <Textarea
        placeholder="Paste the job description here..."
        className="min-h-[200px] resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default function ResumeAnalyzerPage() {
  const router = useRouter();
  const [file, setFile] = React.useState<File | null>(null);
  const [jobDescription, setJobDescription] = React.useState("");
  const [fileError, setFileError] = React.useState<string | null>(null);
  const [jobDescriptionError, setJobDescriptionError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
    setFileError(null);
  };

  const handleJobDescriptionChange = (value: string) => {
    setJobDescription(value);
    setJobDescriptionError(null);
  };

  const handleAnalyze = async () => {
    // Validate inputs
    let hasError = false;

    if (!file) {
      setFileError("Please upload your resume");
      hasError = true;
    }

    if (!jobDescription.trim()) {
      setJobDescriptionError("Please enter a job description");
      hasError = true;
    }

    if (hasError || !file) return;

    // Submit form
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('jobDescription', jobDescription);

      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to upload resume');
      }

      setIsSuccess(true);
      
      // Redirect to analysis page after 1 second
      setTimeout(() => {
        router.push(`/analysis/${data.data.sessionId}`);
      }, 1000);
    } catch (error) {
      console.error('Error uploading resume:', error);
      setFileError(error instanceof Error ? error.message : 'Failed to upload resume');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Resume Analyzer</CardTitle>
            <CardDescription>
              Upload your resume and paste a job description to analyze your match
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Resume</h3>
              <FileUpload 
                onFileSelect={handleFileSelect}
                file={file}
                isLoading={isLoading}
                error={fileError}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Job Description</h3>
              <JobDescription 
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                error={jobDescriptionError}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleAnalyze} 
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                  Processing
                </span>
              ) : isSuccess ? (
                <span className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Success
                </span>
              ) : (
                <span className="flex items-center">
                  Analyze
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
} 