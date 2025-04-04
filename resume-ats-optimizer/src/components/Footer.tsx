"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  Briefcase,
  Award,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  ChevronRight,
  BookOpen,
  Shield,
  HelpCircle,
} from "lucide-react";
import { motion } from "framer-motion";

interface SocialLink {
  name: string;
  href: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>> | React.ComponentType<any>;
}

interface FooterLink {
  name: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>> | React.ComponentType<any>;
  href?: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  brand: {
    name: string;
    description: string;
  };
  socialLinks: SocialLink[];
  columns: FooterColumn[];
  copyright?: string;
}

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  ({ className, brand, socialLinks, columns, copyright, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("pt-16 bg-background", className)}
        {...props}
      >
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <a href="/" className="text-2xl font-bold text-foreground">
                {brand.name}
              </a>
              <p className="text-sm text-foreground/60 mt-2">
                {brand.description}
              </p>

              <div className="flex space-x-3 mt-6">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-muted hover:bg-muted/80 text-foreground/70 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.name}
                  >
                    <link.Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-8 gap-8">
              {columns.map(({ title, links }) => (
                <div key={title}>
                  <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
                  <ul className="space-y-3">
                    {links.map(({ name, Icon, href }) => (
                      <li key={name}>
                        <a
                          href={href || "#"}
                          className="text-sm flex items-center text-foreground/60 hover:text-foreground transition-colors group"
                        >
                          <Icon className="h-4 w-4 mr-2 text-foreground/50 group-hover:text-foreground/80" />
                          <span>{name}</span>
                          <ChevronRight className="h-3 w-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {copyright && (
            <div className="mt-12 pt-6 border-t border-border">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-xs text-foreground/50">{copyright}</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <a href="/privacy" className="text-xs text-foreground/50 hover:text-foreground/80">
                    Privacy Policy
                  </a>
                  <a href="/terms" className="text-xs text-foreground/50 hover:text-foreground/80">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Footer.displayName = "Footer";

export function ResumeOptimizerFooter() {
  return (
    <Footer
      className="mt-20"
      brand={{
        name: "ResumeATS",
        description: "Optimize your resume for ATS systems and land more interviews.",
      }}
      socialLinks={[
        {
          name: "Twitter",
          href: "https://twitter.com",
          Icon: Twitter,
        },
        {
          name: "LinkedIn",
          href: "https://linkedin.com",
          Icon: Linkedin,
        },
        {
          name: "Instagram",
          href: "https://instagram.com",
          Icon: Instagram,
        },
      ]}
      columns={[
        {
          title: "Product",
          links: [
            {
              name: "Resume Scanner",
              Icon: FileText,
              href: "/scanner",
            },
            {
              name: "Job Match",
              Icon: Briefcase,
              href: "/job-match",
            },
            {
              name: "Premium Features",
              Icon: Award,
              href: "/premium",
            },
            {
              name: "Resume Templates",
              Icon: BookOpen,
              href: "/templates",
            },
          ],
        },
        {
          title: "Company",
          links: [
            {
              name: "About Us",
              Icon: Shield,
              href: "/about",
            },
            {
              name: "Careers",
              Icon: Briefcase,
              href: "/careers",
            },
            {
              name: "Blog",
              Icon: BookOpen,
              href: "/blog",
            },
            {
              name: "Contact",
              Icon: Mail,
              href: "/contact",
            },
          ],
        },
        {
          title: "Support",
          links: [
            {
              name: "Help Center",
              Icon: HelpCircle,
              href: "/help",
            },
            {
              name: "FAQ",
              Icon: HelpCircle,
              href: "/faq",
            },
            {
              name: "Email Support",
              Icon: Mail,
              href: "mailto:support@resumeats.com",
            },
            {
              name: "Call Us",
              Icon: Phone,
              href: "tel:+1234567890",
            },
          ],
        },
      ]}
      copyright="© 2024 ResumeATS. All rights reserved."
    />
  );
}

export default ResumeOptimizerFooter; 