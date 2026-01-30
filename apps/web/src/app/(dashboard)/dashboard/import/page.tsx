"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@finance/ui";
import {
  TransactionUploader,
  type ParsedTransaction,
} from "@finance/transactions";
import { trpc } from "@/trpc/client";
import { CheckCircle2, FileSpreadsheet, Sparkles, Lock } from "lucide-react";

export default function ImportPage() {
  const [lastImportCount, setLastImportCount] = useState<number | null>(null);

  const createManyMutation = trpc.transactions.createMany.useMutation({
    onSuccess: (data) => {
      setLastImportCount(data.count);
    },
  });

  const handleUpload = async (transactions: ParsedTransaction[]) => {
    await createManyMutation.mutateAsync({
      transactions: transactions.map((t) => ({
        amount: t.amount,
        date: t.date,
        description: t.description,
        merchant: t.merchant,
      })),
      autoClassify: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Import Transactions
        </h2>
        <p className="text-muted-foreground">
          Upload your bank statement to automatically import and categorize
          transactions
        </p>
      </div>

      {/* Uploader */}
      <TransactionUploader onUpload={handleUpload} />

      {/* Success Message */}
      {lastImportCount !== null && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="font-medium text-green-800 dark:text-green-200">
                Successfully imported {lastImportCount} transactions
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-base">Supported Formats</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            <ul className="space-y-1">
              <li>Monzo CSV</li>
              <li>Starling Bank CSV</li>
              <li>Revolut CSV</li>
              <li>Barclays CSV</li>
              <li>HSBC, NatWest, Lloyds, and more</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <CardTitle className="text-base">AI Classification</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            <p>
              Our AI automatically analyzes each transaction and assigns the
              most appropriate category. You can review and adjust
              classifications at any time.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-500" />
              <CardTitle className="text-base">Your Data is Secure</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            <p>
              Files are processed locally in your browser. Only the extracted
              transaction data is sent to our servers, encrypted in transit and
              at rest.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* How to Export Guide */}
      <Card>
        <CardHeader>
          <CardTitle>How to Export from Your Bank</CardTitle>
          <CardDescription>
            Step-by-step instructions for common banks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="mb-2 font-semibold">Monzo</h4>
              <ol className="text-muted-foreground list-inside list-decimal space-y-1 text-sm">
                <li>Open the Monzo app and go to your account</li>
                <li>Scroll down and tap &quot;Export transactions&quot;</li>
                <li>Select your date range</li>
                <li>Choose &quot;Export as CSV&quot; and save the file</li>
              </ol>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Starling Bank</h4>
              <ol className="text-muted-foreground list-inside list-decimal space-y-1 text-sm">
                <li>Log in to your Starling account online or via the app</li>
                <li>Go to &quot;Statements&quot; in the menu</li>
                <li>Select your date range and choose CSV format</li>
                <li>Download the statement</li>
              </ol>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Barclays</h4>
              <ol className="text-muted-foreground list-inside list-decimal space-y-1 text-sm">
                <li>Log in to Barclays Online Banking</li>
                <li>Go to your account and click &quot;Export&quot;</li>
                <li>Select CSV format and your date range</li>
                <li>Download the file</li>
              </ol>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Revolut</h4>
              <ol className="text-muted-foreground list-inside list-decimal space-y-1 text-sm">
                <li>Open the Revolut app or log in online</li>
                <li>Go to your account and tap &quot;Statements&quot;</li>
                <li>Select the date range and choose CSV format</li>
                <li>Generate and download the statement</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
