"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import { GripVertical, Search, Check, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CompareProps {
  firstImage?: string;
  secondImage?: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
}

const Compare = ({
  firstImage = "",
  secondImage = "",
  className,
  firstImageClassName,
  secondImageClassname,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
}: CompareProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  function mouseEnterHandler() {
    setIsMouseOver(true);
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    if (slideMode === "hover") {
      setSliderXPercent(initialSliderPercentage);
    }
    if (slideMode === "drag") {
      setIsDragging(false);
    }
  }

  const handleStart = useCallback(
    (clientX: number) => {
      if (slideMode === "drag") {
        setIsDragging(true);
      }
    },
    [slideMode]
  );

  const handleEnd = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(false);
    }
  }, [slideMode]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(0, Math.min(100, percent)));
        });
      }
    },
    [slideMode, isDragging]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => handleStart(e.clientX),
    [handleStart]
  );
  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handleMove(e.clientX),
    [handleMove]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      handleStart(e.touches[0].clientX);
    },
    [handleStart]
  );

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  return (
    <div
      ref={sliderRef}
      className={cn("w-[400px] h-[400px] overflow-hidden", className)}
      style={{
        position: "relative",
        cursor: slideMode === "drag" ? "grab" : "col-resize",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <motion.div
        className="h-full w-px absolute top-0 m-auto z-30 bg-gradient-to-b from-transparent from-[5%] to-[95%] via-indigo-500 to-transparent"
        style={{
          left: `${sliderXPercent}%`,
          top: "0",
          zIndex: 40,
        }}
        transition={{ duration: 0 }}
      >
        <div className="w-36 h-full [mask-image:radial-gradient(100px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-indigo-400 via-transparent to-transparent z-20 opacity-50" />
        <div className="w-10 h-1/2 [mask-image:radial-gradient(50px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-cyan-400 via-transparent to-transparent z-10 opacity-100" />
        {showHandlebar && (
          <div className="h-5 w-5 rounded-md top-1/2 -translate-y-1/2 bg-white z-30 -right-2.5 absolute flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40]">
            <GripVertical className="h-4 w-4 text-black" />
          </div>
        )}
      </motion.div>

      <div className="overflow-hidden w-full h-full relative z-20 pointer-events-none">
        {firstImage ? (
          <motion.div
            className={cn(
              "absolute inset-0 z-20 rounded-2xl flex-shrink-0 w-full h-full select-none overflow-hidden",
              firstImageClassName
            )}
            style={{
              clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
            }}
            transition={{ duration: 0 }}
          >
            <img
              alt="first image"
              src={firstImage}
              className={cn(
                "absolute inset-0 z-20 rounded-2xl flex-shrink-0 w-full h-full select-none",
                firstImageClassName
              )}
              draggable={false}
            />
          </motion.div>
        ) : null}
      </div>

      {secondImage ? (
        <motion.img
          className={cn(
            "absolute top-0 left-0 z-[19] rounded-2xl w-full h-full select-none",
            secondImageClassname
          )}
          alt="second image"
          src={secondImage}
          draggable={false}
        />
      ) : null}
    </div>
  );
};

const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const dotPattern = (color: string) => ({
    backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
    backgroundSize: '16px 16px',
  });

  return (
    <div
      className={cn(
        "relative h-[40rem] flex items-center bg-white dark:bg-black justify-center w-full group",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-70" 
        style={dotPattern('rgb(212 212 212)')} // neutral-300 for light mode
      />
      <div 
        className="absolute inset-0 dark:opacity-70 opacity-0 pointer-events-none" 
        style={dotPattern('rgb(38 38 38)')} // neutral-800 for dark mode
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          ...dotPattern('rgb(99 102 241)'), // indigo-500
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

interface FeatureComparisonProps {
  title: string;
  features: string[];
  included: boolean[];
}

const FeatureComparison = ({ features, included, title }: FeatureComparisonProps) => {
  return (
    <Card className="p-6 h-full">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            {included[index] ? (
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : (
              <X className="h-5 w-5 text-red-500 flex-shrink-0" />
            )}
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

const ResumeAnalysisDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { name: "Upload", description: "Upload your resume document" },
    { name: "Scan", description: "AI scans for keywords and structure" },
    { name: "Match", description: "Matching against job requirements" },
    { name: "Optimize", description: "Get optimization suggestions" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  const features = [
    "Keyword Analysis",
    "ATS Compatibility Check",
    "Industry-Specific Suggestions",
    "Format Optimization",
    "Skills Gap Analysis",
    "Tailored Recommendations",
    "Real-time Feedback",
    "Job Match Scoring"
  ];

  return (
    <div className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How Our Resume Analysis Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered resume analysis helps you stand out from the competition with
            intelligent optimization suggestions tailored to your target job.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge>Process</Badge>
              <h3 className="text-2xl font-semibold">Intelligent Document Analysis</h3>
              <p className="text-muted-foreground">
                Our AI engine scans your resume, identifying key elements and comparing them
                against industry standards and specific job requirements.
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "flex items-center p-4 rounded-lg border transition-colors",
                    currentStep === index
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  )}
                  animate={{
                    borderColor: currentStep === index ? "hsl(var(--primary))" : "hsl(var(--border))",
                    backgroundColor: currentStep === index ? "hsl(var(--primary) / 0.05)" : "transparent",
                  }}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mr-4",
                      currentStep === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{step.name}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button className="mt-4">
              Try Resume Analysis <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="relative h-[500px] rounded-xl overflow-hidden border bg-card">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentStep === 0 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-3/4 h-4/5 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Upload your resume</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentStep === 1 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-3/4 h-4/5 bg-card border rounded-lg p-6">
                <div className="h-full flex flex-col">
                  <div className="flex-1 space-y-2">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-4 bg-muted rounded"
                        initial={{ width: "0%" }}
                        animate={{ 
                          width: currentStep === 1 ? `${Math.random() * 50 + 50}%` : "0%" 
                        }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                  <motion.div
                    className="h-2 bg-primary rounded-full mt-4"
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: currentStep === 1 ? "100%" : "0%" 
                    }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentStep === 2 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-3/4 h-4/5 bg-card border rounded-lg p-6">
                <div className="h-full flex flex-col">
                  <div className="flex-1 space-y-4">
                    {features.slice(0, 5).map((feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ 
                          x: currentStep === 2 ? 0 : -20,
                          opacity: currentStep === 2 ? 1 : 0
                        }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <div className={cn(
                          "w-2 h-2 rounded-full mr-2",
                          i % 3 === 0 ? "bg-green-500" : i % 3 === 1 ? "bg-yellow-500" : "bg-red-500"
                        )} />
                        <span className="text-sm">{feature}</span>
                        <div className="flex-1 mx-2 border-t border-dashed border-muted" />
                        <Badge variant={i % 3 === 0 ? "default" : i % 3 === 1 ? "secondary" : "outline"}>
                          {i % 3 === 0 ? "Match" : i % 3 === 1 ? "Partial" : "Missing"}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentStep === 3 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-3/4 h-4/5 bg-card border rounded-lg p-6">
                <div className="h-full flex flex-col">
                  <div className="flex-1 space-y-4">
                    {[
                      "Add quantifiable achievements",
                      "Include relevant keywords: 'data analysis', 'project management'",
                      "Remove outdated skills section",
                      "Improve formatting consistency",
                      "Add LinkedIn profile URL"
                    ].map((suggestion, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ 
                          y: currentStep === 3 ? 0 : 20,
                          opacity: currentStep === 3 ? 1 : 0
                        }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <div className="mt-0.5">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm">{suggestion}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <Separator className="my-16" />

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-12">Before & After Comparison</h3>
          <div className="flex justify-center">
            <Compare
              firstImage="https://assets.aceternity.com/code-solution.png"
              secondImage="https://assets.aceternity.com/code-problem.png"
              className="h-[300px] md:h-[500px] w-full max-w-3xl rounded-xl"
              slideMode="drag"
            />
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <Badge variant="outline">Before Optimization</Badge>
            <Badge variant="default">After Optimization</Badge>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-center mb-12">Feature Comparison</h3>
          
          <Tabs defaultValue="basic" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureComparison 
                  title="Basic Analysis"
                  features={features}
                  included={[true, true, false, true, false, false, false, false]}
                />
                <FeatureComparison 
                  title="Premium Analysis"
                  features={features}
                  included={[true, true, true, true, true, true, false, false]}
                />
                <FeatureComparison 
                  title="Enterprise Analysis"
                  features={features}
                  included={[true, true, true, true, true, true, true, true]}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="premium" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureComparison 
                  title="Basic Analysis"
                  features={features}
                  included={[true, true, false, true, false, false, false, false]}
                />
                <FeatureComparison 
                  title="Premium Analysis"
                  features={features}
                  included={[true, true, true, true, true, true, false, false]}
                />
                <FeatureComparison 
                  title="Enterprise Analysis"
                  features={features}
                  included={[true, true, true, true, true, true, true, true]}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="enterprise" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureComparison 
                  title="Basic Analysis"
                  features={features}
                  included={[true, true, false, true, false, false, false, false]}
                />
                <FeatureComparison 
                  title="Premium Analysis"
                  features={features}
                  included={[true, true, true, true, true, true, false, false]}
                />
                <FeatureComparison 
                  title="Enterprise Analysis"
                  features={features}
                  included={[true, true, true, true, true, true, true, true]}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <HeroHighlight containerClassName="mt-20 h-auto py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto px-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to optimize your resume?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of job seekers who have improved their chances of landing interviews with our AI-powered resume analysis.
            </p>
            <Button size="lg">
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </HeroHighlight>
      </div>
    </div>
  );
};

export default ResumeAnalysisDemo; 