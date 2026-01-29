import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@finance/auth";
import { Button } from "@finance/ui";
import {
  Sparkles,
  PieChart,
  Upload,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">FinanceAI</span>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button>Get Started</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button>
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            AI-Powered Finance Management
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Master Your Money with{" "}
            <span className="text-primary">Intelligent</span> Insights
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Automatically categorize transactions, track spending with the
            50/30/20 rule, and get AI-powered insights to optimize your
            financial health.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SignedOut>
              <SignUpButton>
                <Button size="lg" className="text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignUpButton>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Watch Demo
              </Button>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Everything You Need to Take Control
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Powerful features designed to simplify your financial life
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "AI Classification",
                description:
                  "Automatically categorize transactions using advanced AI. No manual tagging required.",
                color: "text-purple-500",
                bgColor: "bg-purple-500/10",
              },
              {
                icon: PieChart,
                title: "50/30/20 Budgeting",
                description:
                  "Follow the proven budgeting rule with automatic tracking of needs, wants, and savings.",
                color: "text-blue-500",
                bgColor: "bg-blue-500/10",
              },
              {
                icon: Upload,
                title: "Easy Import",
                description:
                  "Import bank statements from any major bank. Just drag and drop your CSV file.",
                color: "text-green-500",
                bgColor: "bg-green-500/10",
              },
              {
                icon: Shield,
                title: "Bank-Level Security",
                description:
                  "Your data is encrypted and never shared. Privacy-first architecture you can trust.",
                color: "text-orange-500",
                bgColor: "bg-orange-500/10",
              },
              {
                icon: CheckCircle2,
                title: "Smart Insights",
                description:
                  "Get personalized recommendations to improve your spending habits and save more.",
                color: "text-teal-500",
                bgColor: "bg-teal-500/10",
              },
              {
                icon: ArrowRight,
                title: "Trend Analysis",
                description:
                  "Visualize spending patterns over time. Identify trends and optimize your budget.",
                color: "text-pink-500",
                bgColor: "bg-pink-500/10",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border hover:shadow-lg transition-shadow"
              >
                <div
                  className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Get Started in 3 Steps
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            From upload to insights in under a minute
          </p>
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Upload Your Transactions",
                description:
                  "Export a CSV from your bank and drag it into FinanceAI. We support all major banks.",
              },
              {
                step: "02",
                title: "AI Categorizes Everything",
                description:
                  "Our AI automatically categorizes each transaction into needs, wants, or savings.",
              },
              {
                step: "03",
                title: "Get Actionable Insights",
                description:
                  "View your spending breakdown, track against your budget, and get personalized tips.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-6 items-start p-6 rounded-2xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of users who have taken control of their money with
            FinanceAI.
          </p>
          <SignedOut>
            <SignUpButton>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">FinanceAI</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 FinanceAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
