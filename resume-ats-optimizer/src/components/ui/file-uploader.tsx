import { useState, useRef } from "react";
import { FileUp, X, Upload, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert } from "@/components/ui/alert";

interface UseFileInputOptions {
  accept?: string;
  maxSize?: number;
}

function useFileInput({ accept, maxSize }: UseFileInputOptions) {
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileSize, setFileSize] = useState<number>(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File | undefined) => {
    setError("");
    setSelectedFile(undefined);

    if (file) {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        return;
      }

      if (accept) {
        const acceptedTypes = accept.split(",").map(type => type.trim());
        const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
        const fileType = file.type;
        
        const isAccepted = acceptedTypes.some(type => {
          if (type.includes("/*")) {
            return fileType.startsWith(type.replace("/*", "/"));
          }
          return type === fileExtension || type === fileType;
        });

        if (!isAccepted) {
          setError(`File type must be ${accept}`);
          return;
        }
      }

      setFileSize(file.size);
      setFileName(file.name);
      setSelectedFile(file);
    }
  };

  const clearFile = () => {
    setFileName("");
    setError("");
    setFileSize(0);
    setSelectedFile(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    fileName,
    error,
    fileInputRef,
    handleFileSelect,
    validateAndSetFile,
    clearFile,
    fileSize,
    selectedFile,
  };
}

interface FileDisplayProps {
  fileName: string;
  fileSize: number;
  onClear: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function FileDisplay({ fileName, fileSize, onClear }: FileDisplayProps) {
  return (
    <div className="flex items-center gap-2 bg-background w-full px-3 py-2 rounded-lg border border-border">
      <FileText className="w-4 h-4 text-foreground" />
      <div className="flex-1 overflow-hidden">
        <span className="text-sm text-foreground truncate block">{fileName}</span>
        <span className="text-xs text-muted-foreground">
          {(fileSize / (1024 * 1024)).toFixed(2)}MB
        </span>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="ml-1 p-1 rounded-full hover:bg-muted transition-colors"
        aria-label="Remove file"
      >
        <X className="w-4 h-4 text-foreground" />
      </button>
    </div>
  );
}

interface FileUploaderProps {
  accept?: string;
  maxSize?: number;
  onFileSelect?: (file: File) => void;
  className?: string;
}

export function FileUploader({
  accept = ".pdf,.docx",
  maxSize = 5,
  onFileSelect,
  className
}: FileUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { 
    fileName, 
    error, 
    fileInputRef, 
    handleFileSelect,
    validateAndSetFile,
    clearFile,
    fileSize,
    selectedFile
  } = useFileInput({
    accept,
    maxSize
  });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8",
          "hover:border-primary/50 transition-colors",
          "bg-background text-center",
          error ? "border-destructive" : "border-border",
          isLoading ? "pointer-events-none opacity-70" : "cursor-pointer"
        )}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {fileName && !isLoading ? (
          <FileDisplay 
            fileName={fileName} 
            fileSize={fileSize} 
            onClear={(e) => {
              e.stopPropagation();
              clearFile();
            }} 
          />
        ) : (
          <div className="space-y-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-muted p-3">
              <Upload className="h-6 w-6 text-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Drag and drop or click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                PDF or DOCX up to {maxSize}MB
              </p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="mt-4 space-y-2">
            <Progress value={progress} className="h-2 w-full" />
            <p className="text-xs text-muted-foreground">Uploading... {progress}%</p>
          </div>
        )}
      </div>

      <input
        type="file"
        accept={accept}
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      
      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm ml-2">{error}</span>
        </Alert>
      )}
    </div>
  );
} 