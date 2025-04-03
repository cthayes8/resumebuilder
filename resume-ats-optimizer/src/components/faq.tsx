"use client";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is an ATS (Applicant Tracking System)?",
    answer:
      "An ATS is software used by employers to manage job applications. It scans and filters resumes based on keywords, formatting, and other criteria before they reach human recruiters.",
  },
  {
    question: "How does the resume optimization work?",
    answer:
      "Our AI analyzes your resume against job descriptions and industry standards. It checks for keyword matches, proper formatting, and provides suggestions to improve your resume's chances of passing ATS systems.",
  },
  {
    question: "Will my resume still look good to human recruiters?",
    answer:
      "Yes! Our optimization maintains a balance between ATS compatibility and visual appeal. Your resume will be both machine-readable and professionally formatted for human reviewers.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support PDF, Word (DOC, DOCX), and plain text files. After optimization, you can export your resume in any of these formats.",
  },
  {
    question: "How often can I update my resume?",
    answer:
      "This depends on your plan. Basic users can optimize 2 resumes per month, while Pro and Enterprise users have unlimited optimizations.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take security seriously. All data is encrypted in transit and at rest. We never share your personal information or resume data with third parties.",
  },
];

export function FAQ() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge className="mb-2">FAQ</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Everything you need to know about our resume optimization service.
            </p>
          </div>
        </div>
        <motion.div
          className="mx-auto max-w-3xl mt-8 grid gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
} 