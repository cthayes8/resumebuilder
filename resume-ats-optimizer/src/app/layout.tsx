import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SupabaseProvider } from "@/contexts/SupabaseContext";
import { ResumeHeader } from "@/components/Header";
import { ResumeOptimizerFooter } from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume ATS Optimizer",
  description: "Optimize your resume for Applicant Tracking Systems (ATS)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <div className="min-h-screen flex flex-col">
            <ResumeHeader />
            <main className="flex-grow">
              {children}
            </main>
            <ResumeOptimizerFooter />
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
}
