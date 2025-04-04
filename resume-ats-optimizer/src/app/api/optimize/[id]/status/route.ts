import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

    // Get the optimization session
    const { data: sessionData, error: sessionError } = await supabase
      .from('optimization_sessions')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .single();

    if (sessionError) {
      console.error('Error fetching session:', sessionError);
      return NextResponse.json(
        { error: 'Failed to fetch optimization session' },
        { status: 500 }
      );
    }

    if (!sessionData) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Calculate progress based on status
    let progress = 0;
    if (sessionData.status === 'processing') {
      progress = 50;
    } else if (sessionData.status === 'completed') {
      progress = 100;
    }

    return NextResponse.json({
      status: sessionData.status,
      progress,
      results: sessionData.status === 'completed' ? {
        optimizedResumePath: sessionData.optimized_resume_path,
        report: sessionData.report,
      } : null,
    });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 