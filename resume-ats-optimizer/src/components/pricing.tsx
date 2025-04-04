"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    price: { monthly: "$19.99", yearly: null },
    description: "Perfect for a single resume optimization",
    features: [
      "One-time resume optimization",
      "ATS compatibility check",
      "Keyword analysis",
      "Format optimization",
      "24/7 email support",
    ],
    featured: false,
  },
  {
    name: "Standard",
    id: "tier-standard",
    price: { monthly: "$19.99", yearly: "$199" },
    description: "Best value for active job seekers",
    features: [
      "3 resume optimizations per month",
      "Everything in Basic",
      "Advanced ATS optimization",
      "Industry-specific suggestions",
      "Priority email support",
      "Job match scoring",
    ],
    featured: true,
  },
  {
    name: "Premium",
    id: "tier-premium",
    price: { monthly: "$49.99", yearly: "$499" },
    description: "Unlimited optimizations for professionals",
    features: [
      "Unlimited resume optimizations",
      "Everything in Standard",
      "Custom branding",
      "API access",
      "Team collaboration",
      "Dedicated account manager",
      "Custom integrations",
    ],
    featured: false,
  },
];

export function Pricing() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge className="mb-2">Pricing</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Choose your plan
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Select the perfect plan for your needs. All plans include our core resume optimization features.
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`flex flex-col p-6 ${
                  tier.featured
                    ? "border-2 border-primary shadow-lg scale-105"
                    : ""
                }`}
              >
                {tier.featured && (
                  <div className="absolute top-0 right-0 -translate-y-1/2">
                    <Badge variant="default">Most Popular</Badge>
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {tier.description}
                  </p>
                </div>
                <div className="mt-4">
                  <div className="text-5xl font-bold">{tier.price.monthly}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {tier.name === "Basic" ? "one-time fee" : "per month"}
                  </div>
                </div>
                <ul className="my-6 space-y-2 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`mt-auto ${
                    tier.featured ? "" : "bg-gray-900 dark:bg-gray-100"
                  }`}
                >
                  Get Started
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          All prices in USD. Monthly plans can be cancelled anytime.
        </div>
      </div>
    </section>
  );
} 