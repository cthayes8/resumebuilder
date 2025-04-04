import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeroBackground } from "@/components/ui/hero-background";
import { FileText, Target, Zap, ArrowRight, Search, CheckCircle, Download } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works | Resume ATS Optimizer",
  description: "Learn how our AI-powered resume optimization process helps you get past ATS systems and land more interviews.",
};

export default function HowItWorksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <div className="w-full">
        <HeroBackground
          badge="The Process"
          title1="Simple Steps to an"
          title2="ATS-Optimized Resume"
          description="Our intelligent platform analyzes and optimizes your resume in minutes, helping you get past ATS systems and into the hands of recruiters."
        />
      </div>

      {/* Content Sections */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Steps Section */}
        <section className="space-y-12">
          <h2 className="text-3xl font-bold text-center">How Resume ATS Optimizer Works</h2>
          
          {/* Step 1: Upload Resume */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-semibold">1. Upload Your Resume</h3>
              </div>
              <p className="text-lg text-muted-foreground">
                Start by uploading your current resume. Our system accepts PDF and DOCX formats, making it easy to work with your existing resume.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Drag and drop or click to upload</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Secure and private document handling</span>
              </div>
            </div>
            <Card className="p-6 bg-primary/5">
              <CardContent className="flex items-center justify-center min-h-[200px]">
                <div className="text-center space-y-4">
                  <FileText className="h-16 w-16 text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">Upload PDF or DOCX file</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step 2: Add Job Description */}
          <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-semibold">2. Add Job Description</h3>
              </div>
              <p className="text-lg text-muted-foreground">
                Paste the job description you're applying for. Our AI will analyze the requirements, skills, and qualifications the employer is looking for.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Copy and paste job posting</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>AI extracts key requirements</span>
              </div>
            </div>
            <Card className="p-6 bg-primary/5">
              <CardContent className="flex items-center justify-center min-h-[200px]">
                <div className="text-center space-y-4">
                  <Search className="h-16 w-16 text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">Enter job description details</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step 3: AI Analysis */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-semibold">3. AI Analysis</h3>
              </div>
              <p className="text-lg text-muted-foreground">
                Our AI engine compares your resume against the job description, analyzing keyword matches, skills alignment, and ATS compatibility.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Skills gap analysis</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Keyword matching score</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Format compatibility check</span>
              </div>
            </div>
            <Card className="p-6 bg-primary/5">
              <CardContent className="flex items-center justify-center min-h-[200px]">
                <div className="text-center space-y-4">
                  <Zap className="h-16 w-16 text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">AI-powered analysis in progress</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step 4: Get Recommendations */}
          <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-semibold">4. Get Recommendations</h3>
              </div>
              <p className="text-lg text-muted-foreground">
                Receive detailed suggestions to optimize your resume, including keyword additions, format improvements, and content recommendations.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Missing keyword suggestions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Format optimization tips</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Content enhancement ideas</span>
              </div>
            </div>
            <Card className="p-6 bg-primary/5">
              <CardContent className="flex items-center justify-center min-h-[200px]">
                <div className="text-center space-y-4">
                  <Target className="h-16 w-16 text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">Personalized optimization suggestions</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step 5: Download */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Download className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-semibold">5. Download & Apply</h3>
              </div>
              <p className="text-lg text-muted-foreground">
                Download your optimized resume in your preferred format, along with a detailed report of improvements made and ATS compatibility score.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Multiple format options (PDF, DOCX)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Detailed optimization report</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>ATS compatibility score</span>
              </div>
            </div>
            <Card className="p-6 bg-primary/5">
              <CardContent className="flex items-center justify-center min-h-[200px]">
                <div className="text-center space-y-4">
                  <Download className="h-16 w-16 text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">Download your optimized resume</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Optimize Your Resume?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes and improve your chances of landing interviews with our AI-powered resume optimization tool.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/optimize">
              <Button size="lg">
                Start Optimizing Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
} 