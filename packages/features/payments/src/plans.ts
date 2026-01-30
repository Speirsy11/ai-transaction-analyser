export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string | null; // Stripe Price ID
  interval: "month" | "year";
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for getting started",
    price: 0,
    priceId: null,
    interval: "month",
    features: [
      "Up to 100 transactions/month",
      "Basic AI categorization",
      "Smart budget goal tracking",
      "CSV import from major banks",
      "7-day transaction history",
    ],
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For serious budget trackers",
    price: 9.99,
    priceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || null,
    interval: "month",
    features: [
      "Unlimited transactions",
      "Advanced AI insights",
      "Custom budget categories",
      "Unlimited history",
      "Data export (CSV, JSON)",
      "Priority support",
      "Custom spending rules",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    id: "pro-yearly",
    name: "Pro Yearly",
    description: "Best value - 2 months free",
    price: 99.99,
    priceId: process.env.STRIPE_PRO_YEARLY_PRICE_ID || null,
    interval: "year",
    features: [
      "Everything in Pro",
      "Save $20/year",
      "Annual spending reports",
      "Tax categorization",
    ],
    cta: "Start Free Trial",
  },
];

export function getPlanById(id: string): PricingPlan | undefined {
  return PRICING_PLANS.find((plan) => plan.id === id);
}

export function getActivePlans(): PricingPlan[] {
  return PRICING_PLANS.filter((plan) => plan.id !== "pro-yearly");
}
