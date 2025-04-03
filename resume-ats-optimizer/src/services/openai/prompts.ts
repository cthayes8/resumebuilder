export const RESUME_PARSER_PROMPT = `
You are a resume parsing expert. Your task is to extract structured information from the provided resume text.
Please analyze the text and return a JSON object with the following structure:
{
  "personalInfo": {
    "name": string,
    "email": string,
    "phone": string (optional)
  },
  "skills": string[],
  "experience": [
    {
      "title": string,
      "company": string,
      "startDate": string,
      "endDate": string,
      "description": string (optional)
    }
  ],
  "education": [
    {
      "degree": string,
      "institution": string,
      "graduationDate": string
    }
  ],
  "summary": string (optional)
}
`;

export const JOB_DESCRIPTION_ANALYZER_PROMPT = `
You are a job description analysis expert. Your task is to extract key information from the provided job description.
Please analyze the text and return a JSON object with the following structure:
{
  "jobTitle": string,
  "requiredSkills": string[],
  "requiredExperience": {
    "specificExperiences": string[]
  },
  "responsibilities": string[],
  "keyPhrases": string[]
}
`;

export const COMPATIBILITY_ANALYSIS_PROMPT = `
You are an ATS compatibility expert. Your task is to analyze the compatibility between a resume and a job description.
The input will be a JSON object containing both the resume and job description data.
Please analyze the match and return a JSON object with the following structure:
{
  "overallCompatibilityScore": number (0-100),
  "keywordMatches": {
    "matched": string[],
    "missing": string[]
  },
  "experienceAlignment": {
    "score": number (0-100),
    "matchedResponsibilities": string[],
    "unmatchedResponsibilities": string[],
    "improvementSuggestions": string[]
  },
  "educationAlignment": {
    "score": number (0-100),
    "matches": string[],
    "gaps": string[],
    "suggestions": string[]
  },
  "formattingAnalysis": {
    "issues": string[]
  },
  "sectionSuggestions": Record<string, string[]>
}
`;

export const CONTENT_OPTIMIZATION_PROMPT = `
You are a resume optimization expert. Your task is to provide suggestions for improving a resume based on compatibility analysis.
The input will be a JSON object containing both the resume and analysis results.
Please provide suggestions in a JSON object with the following structure:
{
  "experience": string[],
  "skills": {
    "original": string[],
    "improved": string[],
    "explanation": string
  },
  "education": {
    "needsChanges": boolean,
    "suggestions": string[] | null
  },
  "formattingImprovements": string[]
}
`; 