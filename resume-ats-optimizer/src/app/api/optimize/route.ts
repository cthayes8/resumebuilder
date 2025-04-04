import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    // Get the form data
    const formData = await req.formData();
    const resume = formData.get('resume') as File;
    const jobDescription = formData.get('jobDescription') as string;

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the current user
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data: { session }, error: authError } = await supabase.auth.getSession();

    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Create optimization session
    const { data: sessionData, error: sessionError } = await supabase
      .from('optimization_sessions')
      .insert({
        user_id: userId,
        status: 'processing',
        created_at: new Date().toISOString(),
        job_description: jobDescription,
      })
      .select()
      .single();

    if (sessionError) {
      console.error('Error creating session:', sessionError);
      return NextResponse.json(
        { error: 'Failed to create optimization session' },
        { status: 500 }
      );
    }

    // Upload resume to storage
    const fileExt = resume.name.split('.').pop();
    const filePath = `resumes/${userId}/${sessionData.id}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('resume-files')
      .upload(filePath, resume);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload resume' },
        { status: 500 }
      );
    }

    // Update session with file path
    const { error: updateError } = await supabase
      .from('optimization_sessions')
      .update({
        resume_file_path: filePath,
      })
      .eq('id', sessionData.id);

    if (updateError) {
      console.error('Error updating session:', updateError);
      return NextResponse.json(
        { error: 'Failed to update session' },
        { status: 500 }
      );
    }

    // Start the optimization process
    // TODO: Implement actual resume optimization logic
    
    return NextResponse.json({
      sessionId: sessionData.id,
      message: 'Optimization started'
    });
  } catch (error) {
    console.error('Optimization error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 