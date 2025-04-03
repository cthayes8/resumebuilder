'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnalysisResult } from '@/services/analysis';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { DocumentService } from '@/services/document';

interface OptimizationSelection {
  experience: boolean[];
  skills: boolean;
  education: boolean | undefined;
  formatting: boolean[];
}

export default function OptimizePage() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selections, setSelections] = useState<OptimizationSelection>({
    experience: [],
    skills: false,
    education: false,
    formatting: [],
  });

  useEffect(() => {
    const storedResult = localStorage.getItem('analysisResult');
    if (!storedResult) {
      router.replace('/upload');
      return;
    }

    try {
      const result = JSON.parse(storedResult);
      setAnalysis(result);
      // Initialize selections based on available suggestions
      setSelections({
        experience: new Array(result.optimization.experience.length).fill(false),
        skills: false,
        education: result.optimization.education.needsChanges ? false : undefined,
        formatting: new Array(result.optimization.formattingImprovements.length).fill(false),
      });
    } catch (error) {
      console.error('Failed to parse analysis result:', error);
      router.replace('/upload');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleExperienceToggle = (index: number) => {
    setSelections(prev => ({
      ...prev,
      experience: prev.experience.map((value, i) => i === index ? !value : value),
    }));
  };

  const handleFormattingToggle = (index: number) => {
    setSelections(prev => ({
      ...prev,
      formatting: prev.formatting.map((value, i) => i === index ? !value : value),
    }));
  };

  const handleSkillsToggle = () => {
    setSelections(prev => ({
      ...prev,
      skills: !prev.skills,
    }));
  };

  const handleEducationToggle = () => {
    setSelections(prev => ({
      ...prev,
      education: !prev.education,
    }));
  };

  const handleGenerateOptimizedResume = async () => {
    if (!analysis) return;

    try {
      setIsGenerating(true);
      // Here we would call the document service to generate the optimized resume
      // For now, we'll just simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to the download page
      router.push('/download');
    } catch (error) {
      console.error('Failed to generate optimized resume:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner className="w-8 h-8 text-blue-600" />
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  const { optimization } = analysis;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Optimize Your Resume</h1>
        <p className="text-gray-600 mb-8">
          Select the improvements you would like to apply to your resume. You can review each suggestion
          and choose which ones to implement.
        </p>

        {/* Experience Improvements */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Experience Improvements</h2>
          <div className="space-y-4">
            {optimization.experience.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-4">
                <input
                  type="checkbox"
                  id={`experience-${index}`}
                  checked={selections.experience[index]}
                  onChange={() => handleExperienceToggle(index)}
                  className="mt-1"
                />
                <label htmlFor={`experience-${index}`} className="text-gray-700">
                  {suggestion}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Optimization */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Skills Optimization</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                id="skills"
                checked={selections.skills}
                onChange={handleSkillsToggle}
                className="mt-1"
              />
              <div>
                <label htmlFor="skills" className="text-gray-700 font-medium block mb-2">
                  Update skills section with optimized keywords
                </label>
                <p className="text-gray-600">{optimization.skills.explanation}</p>
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Current Skills</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {optimization.skills.original.map((skill, index) => (
                        <li key={index} className="text-gray-600">{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Optimized Skills</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {optimization.skills.improved.map((skill, index) => (
                        <li key={index} className="text-green-600">{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education Improvements */}
        {optimization.education.needsChanges && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Education Improvements</h2>
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                id="education"
                checked={selections.education}
                onChange={handleEducationToggle}
                className="mt-1"
              />
              <div>
                <label htmlFor="education" className="text-gray-700">
                  Apply suggested education section improvements
                </label>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  {optimization.education.suggestions?.map((suggestion, index) => (
                    <li key={index} className="text-gray-600">{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Formatting Improvements */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Formatting Improvements</h2>
          <div className="space-y-4">
            {optimization.formattingImprovements.map((improvement, index) => (
              <div key={index} className="flex items-start gap-4">
                <input
                  type="checkbox"
                  id={`formatting-${index}`}
                  checked={selections.formatting[index]}
                  onChange={() => handleFormattingToggle(index)}
                  className="mt-1"
                />
                <label htmlFor={`formatting-${index}`} className="text-gray-700">
                  {improvement}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-end">
          <button
            onClick={handleGenerateOptimizedResume}
            disabled={isGenerating}
            className={`flex items-center justify-center py-3 px-6 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isGenerating ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isGenerating ? (
              <>
                <LoadingSpinner className="w-5 h-5 mr-2" />
                Generating...
              </>
            ) : (
              'Generate Optimized Resume'
            )}
          </button>
        </div>
      </div>
    </main>
  );
} 