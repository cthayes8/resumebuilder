import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { DocumentService } from '@/services/document';

export async function POST(req: NextRequest) {
  try {
    // Check if request is multipart form data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const jobDescription = formData.get('jobDescription') as string;

    if (!file || !jobDescription) {
      return NextResponse.json(
        { error: { code: 'invalid_input', message: 'Both resume file and job description are required' } },
        { status: 400 }
      );
    }

    // Check file type
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (fileType !== 'pdf' && fileType !== 'docx') {
      return NextResponse.json(
        { error: { code: 'invalid_input', message: 'File must be PDF or DOCX' } },
        { status: 400 }
      );
    }

    // Get user session
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    // Extract text from resume
    const documentService = new DocumentService();
    const resumeText = await documentService.extractTextFromFile(file);

    // Upload file to Supabase storage
    const filePath = await supabase.storage
      .from('resume-files')
      .upload(`resumes/${userId || 'anonymous'}/${Date.now()}_${file.name}`, file);

    if (filePath.error) {
      throw new Error(`Failed to upload file: ${filePath.error.message}`);
    }

    // Create resume record
    const { data: resume, error: resumeError } = await supabase
      .from('resumes')
      .insert({
        user_id: userId,
        file_path: filePath.data.path,
        data: {
          text: resumeText,
          sections: {
            experience: [],
            education: [],
            skills: []
          }
        }
      })
      .select()
      .single();

    if (resumeError) {
      throw new Error(`Failed to create resume record: ${resumeError.message}`);
    }

    // Create job description record
    const { data: jobDesc, error: jobDescError } = await supabase
      .from('job_descriptions')
      .insert({
        user_id: userId,
        data: {
          text: jobDescription,
          requirements: {
            experience: [],
            education: [],
            skills: []
          }
        }
      })
      .select()
      .single();

    if (jobDescError) {
      throw new Error(`Failed to create job description record: ${jobDescError.message}`);
    }

    // Create optimization session
    const { data: optimizationSession, error: sessionError } = await supabase
      .from('optimization_sessions')
      .insert({
        user_id: userId,
        resume_id: resume.id,
        job_description_id: jobDesc.id
      })
      .select()
      .single();

    if (sessionError) {
      throw new Error(`Failed to create optimization session: ${sessionError.message}`);
    }

    return NextResponse.json({
      success: true,
      data: {
        sessionId: optimizationSession.id,
        resumeId: resume.id,
        jobDescriptionId: jobDesc.id
      }
    });
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json(
      { error: { code: 'processing_error', message: error instanceof Error ? error.message : 'An unknown error occurred' } },
      { status: 500 }
    );
  }
} 