import { createClient } from '@supabase/supabase-js';
import { config } from '@/config';

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  subscription_type: 'free' | 'one-time' | 'subscription';
  subscription_expires_at: string | null;
  stripe_customer_id: string | null;
}

export interface Resume {
  id: string;
  user_id: string | null;
  file_path: string | null;
  data: {
    text: string;
    sections: {
      experience: string[];
      education: string[];
      skills: string[];
    };
  };
  created_at: string;
  format_issues: {
    type: string;
    description: string;
  }[] | null;
}

export interface JobDescription {
  id: string;
  user_id: string | null;
  data: {
    text: string;
    requirements: {
      experience: string[];
      education: string[];
      skills: string[];
    };
  };
  created_at: string;
}

export interface OptimizationSession {
  id: string;
  user_id: string | null;
  session_token: string | null;
  resume_id: string;
  job_description_id: string;
  analysis_results: {
    compatibility: {
      score: number;
      explanation: string;
    };
    keywordMatches: {
      matched: string[];
      missing: string[];
      explanation: string;
    };
    experienceAlignment: {
      score: number;
      explanation: string;
    };
    educationAlignment: {
      score: number;
      explanation: string;
    };
    formattingIssues: string[];
  } | null;
  optimization_suggestions: {
    experience: string[];
    skills: {
      original: string[];
      improved: string[];
      explanation: string;
    };
    education: {
      needsChanges: boolean;
      suggestions?: string[];
    };
    formattingImprovements: string[];
  } | null;
  optimized_resume_id: string | null;
  report: any | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export interface OptimizedResume {
  id: string;
  session_id: string;
  data: {
    text: string;
    sections: {
      experience: string[];
      education: string[];
      skills: string[];
    };
  };
  file_path: string | null;
  created_at: string;
}

export class SupabaseService {
  private _client;

  constructor() {
    this._client = createClient(config.supabase.url, config.supabase.anonKey);
  }

  get client() {
    return this._client;
  }

  // Auth methods
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.client.auth.onAuthStateChange(callback);
  }

  async signInWithPassword(credentials: { email: string; password: string }) {
    return this.client.auth.signInWithPassword(credentials);
  }

  async signUp(credentials: { email: string; password: string }) {
    return this.client.auth.signUp(credentials);
  }

  async signOut() {
    return this.client.auth.signOut();
  }

  async resetPassword(email: string) {
    return this.client.auth.resetPasswordForEmail(email);
  }

  // User methods
  async getCurrentUser() {
    const { data: { user } } = await this.client.auth.getUser();
    if (!user) return null;

    const { data } = await this.client
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    return data as User | null;
  }

  async updateUser(userId: string, updates: Partial<User>) {
    const { data, error } = await this.client
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as User;
  }

  // Resume methods
  async createResume(resume: Omit<Resume, 'id' | 'created_at'>) {
    const { data, error } = await this.client
      .from('resumes')
      .insert(resume)
      .select()
      .single();

    if (error) throw error;
    return data as Resume;
  }

  async getResume(id: string) {
    const { data, error } = await this.client
      .from('resumes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Resume;
  }

  async updateResume(id: string, updates: Partial<Resume>) {
    const { data, error } = await this.client
      .from('resumes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Resume;
  }

  // Job Description methods
  async createJobDescription(jobDescription: Omit<JobDescription, 'id' | 'created_at'>) {
    const { data, error } = await this.client
      .from('job_descriptions')
      .insert(jobDescription)
      .select()
      .single();

    if (error) throw error;
    return data as JobDescription;
  }

  async getJobDescription(id: string) {
    const { data, error } = await this.client
      .from('job_descriptions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as JobDescription;
  }

  // Optimization Session methods
  async createOptimizationSession(session: Omit<OptimizationSession, 'id' | 'created_at' | 'updated_at' | 'completed_at'>) {
    const { data, error } = await this.client
      .from('optimization_sessions')
      .insert(session)
      .select()
      .single();

    if (error) throw error;
    return data as OptimizationSession;
  }

  async getOptimizationSession(id: string) {
    const { data, error } = await this.client
      .from('optimization_sessions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as OptimizationSession;
  }

  async updateOptimizationSession(id: string, updates: Partial<OptimizationSession>) {
    const { data, error } = await this.client
      .from('optimization_sessions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as OptimizationSession;
  }

  // Optimized Resume methods
  async createOptimizedResume(optimizedResume: Omit<OptimizedResume, 'id' | 'created_at'>) {
    const { data, error } = await this.client
      .from('optimized_resumes')
      .insert(optimizedResume)
      .select()
      .single();

    if (error) throw error;
    return data as OptimizedResume;
  }

  async getOptimizedResume(id: string) {
    const { data, error } = await this.client
      .from('optimized_resumes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as OptimizedResume;
  }

  // Storage methods
  async uploadResumeFile(userId: string | 'anonymous', file: File) {
    const path = `resumes/${userId}/${Date.now()}_${file.name}`;
    const { data, error } = await this.client.storage
      .from('resume-files')
      .upload(path, file);

    if (error) throw error;
    return data.path;
  }

  async downloadResumeFile(path: string) {
    const { data, error } = await this.client.storage
      .from('resume-files')
      .download(path);

    if (error) throw error;
    return data;
  }
} 