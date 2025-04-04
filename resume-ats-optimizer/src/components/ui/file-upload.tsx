"use client";

import { useState } from "react";
import { useDropzone, FileRejection, Accept } from "react-dropzone";
import { Upload, File, X } from "lucide-react";
import { Button } from "./button";

interface FileUploadProps {
  accept: string;
  maxSize: number;
  onUpload: (file: File) => void;
}

export function FileUpload({ accept, maxSize, onUpload }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.file.size > maxSize) {
        setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      } else {
        setError("Invalid file type. Please upload a PDF or DOCX file.");
      }
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      onUpload(file);
    }
  };

  const acceptTypes: Accept = {
    [accept]: []
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptTypes,
    maxSize,
    multiple: false
  });

  const removeFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          {selectedFile ? (
            <div className="flex items-center gap-2">
              <File className="w-5 h-5" />
              <span className="text-sm">{selectedFile.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <p className="text-lg font-medium">
                  {isDragActive ? "Drop your file here" : "Upload your resume"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Drag and drop your file here, or click to select
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                PDF or DOCX up to {maxSize / 1024 / 1024}MB
              </div>
            </>
          )}
        </div>
      </div>
      {error && (
        <div className="mt-2 text-sm text-destructive text-center">{error}</div>
      )}
    </div>
  );
} 