import { Metadata } from 'next'
import { Auth } from '@/components/auth/auth'
import { Progress } from "@/components/ui/progress"
import { Lock } from "lucide-react"

export const metadata: Metadata = {
  title: 'Sign In | Resume ATS Optimizer',
  description: 'Sign in to your account to access the Resume ATS Optimizer.',
}

export default function SignInPage() {
  return (
    <>
      {/* Progress Indicator */}
      <div className="w-full mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Lock className="w-4 h-4 text-white" />
          </div>
          <div className="ml-3">
            <p className="font-medium">Sign In</p>
            <p className="text-sm text-muted-foreground">Welcome Back</p>
          </div>
        </div>
        <Progress value={50} className="h-2" />
      </div>

      {/* Auth Form */}
      <div className="w-full">
        <Auth view="sign_in" showHeader={false} />
      </div>

      {/* Benefits */}
      <div className="w-full max-w-md mt-12">
        <h2 className="text-lg font-semibold mb-4">Resume ATS Features:</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <span className="text-primary text-sm">✓</span>
            </div>
            <div>
              <p className="font-medium">Resume History</p>
              <p className="text-sm text-muted-foreground">Access all your previous resume optimizations</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <span className="text-primary text-sm">✓</span>
            </div>
            <div>
              <p className="font-medium">Multiple Job Targets</p>
              <p className="text-sm text-muted-foreground">Optimize your resume for different job positions</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <span className="text-primary text-sm">✓</span>
            </div>
            <div>
              <p className="font-medium">Progress Tracking</p>
              <p className="text-sm text-muted-foreground">Monitor your resume's improvement over time</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
} 