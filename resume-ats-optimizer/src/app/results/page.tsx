'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnalysisResult } from '@/services/analysis';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function ResultsPage() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedResult = localStorage.getItem('analysisResult');
    if (!storedResult) {
      router.replace('/upload');
      return;
    }

    try {
      const result = JSON.parse(storedResult);
      setAnalysis(result);
    } catch (error) {
      console.error('Failed to parse analysis result:', error);
      router.replace('/upload');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

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

  const { compatibility, optimization } = analysis;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Resume Analysis Results</h1>

        {/* Overall Score */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Overall Compatibility Score</h2>
            <div className="flex items-center">
              <div
                className={`text-2xl font-bold ${
                  compatibility.overallCompatibilityScore >= 70
                    ? 'text-green-600'
                    : compatibility.overallCompatibilityScore >= 50
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                {compatibility.overallCompatibilityScore}%
              </div>
            </div>
          </div>
        </div>

        {/* Keyword Matches */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Keyword Analysis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-green-600 mb-2">Matched Keywords</h3>
              <ul className="list-disc list-inside space-y-1">
                {compatibility.keywordMatches.matched.map((keyword, index) => (
                  <li key={index} className="text-gray-700">{keyword}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-red-600 mb-2">Missing Keywords</h3>
              <ul className="list-disc list-inside space-y-1">
                {compatibility.keywordMatches.missing.map((keyword, index) => (
                  <li key={index} className="text-gray-700">{keyword}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Experience Alignment */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Experience Alignment</h2>
            <div className="text-lg font-semibold text-blue-600">
              {compatibility.experienceAlignment.score}%
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-green-600 mb-2">Matched Responsibilities</h3>
              <ul className="list-disc list-inside space-y-1">
                {compatibility.experienceAlignment.matchedResponsibilities.map((resp, index) => (
                  <li key={index} className="text-gray-700">{resp}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-yellow-600 mb-2">Improvement Suggestions</h3>
              <ul className="list-disc list-inside space-y-1">
                {compatibility.experienceAlignment.improvementSuggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-700">{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Education Alignment */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Education Alignment</h2>
            <div className="text-lg font-semibold text-blue-600">
              {compatibility.educationAlignment.score}%
            </div>
          </div>
          {compatibility.educationAlignment.suggestions.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-yellow-600 mb-2">Suggestions</h3>
              <ul className="list-disc list-inside space-y-1">
                {compatibility.educationAlignment.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-700">{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Formatting Issues */}
        {compatibility.formattingAnalysis.issues.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Formatting Issues</h2>
            <ul className="list-disc list-inside space-y-1">
              {compatibility.formattingAnalysis.issues.map((issue, index) => (
                <li key={index} className="text-gray-700">{issue}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Content Optimization */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Content Optimization</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-blue-600 mb-2">Experience Improvements</h3>
              <ul className="list-disc list-inside space-y-1">
                {optimization.experience.map((suggestion, index) => (
                  <li key={index} className="text-gray-700">{suggestion}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-600 mb-2">Skills Optimization</h3>
              <p className="text-gray-700 mb-2">{optimization.skills.explanation}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Original Skills</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {optimization.skills.original.map((skill, index) => (
                      <li key={index} className="text-gray-600">{skill}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Improved Skills</h4>
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
    </main>
  );
} 