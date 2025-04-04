import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeroBackground } from "@/components/ui/hero-background";
import { FileText, Target, Zap, Users, Heart, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Resume ATS Optimizer",
  description: "Learn about our mission to help job seekers optimize their resumes for ATS systems and land more interviews.",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <div className="w-full">
        <HeroBackground
          badge="Our Mission"
          title1="Empowering Job Seekers"
          title2="Through AI Technology"
          description="We're on a mission to help job seekers navigate the complex world of Applicant Tracking Systems and land their dream jobs."
        />
      </div>

      {/* Content Sections */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* ATS Explanation Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Understanding ATS Systems</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Applicant Tracking Systems (ATS) are sophisticated software tools used by 75% of employers to manage job applications. These systems scan, filter, and rank resumes before they reach human recruiters.
              </p>
              <p className="text-lg text-muted-foreground">
                Without proper optimization, even the most qualified candidates can be filtered out by ATS systems. Our platform ensures your resume makes it through these digital gatekeepers and lands on the recruiter's desk.
              </p>
            </div>
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {[
                    { title: "Resume Scanning", description: "ATS systems scan resumes for relevant keywords and experience" },
                    { title: "Candidate Ranking", description: "Applications are scored and ranked based on job requirements" },
                    { title: "Format Parsing", description: "Complex formats can confuse ATS systems and lower rankings" },
                    { title: "Keyword Matching", description: "Missing key terms can result in automatic rejection" }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <Target className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technology Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Our Technology</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "AI-Powered Analysis",
                description: "Advanced machine learning algorithms analyze your resume against job descriptions for optimal matching"
              },
              {
                icon: Target,
                title: "Intelligent Optimization",
                description: "Smart keyword suggestions and format improvements that maintain your resume's professional appeal"
              },
              {
                icon: FileText,
                title: "Format Preservation",
                description: "Ensures your resume remains visually appealing while being fully ATS-compatible"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Heart,
                title: "User Success First",
                description: "Your career success is our top priority. We're committed to helping you land your dream job."
              },
              {
                icon: CheckCircle,
                title: "Continuous Improvement",
                description: "We constantly update our algorithms to match the latest ATS technologies and hiring trends."
              }
            ].map((value, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <value.icon className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Optimize Your Resume?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their chances of landing interviews with our AI-powered resume optimization tool.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/optimize">
              <Button size="lg">
                Optimize Your Resume
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
} 