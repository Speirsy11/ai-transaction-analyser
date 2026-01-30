import Link from "next/link";
import { Button } from "@finance/ui";
import { PRICING_PLANS } from "@finance/payments";
import {
  Smile,
  PieChart,
  Upload,
  Shield,
  Zap,
  TrendingUp,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Smile className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-xl font-bold">BudgetBuddy</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              FAQ
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="http://localhost:3000/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="http://localhost:3000/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="bg-primary/5 absolute inset-0 -z-10" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center dark:bg-gray-950 dark:ring-gray-800" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
                <Smile className="h-4 w-4" />
                AI-Powered Finance Management
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Take control of your{" "}
                <span className="text-primary">finances</span> with AI
              </h1>
              <p className="text-muted-foreground mt-6 text-lg leading-8">
                BudgetBuddy is your friendly AI finance companion that
                categorizes transactions, sets personalized goals, and cheers
                you on as you build better money habits.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link href="http://localhost:3000/sign-up">
                  <Button size="lg" className="gap-2">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
              <p className="text-muted-foreground mt-4 text-sm">
                No credit card required. 14-day free trial.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to manage your money
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Powerful features that make financial management effortless
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={Sparkles}
                title="AI Categorization"
                description="Our AI automatically categorizes your transactions with 95%+ accuracy. No manual tagging required."
              />
              <FeatureCard
                icon={PieChart}
                title="Smart Budget Goals"
                description="Your buddy learns your habits and suggests personalized spending goals you can actually stick to."
              />
              <FeatureCard
                icon={Upload}
                title="Easy Import"
                description="Import transactions from any major bank via CSV. Chase, Bank of America, Wells Fargo, and more."
              />
              <FeatureCard
                icon={TrendingUp}
                title="Smart Insights"
                description="Get personalized insights about your spending patterns and actionable recommendations."
              />
              <FeatureCard
                icon={Shield}
                title="Bank-Level Security"
                description="Your data is encrypted at rest and in transit. We never sell your information."
              />
              <FeatureCard
                icon={Zap}
                title="Real-Time Updates"
                description="See your financial picture update in real-time as you add transactions."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-muted/50 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How it works
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Get started in under 5 minutes
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-3">
              <StepCard
                step={1}
                title="Upload Your Transactions"
                description="Export a CSV from your bank and upload it to BudgetBuddy. We support all major banks."
              />
              <StepCard
                step={2}
                title="AI Categorizes Everything"
                description="Our AI analyzes each transaction and assigns the most appropriate category automatically."
              />
              <StepCard
                step={3}
                title="Track & Optimize"
                description="See your spending breakdown, track your budget, and get insights to improve your finances."
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Start free, upgrade when you need more
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
              {PRICING_PLANS.filter((p) => p.id !== "pro-yearly").map(
                (plan) => (
                  <PricingCard key={plan.id} plan={plan} />
                )
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-muted/50 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>

            <div className="mx-auto mt-16 max-w-3xl divide-y">
              <FAQItem
                question="Is my financial data secure?"
                answer="Absolutely. We use bank-level encryption (AES-256) for all data at rest and TLS 1.3 for data in transit. We never sell your data and you can delete your account at any time."
              />
              <FAQItem
                question="Which banks are supported?"
                answer="We support CSV exports from all major US banks including Chase, Bank of America, Wells Fargo, Capital One, Citi, and more. Any bank that exports CSV files will work."
              />
              <FAQItem
                question="How accurate is the AI categorization?"
                answer="Our AI achieves 95%+ accuracy on common transactions. For edge cases, you can easily recategorize transactions and the AI learns from your corrections."
              />
              <FAQItem
                question="Can I cancel my subscription anytime?"
                answer="Yes! You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
              />
              <FAQItem
                question="How does BudgetBuddy set my budget goals?"
                answer="BudgetBuddy analyzes your spending patterns and income to suggest personalized, achievable goals. As you use the app, your buddy learns what works for you and adjusts recommendations to help you succeed."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-primary relative isolate overflow-hidden rounded-3xl px-6 py-24 text-center shadow-2xl sm:px-16">
              <h2 className="text-primary-foreground mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                Start taking control of your finances today
              </h2>
              <p className="text-primary-foreground/80 mx-auto mt-6 max-w-xl text-lg leading-8">
                Join thousands of users who have transformed their financial
                habits with BudgetBuddy.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link href="http://localhost:3000/sign-up">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="bg-primary flex h-6 w-6 items-center justify-center rounded">
                <Smile className="text-primary-foreground h-4 w-4" />
              </div>
              <span className="font-semibold">BudgetBuddy</span>
            </div>
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} BudgetBuddy. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card rounded-2xl border p-6 shadow-sm">
      <div className="bg-primary/10 mb-4 inline-flex rounded-lg p-3">
        <Icon className="text-primary h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
        {step}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
    </div>
  );
}

function PricingCard({
  plan,
}: {
  plan: {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
    highlighted?: boolean;
    cta: string;
  };
}) {
  return (
    <div
      className={`bg-card rounded-2xl border p-8 shadow-sm ${
        plan.highlighted ? "ring-primary ring-2" : ""
      }`}
    >
      {plan.highlighted && (
        <div className="bg-primary text-primary-foreground mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold">{plan.name}</h3>
      <p className="text-muted-foreground mt-2 text-sm">{plan.description}</p>
      <div className="mt-4">
        <span className="text-4xl font-bold">
          ${plan.price === 0 ? "0" : plan.price.toFixed(2)}
        </span>
        {plan.price > 0 && (
          <span className="text-muted-foreground">/month</span>
        )}
      </div>
      <ul className="mt-6 space-y-3">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={
          plan.id === "free"
            ? "http://localhost:3000/sign-up"
            : "http://localhost:3000/sign-up?plan=pro"
        }
        className="mt-8 block"
      >
        <Button
          className="w-full"
          variant={plan.highlighted ? "default" : "outline"}
        >
          {plan.cta}
        </Button>
      </Link>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="py-6">
      <h3 className="font-semibold">{question}</h3>
      <p className="text-muted-foreground mt-2 text-sm">{answer}</p>
    </div>
  );
}
