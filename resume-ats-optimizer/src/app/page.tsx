"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import ResumeAnalysisDemo from "@/components/resume-analysis-demo";
import { HeroBackground } from "@/components/ui/hero-background";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section - Full Width */}
      <div className="w-full">
        <HeroBackground
          badge="AI-Powered Resume Builder"
          title1="Get Past the Bots"
          title2="Land More Interviews"
          description="Our AI-powered Resume Optimizer ensures your resume passes through Applicant Tracking Systems and gets seen by real recruiters."
        />
      </div>

      {/* Content Sections - Centered with Max Width */}
      <div className="w-full">
        {/* Analysis Demo Section */}
        <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <ResumeAnalysisDemo />
        </div>

        {/* Pricing Section */}
        <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Pricing />
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <FAQ />
        </div>
      </div>
    </main>
  );
}
