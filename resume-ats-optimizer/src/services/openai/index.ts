import OpenAI from 'openai';
import { ResumeData, JobDescriptionData } from '../analysis';

export class OpenAIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async parseResume(text: string): Promise<ResumeData> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a resume parser. Extract the text content and organize it into sections.'
          },
          {
            role: 'user',
            content: text
          }
        ],
        response_format: { type: 'json_object' }
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return {
        text,
        sections: {
          experience: result.experience || [],
          education: result.education || [],
          skills: result.skills || []
        }
      };
    } catch (error) {
      console.error('Resume parsing error:', error);
      throw new Error('Failed to parse resume');
    }
  }

  async analyzeJobDescription(text: string): Promise<JobDescriptionData> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a job description analyzer. Extract key requirements and organize them into categories.'
          },
          {
            role: 'user',
            content: text
          }
        ],
        response_format: { type: 'json_object' }
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return {
        text,
        requirements: {
          experience: result.experience || [],
          education: result.education || [],
          skills: result.skills || []
        }
      };
    } catch (error) {
      console.error('Job description analysis error:', error);
      throw new Error('Failed to analyze job description');
    }
  }

  async analyzeCompatibility(resume: ResumeData, job: JobDescriptionData) {
    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a resume compatibility analyzer. Compare the resume against job requirements and provide detailed analysis.'
          },
          {
            role: 'user',
            content: JSON.stringify({ resume, job })
          }
        ],
        response_format: { type: 'json_object' }
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return {
        score: result.score || 0,
        explanation: result.explanation || '',
        keywordMatches: {
          matched: result.matched || [],
          missing: result.missing || [],
          explanation: result.matchExplanation || ''
        },
        experienceAlignment: {
          score: result.experienceScore || 0,
          explanation: result.experienceExplanation || ''
        },
        educationAlignment: {
          score: result.educationScore || 0,
          explanation: result.educationExplanation || ''
        },
        formattingIssues: result.formattingIssues || []
      };
    } catch (error) {
      console.error('Compatibility analysis error:', error);
      throw new Error('Failed to analyze compatibility');
    }
  }

  async optimizeContent(resume: ResumeData, compatibility: any) {
    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a resume optimizer. Suggest improvements based on the compatibility analysis.'
          },
          {
            role: 'user',
            content: JSON.stringify({ resume, compatibility })
          }
        ],
        response_format: { type: 'json_object' }
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return {
        experience: result.experience || [],
        skills: {
          original: resume.sections.skills,
          improved: result.improvedSkills || [],
          explanation: result.skillsExplanation || ''
        },
        education: {
          needsChanges: result.educationNeedsChanges || false,
          suggestions: result.educationSuggestions
        },
        formattingImprovements: result.formattingImprovements || []
      };
    } catch (error) {
      console.error('Content optimization error:', error);
      throw new Error('Failed to optimize content');
    }
  }
} 