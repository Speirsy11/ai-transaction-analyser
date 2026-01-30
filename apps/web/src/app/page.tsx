import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@finance/auth";
import { Button } from "@finance/ui";
import {
  Smile,
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
      <nav className="bg-background/80 fixed top-0 z-50 w-full border-b backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Smile className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-xl font-bold">BudgetBuddy</span>
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
      <section className="px-4 pb-20 pt-32">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-primary/10 text-primary mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <Smile className="h-4 w-4" />
            AI-Powered Finance Management
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            Master Your Money with{" "}
            <span className="text-primary">Intelligent</span> Insights
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
            Your friendly AI buddy automatically categorizes transactions, sets
            personalized budget goals, and helps you build better money habits.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SignedOut>
              <SignUpButton>
                <Button size="lg" className="px-8 text-lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignUpButton>
              <Button variant="outline" size="lg" className="px-8 text-lg">
                Watch Demo
              </Button>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="px-8 text-lg">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-muted/50 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Everything You Need to Take Control
          </h2>
          <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg">
            Powerful features designed to simplify your financial life
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Smile,
                title: "AI Classification",
                description:
                  "Automatically categorize transactions using advanced AI. No manual tagging required.",
                color: "text-purple-500",
                bgColor: "bg-purple-500/10",
              },
              {
                icon: PieChart,
                title: "Smart Budget Goals",
                description:
                  "Your AI buddy learns your spending habits and helps you set achievable, personalized budget goals.",
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
                className="bg-card rounded-2xl border p-6 transition-shadow hover:shadow-lg"
              >
                <div
                  className={`inline-flex rounded-xl p-3 ${feature.bgColor} mb-4`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Get Started in 3 Steps
          </h2>
          <p className="text-muted-foreground mb-12 text-center text-lg">
            From upload to insights in under a minute
          </p>
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Upload Your Transactions",
                description:
                  "Export a CSV from your bank and drag it into BudgetBuddy. We support all major banks.",
              },
              {
                step: "02",
                title: "Your Buddy Gets to Work",
                description:
                  "BudgetBuddy automatically categorizes your transactions and suggests personalized goals.",
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
                className="hover:bg-muted/50 flex items-start gap-6 rounded-2xl p-6 transition-colors"
              >
                <div className="bg-primary text-primary-foreground flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground px-4 py-20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to Transform Your Finances?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Join thousands of users who have taken control of their money with
            BudgetBuddy.
          </p>
          <SignedOut>
            <SignUpButton>
              <Button size="lg" variant="secondary" className="px-8 text-lg">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="px-8 text-lg">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-12">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <Smile className="text-primary-foreground h-5 w-5" />
              </div>
              <span className="text-xl font-bold">BudgetBuddy</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 BudgetBuddy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
