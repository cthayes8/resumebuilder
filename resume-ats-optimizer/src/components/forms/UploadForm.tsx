import { useState } from 'react';
import { FileUpload } from './FileUpload';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface UploadFormProps {
  onSubmit: (data: { file: File; jobDescription: string }) => void;
  isLoading?: boolean;
}

export function UploadForm({ onSubmit, isLoading = false }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !jobDescription.trim()) {
      return;
    }
    onSubmit({ file, jobDescription });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
          Upload Resume
        </label>
        <FileUpload
          onFileSelect={(selectedFile) => setFile(selectedFile)}
          accept={{
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
          }}
        />
        {file && (
          <p className="mt-2 text-sm text-gray-500">
            Selected file: {file.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
          Job Description
        </label>
        <div className="mt-1">
          <textarea
            id="jobDescription"
            name="jobDescription"
            rows={6}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Paste the complete job description here for optimal results..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading || !file || !jobDescription.trim()}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isLoading || !file || !jobDescription.trim()
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <LoadingSpinner size="sm" className="mr-2" />
              Analyzing...
            </span>
          ) : (
            'Analyze Resume'
          )}
        </button>
      </div>
    </form>
  );
} 