"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MoveRight, Check, Star, ChevronDown, ChevronUp, FileText, Search, Zap, Layout } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Features } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import ResumeAnalysisDemo from "@/components/resume-analysis-demo";

// Hero Section
interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
}) => {
  return (
    <section className="w-full bg-background py-20 lg:py-32">
      <div className="container mx-auto">
        <div className="flex gap-8 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-6xl max-w-3xl tracking-tighter text-center font-bold">
              {title}
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              {subtitle}
            </p>
          </div>
          <div className="flex flex-row gap-3">
            {secondaryCtaText && secondaryCtaLink && (
              <Button size="lg" className="gap-2" variant="outline" asChild>
                <Link href={secondaryCtaLink}>{secondaryCtaText}</Link>
              </Button>
            )}
            <Button size="lg" className="gap-2" asChild>
              <Link href={ctaLink}>
                {ctaText} <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Avatar key={i} className="border-2 border-background w-8 h-8">
                    <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 10}`} alt={`User ${i}`} />
                  </Avatar>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  from 500+ happy job seekers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Feature Section
interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  title: string;
  subtitle: string;
  features: FeatureItem[];
}

const Features: React.FC<FeaturesProps> = ({ title, subtitle, features }) => {
  return (
    <section className="w-full py-20 bg-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 flex flex-col items-start">
              <div className="p-2 rounded-md bg-primary/10 text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
}

interface PricingProps {
  title: string;
  subtitle: string;
  tiers: PricingTier[];
}

const Pricing: React.FC<PricingProps> = ({ title, subtitle, tiers }) => {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <Card 
              key={index} 
              className={cn(
                "p-6 flex flex-col",
                tier.popular && "border-primary shadow-md relative"
              )}
            >
              {tier.popular && (
                <Badge className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2">
                  Most Popular
                </Badge>
              )}
              <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.price !== "Free" && <span className="text-muted-foreground ml-1">/month</span>}
              </div>
              <p className="text-muted-foreground mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="mt-auto" 
                variant={tier.popular ? "default" : "outline"}
                asChild
              >
                <Link href={tier.ctaLink}>{tier.ctaText}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title: string;
  subtitle: string;
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ title, subtitle, faqs }) => {
  return (
    <section className="w-full py-20 bg-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

// Stats Section
interface StatItemProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

function StatItem({ value, label, icon }: StatItemProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border">
      {icon && <div className="mb-2 text-primary">{icon}</div>}
      <h3 className="text-3xl font-bold">{value}</h3>
      <p className="text-muted-foreground text-center">{label}</p>
    </div>
  );
}

interface StatsProps {
  className?: string;
}

function StatsSection({ className }: StatsProps) {
  return (
    <section className={cn("py-12 bg-background", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Proven Results That Speak For Themselves
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatItem value="85%" label="Higher Interview Rate" />
          <StatItem value="65%" label="Faster Response Time" />
          <StatItem value="3x" label="More Job Offers" />
          <StatItem value="92%" label="Pass ATS Screening" />
        </div>
      </div>
    </section>
  );
}

// Process Section
interface ProcessStep {
  step: string;
  title: string;
  content: string;
  image: string;
}

interface ProcessSectionProps {
  steps: ProcessStep[];
  className?: string;
  title?: string;
  autoPlayInterval?: number;
  imageHeight?: string;
}

function ProcessSection({
  steps,
  className,
  title = "How It Works",
  autoPlayInterval = 4000,
  imageHeight = "h-[400px]",
}: ProcessSectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100));
      } else {
        setCurrentStep((prev) => (prev + 1) % steps.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress, steps.length, autoPlayInterval]);

  return (
    <section className={cn("py-16 bg-background", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {title}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="order-2 md:order-1 space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-6"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentStep ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 mt-1",
                    index === currentStep
                      ? "bg-primary border-primary text-primary-foreground scale-110"
                      : "bg-muted border-muted-foreground"
                  )}
                >
                  <span className="text-lg font-semibold">{index + 1}</span>
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    {step.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="order-1 md:order-2 relative h-[300px] md:h-[400px] overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              {steps.map(
                (step, index) =>
                  index === currentStep && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -100, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Image
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                        width={1000}
                        height={500}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div';
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t",
        "bg-gradient-to-b from-muted/50 to-muted/10",
        "p-4 text-start sm:p-6",
        "hover:from-muted/60 hover:to-muted/20",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-colors duration-300",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none">
            {author.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="sm:text-md mt-4 text-sm text-muted-foreground">
        {text}
      </p>
    </Card>
  );
}

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-12 sm:py-24 px-0",
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
        </div>
      </div>
    </section>
  );
}

// Companies/Integrations Section
interface CompanyLogoProps {
  name: string;
  logo: string;
}

function CompanyLogo({ name, logo }: CompanyLogoProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-16 w-32 relative flex items-center justify-center p-4 grayscale transition-all hover:grayscale-0">
          <Image
          src={logo} 
          alt={name} 
          width={120} 
          height={60} 
          className="object-contain" 
        />
      </div>
      <span className="text-sm text-muted-foreground mt-2">{name}</span>
    </div>
  );
}

interface CompaniesProps {
  title: string;
  description: string;
  companies: CompanyLogoProps[];
  className?: string;
}

function CompaniesSection({ title, description, companies, className }: CompaniesProps) {
  return (
    <section className={cn("py-16 bg-muted/30", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {companies.map((company, index) => (
            <CompanyLogo key={index} {...company} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Landing Page Component
const ResumeATSLandingPage: React.FC = () => {
  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "ATS-Friendly Formatting",
      description: "Ensure your resume passes through Applicant Tracking Systems with our optimized formatting templates."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Keyword Optimization",
      description: "Identify and incorporate the right keywords to match job descriptions and increase your visibility."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your resume against job descriptions to provide personalized recommendations."
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Clean, Scannable Layout",
      description: "Create a resume that's easy for both ATS systems and human recruiters to scan and understand."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Skills Highlighting",
      description: "Automatically identify and highlight your most relevant skills for each job application."
    },
    {
      icon: <MoveRight className="w-6 h-6" />,
      title: "One-Click Application",
      description: "Export your optimized resume in multiple formats ready for job applications."
    }
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "Free",
      description: "Basic ATS optimization for casual job seekers",
      features: [
        "Basic ATS compatibility check",
        "Limited keyword suggestions",
        "Standard resume templates",
        "Up to 1 resume"
      ],
      ctaText: "Get Started",
      ctaLink: "/signup"
    },
    {
      name: "Professional",
      price: "$19",
      description: "Advanced optimization for serious job hunters",
      features: [
        "Advanced ATS compatibility analysis",
        "Comprehensive keyword optimization",
        "Premium resume templates",
        "Up to 5 resumes",
        "Job-specific tailoring"
      ],
      ctaText: "Try Professional",
      ctaLink: "/signup-pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49",
      description: "Complete solution for career professionals",
      features: [
        "Everything in Professional",
        "Unlimited resumes",
        "Priority support",
        "LinkedIn profile optimization",
        "Cover letter assistance",
        "Interview preparation tools"
      ],
      ctaText: "Contact Sales",
      ctaLink: "/contact"
    }
  ];

  const faqs = [
    {
      question: "What is an ATS and why does it matter?",
      answer: "An Applicant Tracking System (ATS) is software used by employers to manage job applications. It scans resumes for keywords and formatting before a human sees them. Our tool optimizes your resume to pass through these systems and reach human recruiters."
    },
    {
      question: "How does the keyword optimization work?",
      answer: "Our AI analyzes job descriptions to identify key skills and qualifications employers are looking for. It then suggests how to incorporate these keywords naturally into your resume to increase your match rate with ATS systems."
    },
    {
      question: "Can I use my existing resume?",
      answer: "Yes! You can upload your existing resume and our system will analyze it, providing suggestions for improvements in formatting, keywords, and content to make it more ATS-friendly."
    },
    {
      question: "How many resumes can I create?",
      answer: "This depends on your plan. Free users can create 1 resume, Professional users can create up to 5 resumes, and Enterprise users have unlimited resume creation."
    },
    {
      question: "Will this guarantee I get an interview?",
      answer: "While our tool significantly improves your chances of passing ATS screening, getting an interview depends on multiple factors including your qualifications and the competition. Our tool ensures your resume gets the best possible chance to be seen by human recruiters."
    }
  ];

  const processSteps = [
    { 
      step: 'Step 1', 
      title: 'Upload Your Resume',
      content: 'Simply upload your current resume in any format (PDF, DOCX, TXT) to get started.', 
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop' 
    },
    { 
      step: 'Step 2',
      title: 'AI Analysis',
      content: 'Our AI engine analyzes your resume against ATS algorithms and industry standards.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      step: 'Step 3',
      title: 'Get Recommendations',
      content: 'Receive detailed suggestions to improve keyword optimization, formatting, and content.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      step: 'Step 4',
      title: 'Download ATS-Optimized Resume',
      content: 'Download your fully optimized resume that will pass through any ATS system with flying colors.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop'
    },
  ];

  const testimonials = [
    {
      author: {
        name: "Emma Thompson",
        handle: "@emmaT",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
      },
      text: "After using the Resume ATS Optimizer, I got callbacks from 4 out of 5 jobs I applied to. The difference was night and day!",
      href: "https://twitter.com"
    },
    {
      author: {
        name: "David Park",
        handle: "@davidP",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      text: "I was getting zero responses before using this tool. Now my resume actually gets seen by recruiters instead of being filtered out.",
      href: "https://twitter.com"
    },
    {
      author: {
        name: "Sofia Rodriguez",
        handle: "@sofiaR",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      text: "The keyword optimization feature is incredible. My resume now perfectly matches job descriptions without keyword stuffing."
    }
  ];

  const companies = [
    { name: "Workday", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Workday_Logo.png" },
    { name: "Taleo", logo: "https://www.oracle.com/a/ocom/img/cb71-taleo-logo.png" },
    { name: "Greenhouse", logo: "https://www.greenhouse.com/assets/svg/logo.svg" },
    { name: "Lever", logo: "https://lever.co/wp-content/themes/lever/dist/images/logo.svg" },
    { name: "BambooHR", logo: "https://www.bamboohr.com/images/logos/bamboohr-logo.svg" },
    { name: "Jobvite", logo: "https://www.jobvite.com/wp-content/uploads/2021/02/jobvite-logo-purple.svg" },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      <Hero 
        title="Get Past the ATS Bots & Land More Interviews"
        subtitle="Our AI-powered Resume Optimizer ensures your resume passes through Applicant Tracking Systems and gets seen by real recruiters."
        ctaText="Optimize Your Resume"
        ctaLink="/signup"
        secondaryCtaText="Learn More"
        secondaryCtaLink="/how-it-works"
      />
      
      <StatsSection />
      
      <Features 
        title="Powerful Resume Optimization Tools"
        subtitle="Our comprehensive suite of tools helps you create an ATS-friendly resume that stands out to both algorithms and hiring managers."
        features={features}
      />
      
      <ResumeAnalysisDemo />
      
      <ProcessSection 
        steps={processSteps}
        title="How Our Resume ATS Optimizer Works"
        autoPlayInterval={5000}
      />
      
      <Pricing 
        title="Simple, Transparent Pricing"
        subtitle="Choose the plan that fits your job search needs and career goals."
        tiers={pricingTiers}
      />
      
      <TestimonialsSection 
        title="What our users are saying"
        description="Join thousands of job seekers who have improved their application success rate"
        testimonials={testimonials}
      />
      
      <CompaniesSection 
        title="Compatible With All Major ATS Systems"
        description="Our resume optimizer is designed to work with all the leading Applicant Tracking Systems used by employers"
        companies={companies}
      />
      
      <FAQ 
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our Resume ATS Optimizer."
        faqs={faqs}
      />
    </main>
  );
};

export default ResumeATSLandingPage;
