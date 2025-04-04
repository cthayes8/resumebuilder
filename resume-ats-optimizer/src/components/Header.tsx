"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Search, User, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface ResumeHeaderProps {
  className?: string;
}

export function ResumeHeader({ className }: ResumeHeaderProps) {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navItems: NavItem[] = [
    {
      name: "Home",
      href: "/",
      icon: Search,
    },
    {
      name: "Optimize",
      href: "/optimize",
      icon: FileText,
    },
    {
      name: "How It Works",
      href: "/how-it-works",
      icon: HelpCircle,
    },
    {
      name: "About",
      href: "/about",
      icon: User,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">ResumeATS</span>
        </div>

        <nav className="hidden md:block">
          <ul
            className="relative flex w-fit rounded-full border border-border bg-background/50 p-1"
            onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
          >
            {navItems.map((item) => (
              <Tab key={item.name} setPosition={setPosition} href={item.href}>
                {item.name}
              </Tab>
            ))}
            <Cursor position={position} />
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/optimize">Get Started</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-border">
        <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<{
    left: number;
    width: number;
    opacity: number;
  }>>;
  href: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-4 py-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
    >
      <Link href={href} className="block">
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-8 rounded-full bg-muted"
    />
  );
};

export default ResumeHeader; 