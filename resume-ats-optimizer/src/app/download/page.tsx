'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface DownloadOptions {
  format: 'pdf' | 'docx';
  template: 'modern' | 'classic' | 'professional';
}

export default function DownloadPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [downloadOptions, setDownloadOptions] = useState<DownloadOptions>({
    format: 'pdf',
    template: 'modern',
  });

  useEffect(() => {
    const checkOptimizedResume = async () => {
      try {
        // Here we would check if the optimized resume is ready
        // For now, we'll simulate loading
        await new Promise(resolve => setTimeout(resolve, 1500));
        setPreviewUrl('/sample-preview.png'); // This would be a real preview URL
      } catch (error) {
        console.error('Failed to load optimized resume:', error);
        router.replace('/optimize');
      } finally {
        setIsLoading(false);
      }
    };

    checkOptimizedResume();
  }, [router]);

  const handleFormatChange = (format: 'pdf' | 'docx') => {
    setDownloadOptions(prev => ({ ...prev, format }));
  };

  const handleTemplateChange = (template: 'modern' | 'classic' | 'professional') => {
    setDownloadOptions(prev => ({ ...prev, template }));
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      // Here we would call the document service to generate the file
      // For now, we'll just simulate the download
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate file download
      const link = document.createElement('a');
      link.href = '/sample.pdf'; // This would be a real file URL
      link.download = `optimized-resume.${downloadOptions.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download resume:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner className="w-8 h-8 text-blue-600" />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Download Your Optimized Resume</h1>
        
        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="aspect-[8.5/11] bg-gray-100 rounded-lg overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Resume Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Preview not available
              </div>
            )}
          </div>
        </div>

        {/* Download Options */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Download Options</h2>
          
          {/* Format Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Format</h3>
            <div className="flex gap-4">
              <button
                onClick={() => handleFormatChange('pdf')}
                className={`px-4 py-2 rounded-md ${
                  downloadOptions.format === 'pdf'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                PDF
              </button>
              <button
                onClick={() => handleFormatChange('docx')}
                className={`px-4 py-2 rounded-md ${
                  downloadOptions.format === 'docx'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                DOCX
              </button>
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['modern', 'classic', 'professional'].map((template) => (
                <button
                  key={template}
                  onClick={() => handleTemplateChange(template as any)}
                  className={`p-4 rounded-md border ${
                    downloadOptions.template === template
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="aspect-[8.5/11] bg-gray-100 rounded mb-2">
                    {/* Template preview image would go here */}
                  </div>
                  <span className="capitalize">{template}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-end">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center justify-center py-3 px-6 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isDownloading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isDownloading ? (
              <>
                <LoadingSpinner className="w-5 h-5 mr-2" />
                Generating...
              </>
            ) : (
              'Download Resume'
            )}
          </button>
        </div>
      </div>
    </main>
  );
} 