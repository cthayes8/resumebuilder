"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import { GripVertical, Search, Check, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      {children}
    </div>
  );
};

const ResumeAnalysisDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { name: "Upload", description: "Upload your resume document and paste the job description" },
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
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge className="mb-2">Process</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Intelligent Document Analysis
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our AI engine scans your resume, identifying key elements and comparing them against industry standards and specific job requirements.
            </p>
          </div>
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
                <Card
                  key={step.name}
                  className={cn(
                    "p-4 transition-colors w-full",
                    currentStep === index
                      ? "bg-primary/5 border-primary"
                      : "bg-card"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                        currentStep === index
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{step.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {step.description}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative aspect-square rounded-xl overflow-hidden">
            <div className="absolute inset-0">
              <AnimatePresence>
                {currentStep === 0 && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-3/4 h-4/5 bg-card border rounded-lg p-6 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/80 to-primary mb-4 flex items-center justify-center">
                        <ArrowRight className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="space-y-2 text-center">
                        <p className="text-muted-foreground font-medium">
                          Upload your resume document
                        </p>
                        <p className="text-sm text-muted-foreground/80">
                          and paste the job description
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-3/4 h-4/5 bg-card border rounded-lg p-6">
                      <div className="h-full flex flex-col">
                        <div className="flex-1 space-y-4">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="h-4 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/60 rounded"
                              initial={{ width: "0%" }}
                              animate={{
                                width: currentStep === 1 ? "100%" : "0%",
                              }}
                              transition={{
                                duration: 0.5,
                                delay: i * 0.1,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-3/4 h-4/5 bg-card border rounded-lg p-6">
                      <div className="h-full flex flex-col space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="h-4 bg-gradient-to-r from-green-400 to-green-600 rounded w-1/3" />
                          <div className="h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded w-1/4" />
                          <div className="h-4 bg-gradient-to-r from-red-400 to-red-600 rounded w-1/3" />
                        </div>
                        <div className="flex-1 space-y-4">
                          {features.slice(0, 5).map((feature, i) => (
                            <motion.div
                              key={i}
                              className="flex items-center justify-between"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: i * 0.1,
                              }}
                            >
                              <div className="flex items-center space-x-2 flex-1">
                                <div className={cn(
                                  "h-3 w-3 rounded-full",
                                  i % 3 === 0 ? "bg-gradient-to-br from-green-400 to-green-600" :
                                  i % 3 === 1 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" :
                                  "bg-gradient-to-br from-red-400 to-red-600"
                                )} />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </div>
                              <div className="flex-1 mx-4 border-t border-dashed border-muted-foreground/20" />
                              <Badge variant={
                                i % 3 === 0 ? "default" :
                                i % 3 === 1 ? "secondary" :
                                "outline"
                              } className={cn(
                                "ml-2",
                                i % 3 === 0 ? "bg-gradient-to-r from-green-500/80 to-green-600" :
                                i % 3 === 1 ? "bg-gradient-to-r from-yellow-500/80 to-yellow-600" :
                                "border-red-500/50"
                              )}>
                                {i % 3 === 0 ? "Match" : i % 3 === 1 ? "Partial" : "Missing"}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-3/4 h-4/5 bg-card border rounded-lg p-6">
                      <div className="h-full flex flex-col space-y-6">
                        <div className="space-y-4">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="flex items-center space-x-4"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                duration: 0.4,
                                delay: i * 0.2,
                              }}
                            >
                              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="h-4 bg-gradient-to-r from-primary/40 to-primary rounded w-3/4" />
                                <div className="h-3 bg-muted rounded w-1/2 mt-2" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

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
      </div>
    </section>
  );
};

export default ResumeAnalysisDemo; 