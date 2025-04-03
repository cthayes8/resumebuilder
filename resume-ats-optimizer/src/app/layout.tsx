import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SupabaseProvider } from "@/contexts/SupabaseContext";
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
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
