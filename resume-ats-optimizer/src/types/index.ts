export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
}

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Education {
  degree: string;
  institution: string;
  graduationDate: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  skills: string[];
  experience: Experience[];
  education: Education[];
  summary?: string;
}

export interface JobDescriptionData {
  jobTitle: string;
  requiredSkills: string[];
  requiredExperience: {
    specificExperiences: string[];
  };
  responsibilities: string[];
  keyPhrases: string[];
}

export interface ExperienceAlignment {
  score: number;
  matchedResponsibilities: string[];
  unmatchedResponsibilities: string[];
  improvementSuggestions: string[];
}

export interface EducationAlignment {
  score: number;
  matches: string[];
  gaps: string[];
  suggestions: string[];
}

export interface CompatibilityAnalysis {
  overallCompatibilityScore: number;
  keywordMatches: {
    matched: string[];
    missing: string[];
  };
  experienceAlignment: ExperienceAlignment;
  educationAlignment: EducationAlignment;
  formattingAnalysis: {
    issues: string[];
  };
  sectionSuggestions: Record<string, string[]>;
}

export interface SkillSuggestions {
  original: string[];
  improved: string[];
  explanation: string;
}

export interface OptimizationSuggestions {
  experience: string[];
  skills: SkillSuggestions;
  education: {
    needsChanges: boolean;
    suggestions: string[] | null;
  };
  formattingImprovements: string[];
} 