import { DocumentService } from '../document';
import { OpenAIService } from '../openai';
import { config } from '@/config';

export type AllowedFileType = typeof config.allowedFileTypes[number];

export interface ResumeData {
  text: string;
  sections: {
    experience: string[];
    education: string[];
    skills: string[];
  };
}

export interface JobDescriptionData {
  text: string;
  requirements: {
    experience: string[];
    education: string[];
    skills: string[];
  };
}

export interface AnalysisResult {
  resumeData: ResumeData;
  jobData: JobDescriptionData;
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
  optimization: {
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
  };
}

export class AnalysisService {
  private documentService: DocumentService;
  private openAIService: OpenAIService;

  constructor() {
    this.documentService = new DocumentService();
    this.openAIService = new OpenAIService(config.openai.apiKey);
  }

  async analyzeResume(
    resumeFile: File,
    jobDescription: string,
    fileType: AllowedFileType
  ): Promise<AnalysisResult> {
    try {
      // Extract text from the resume file
      const resumeText = await this.documentService.extractTextFromFile(resumeFile);

      // Parse resume and analyze job description in parallel
      const [resumeData, jobData] = await Promise.all([
        this.openAIService.parseResume(resumeText),
        this.openAIService.analyzeJobDescription(jobDescription)
      ]);

      // Analyze compatibility between resume and job description
      const compatibility = await this.openAIService.analyzeCompatibility(resumeData, jobData);

      // Generate optimization suggestions
      const optimization = await this.openAIService.optimizeContent(resumeData, compatibility);

      return {
        resumeData,
        jobData,
        compatibility: {
          score: compatibility.score,
          explanation: compatibility.explanation,
        },
        keywordMatches: compatibility.keywordMatches,
        experienceAlignment: compatibility.experienceAlignment,
        educationAlignment: compatibility.educationAlignment,
        formattingIssues: compatibility.formattingIssues,
        optimization: {
          experience: optimization.experience,
          skills: optimization.skills,
          education: optimization.education,
          formattingImprovements: optimization.formattingImprovements,
        },
      };
    } catch (error) {
      console.error('Analysis error:', error);
      throw new Error('Failed to analyze resume and job description');
    }
  }

  validateFileType(fileType: string): fileType is AllowedFileType {
    return config.allowedFileTypes.includes(fileType as AllowedFileType);
  }

  validateFileSize(fileSize: number): boolean {
    return fileSize <= config.maxFileSize;
  }
} 