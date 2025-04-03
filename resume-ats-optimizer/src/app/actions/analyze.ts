'use server';

import { AnalysisService, AnalysisResult } from '@/services/analysis';
import { createClient } from '@supabase/supabase-js';
import { config } from '@/config';
import { revalidatePath } from 'next/cache';

const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey
);

export async function analyzeResume(
  formData: FormData
): Promise<{ success: boolean; data?: AnalysisResult; error?: string }> {
  try {
    const file = formData.get('resume') as File;
    const jobDescription = formData.get('jobDescription') as string;

    if (!file || !jobDescription) {
      return {
        success: false,
        error: 'Please provide both a resume file and job description',
      };
    }

    const analysisService = new AnalysisService();

    // Validate file type
    if (!analysisService.validateFileType(file.type)) {
      return {
        success: false,
        error: 'Invalid file type. Please upload a PDF, DOC, or DOCX file.',
      };
    }

    // Validate file size
    if (!analysisService.validateFileSize(file.size)) {
      return {
        success: false,
        error: 'File size exceeds the maximum limit of 10MB.',
      };
    }

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return {
        success: false,
        error: 'Authentication required',
      };
    }

    // Check if the user has an active subscription or credits
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (subError || !subscription) {
      return {
        success: false,
        error: 'No active subscription found',
      };
    }

    // Perform the analysis
    const result = await analysisService.analyzeResume(
      file,
      jobDescription,
      file.type as any // We've already validated the file type
    );

    // Store the analysis result
    const { error: saveError } = await supabase
      .from('analyses')
      .insert({
        user_id: user.id,
        resume_data: result.resumeData,
        job_data: result.jobData,
        compatibility: result.compatibility,
        optimization: result.optimization,
      });

    if (saveError) {
      console.error('Failed to save analysis:', saveError);
      // Continue anyway since we have the result
    }

    // Revalidate the analysis history page
    revalidatePath('/dashboard/history');

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Analysis action error:', error);
    return {
      success: false,
      error: 'Failed to analyze resume. Please try again.',
    };
  }
} 