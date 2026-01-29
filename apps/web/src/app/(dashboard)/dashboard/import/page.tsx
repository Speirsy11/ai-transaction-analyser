"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@finance/ui";
import { TransactionUploader, type ParsedTransaction } from "@finance/transactions";
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
        <h2 className="text-2xl font-bold tracking-tight">Import Transactions</h2>
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
          <CardContent className="text-sm text-muted-foreground">
            <ul className="space-y-1">
              <li>Chase Bank CSV</li>
              <li>Bank of America CSV</li>
              <li>Wells Fargo CSV</li>
              <li>Capital One CSV</li>
              <li>Generic CSV (date, description, amount)</li>
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
          <CardContent className="text-sm text-muted-foreground">
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
          <CardContent className="text-sm text-muted-foreground">
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
              <h4 className="font-semibold mb-2">Chase</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Log in to chase.com</li>
                <li>Go to your account and select "See statements and activity"</li>
                <li>Click "Download activity" and select CSV format</li>
                <li>Choose your date range and download</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Bank of America</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Log in to bankofamerica.com</li>
                <li>Go to your account and click "Download"</li>
                <li>Select "Microsoft Excel" or "CSV" format</li>
                <li>Choose your date range and download</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Wells Fargo</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Log in to wellsfargo.com</li>
                <li>Go to your account and select "Download Account Activity"</li>
                <li>Choose CSV format and your date range</li>
                <li>Click "Download"</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
