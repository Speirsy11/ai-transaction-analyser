"use client";

import { useState } from "react";
import {
  Input,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@finance/ui";
import { TransactionTable } from "@finance/transactions";
import { trpc } from "@/trpc/client";
import {
  Search,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [limit] = useState(25);
  const [offset, setOffset] = useState(0);

  const transactionsQuery = trpc.transactions.list.useQuery({
    limit,
    offset,
    filters: search ? { search } : undefined,
  });

  const classifyMutation = trpc.transactions.classify.useMutation({
    onSuccess: () => {
      transactionsQuery.refetch();
    },
  });

  const deleteMutation = trpc.transactions.delete.useMutation({
    onSuccess: () => {
      transactionsQuery.refetch();
    },
  });

  const transactions = transactionsQuery.data?.data || [];
  const total = transactionsQuery.data?.total || 0;
  const hasMore = transactionsQuery.data?.hasMore || false;

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  const handlePrevPage = () => {
    setOffset(Math.max(0, offset - limit));
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOffset(0);
            }}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="housing">Housing</SelectItem>
              <SelectItem value="transportation">Transportation</SelectItem>
              <SelectItem value="food">Food & Dining</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="30">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <div className="bg-border hidden h-6 w-px sm:block" />
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <TransactionTable
        transactions={transactions.map((t) => ({
          ...t,
          category: t.category ?? undefined,
        }))}
        isLoading={transactionsQuery.isLoading}
        onClassify={(id) => classifyMutation.mutate({ id })}
        onDelete={(id) => {
          // eslint-disable-next-line no-alert -- Simple confirmation dialog for delete action
          const shouldDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
          );
          if (shouldDelete) {
            deleteMutation.mutate({ id });
          }
        }}
        onEdit={(_id) => {
          // TODO: Open edit modal
        }}
      />

      {/* Pagination */}
      {total > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            Showing{" "}
            <span className="text-foreground font-medium">
              {offset + 1}-{Math.min(offset + limit, total)}
            </span>{" "}
            of <span className="text-foreground font-medium">{total}</span>{" "}
            transactions
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handlePrevPage}
              disabled={offset === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="bg-background flex h-8 min-w-[3rem] items-center justify-center rounded-md border px-2 text-sm font-medium">
              {currentPage} / {totalPages || 1}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleNextPage}
              disabled={!hasMore}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
