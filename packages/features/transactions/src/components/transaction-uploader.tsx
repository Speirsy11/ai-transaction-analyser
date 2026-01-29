"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Progress,
  cn,
} from "@finance/ui";
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { parseCSV, type CSVParseResult, type ParsedTransaction } from "../csv-parser";

interface TransactionUploaderProps {
  onUpload: (transactions: ParsedTransaction[]) => Promise<void>;
  className?: string;
}

type UploadState = "idle" | "parsing" | "preview" | "uploading" | "success" | "error";

export function TransactionUploader({
  onUpload,
  className,
}: TransactionUploaderProps) {
  const [state, setState] = useState<UploadState>("idle");
  const [parseResult, setParseResult] = useState<CSVParseResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      setState("error");
      return;
    }

    setState("parsing");
    setError(null);

    try {
      const content = await file.text();
      const result = parseCSV(content);
      setParseResult(result);

      if (result.data.length === 0) {
        setError("No valid transactions found in the file");
        setState("error");
      } else {
        setState("preview");
      }
    } catch (err) {
      setError("Failed to parse CSV file");
      setState("error");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleUpload = async () => {
    if (!parseResult?.data.length) return;

    setState("uploading");
    setUploadProgress(0);

    try {
      // Simulate progress for UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      await onUpload(parseResult.data);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setState("success");
    } catch (err) {
      setError("Failed to upload transactions");
      setState("error");
    }
  };

  const reset = () => {
    setState("idle");
    setParseResult(null);
    setError(null);
    setUploadProgress(0);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Import Transactions
        </CardTitle>
        <CardDescription>
          Upload a CSV file from your bank to automatically import and categorize
          transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state === "idle" && (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              dragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">
              Drag and drop your CSV file here
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Supports most bank export formats (Chase, Bank of America, Wells
              Fargo, Capital One)
            </p>
            <label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileInput}
                className="hidden"
              />
              <Button variant="outline" asChild>
                <span>Or browse files</span>
              </Button>
            </label>
          </div>
        )}

        {state === "parsing" && (
          <div className="text-center py-8">
            <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin mb-4" />
            <p className="text-lg font-medium">Parsing CSV file...</p>
          </div>
        )}

        {state === "preview" && parseResult && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">
                Found {parseResult.data.length} transactions
              </span>
            </div>

            {parseResult.errors.length > 0 && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  {parseResult.errors.length} rows had issues:
                </p>
                <ul className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1">
                  {parseResult.errors.slice(0, 3).map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                  {parseResult.errors.length > 3 && (
                    <li>...and {parseResult.errors.length - 3} more</li>
                  )}
                </ul>
              </div>
            )}

            <div className="border rounded-lg overflow-hidden">
              <div className="max-h-48 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      <th className="p-2 text-left font-medium">Date</th>
                      <th className="p-2 text-left font-medium">Description</th>
                      <th className="p-2 text-right font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parseResult.data.slice(0, 5).map((t, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">
                          {t.date.toLocaleDateString()}
                        </td>
                        <td className="p-2 truncate max-w-[200px]">
                          {t.description}
                        </td>
                        <td
                          className={cn(
                            "p-2 text-right font-medium",
                            t.amount < 0 ? "text-red-600" : "text-green-600"
                          )}
                        >
                          ${Math.abs(t.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {parseResult.data.length > 5 && (
                <div className="p-2 bg-muted text-center text-sm text-muted-foreground">
                  ...and {parseResult.data.length - 5} more transactions
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={reset}>
                Cancel
              </Button>
              <Button onClick={handleUpload} className="flex-1">
                Import {parseResult.data.length} Transactions
              </Button>
            </div>
          </div>
        )}

        {state === "uploading" && (
          <div className="space-y-4 py-4">
            <div className="text-center">
              <Loader2 className="h-8 w-8 mx-auto text-primary animate-spin mb-2" />
              <p className="font-medium">Importing transactions...</p>
              <p className="text-sm text-muted-foreground">
                AI is categorizing your transactions
              </p>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        {state === "success" && (
          <div className="text-center py-8">
            <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
            <p className="text-lg font-medium mb-2">Import Complete!</p>
            <p className="text-sm text-muted-foreground mb-4">
              {parseResult?.data.length} transactions have been imported and
              categorized
            </p>
            <Button onClick={reset}>Import More</Button>
          </div>
        )}

        {state === "error" && (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <p className="text-lg font-medium mb-2">Import Failed</p>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={reset}>Try Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
