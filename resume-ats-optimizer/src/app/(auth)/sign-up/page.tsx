'use client';

import { useSearchParams } from 'next/navigation';
import { Auth } from '@/components/auth/auth'
import { Progress } from "@/components/ui/progress"
import { Lock } from "lucide-react"
import { Check, X } from "lucide-react"

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  return (
    <>
      {/* Progress Indicator */}
      <div className="w-full mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Lock className="w-4 h-4 text-white" />
          </div>
          <div className="ml-3">
            <p className="font-medium">Create Account</p>
            <p className="text-sm text-muted-foreground">Step 2 of 4</p>
          </div>
        </div>
        <Progress value={50} className="h-2" />
      </div>

      {/* Auth Form */}
      <div className="w-full">
        <Auth view="sign_up" showHeader={false} />
      </div>

      {/* Benefits */}
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-medium text-center">What you'll get:</h3>
        <ul className="space-y-3">
          <FeatureItem available>AI-powered resume analysis</FeatureItem>
          <FeatureItem available>ATS compatibility check</FeatureItem>
          <FeatureItem available>Keyword optimization</FeatureItem>
          <FeatureItem available>Unlimited resume versions</FeatureItem>
        </ul>
      </div>
    </>
  )
}

function FeatureItem({ children, available }: { children: React.ReactNode; available?: boolean }) {
  return (
    <li className="flex items-center gap-2">
      {available ? (
        <Check className="w-5 h-5 text-green-500" />
      ) : (
        <X className="w-5 h-5 text-red-500" />
      )}
      <span className={available ? "text-foreground" : "text-muted-foreground"}>
        {children}
      </span>
    </li>
  );
} 