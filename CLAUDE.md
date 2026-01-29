# **Agent Directive: AI-Native Finance Platform (SaaS)**

**Objective:** Build a privacy-first personal finance dashboard with a strict "Shared → Feature → Composition" architecture enforced by Turborepo Boundaries.

## **1\. Tech Stack & Standards**

* **Core:** Turborepo (v2.x+), Next.js 16 (App Router), TypeScript.  
* **State/API:** tRPC (v11), React Query, Zod.  
* **Auth:** Clerk.  
* **Database:** PostgreSQL, Drizzle ORM.  
* **AI:** Vercel AI SDK (Adapter pattern).  
* **Payments:** Stripe.

## **2\. Monorepo Structure & Boundaries**

The repository is partitioned into three layers. Imports must flow strictly **upwards** (Shared → Features → Compositions).

.  
├── apps/ (Type: Composition)  
│   ├── web/                  \# Next.js Dashboard (Imports Features & Shared)  
│   └── marketing/            \# Landing Page (Imports Features & Shared)  
│  
├── packages/  
│   ├── features/ (Type: Feature)  
│   │   ├── auth/             \# Clerk wrappers, User context  
│   │   ├── transactions/     \# Import logic, parsing, classification  
│   │   └── analytics/        \# 50/30/20 math, Budgeting logic  
│   │  
│   └── shared/ (Type: Shared)  
│       ├── ui/               \# Shadcn UI primitives (Button, Card)  
│       ├── db/               \# Drizzle Client & Schema  
│       ├── api/              \# tRPC root builder (no router logic)  
│       ├── ai/               \# Vercel AI SDK setup  
│       └── config/           \# TSConfig, ESLint

### **Boundary Rules (Enforced by turbo.json)**

| Package Type | Tag | Can Import | Forbidden Imports |
| :---- | :---- | :---- | :---- |
| **Composition** | type:composition | Any (type:feature, type:shared) | None |
| **Feature** | type:feature | type:shared | type:feature, type:composition |
| **Shared** | type:shared | type:shared | type:feature, type:composition |

## **3\. Configuration**

### **Root turbo.json**

Enforce the boundaries globally.

JSON

{  
  "$schema": "https://turbo.build/schema.json",  
  "boundaries": {  
    "tags": {  
      "type:feature": {  
        "dependencies": {  
          "deny": \["type:feature", "type:composition"\]  
        }  
      },  
      "type:shared": {  
        "dependencies": {  
          "deny": \["type:feature", "type:composition"\]  
        }  
      }  
    }  
  }  
}

### **Package-Level turbo.json (Examples)**

**packages/features/transactions/turbo.json**

JSON

{  
  "extends": \["//"\],  
  "tags": \["type:feature"\]  
}

**packages/shared/ui/turbo.json**

JSON

{  
  "extends": \["//"\],  
  "tags": \["type:shared"\]  
}

## **4\. Development Epics**

### **Epic A: Foundation & Infrastructure**

* \[ \] Initialize Turborepo with the 3-layer structure.  
* \[ \] Configure packages/shared/db (Drizzle) and packages/shared/ui (Shadcn).  
* \[ \] Set up **Turborepo Boundaries** to fail build on illegal imports.

### **Epic B: Feature Packages (packages/features/\*)**

* \[ \] **@finance/auth**: Encapsulate Clerk logic and useUser hooks.  
* \[ \] **@finance/transactions**:  
  * Zod schemas for Transaction.  
  * CSV parsing utilities.  
  * classifyTransaction() function (AI logic).  
* \[ \] **@finance/analytics**:  
  * Pure functions for 50/30/20 calculations.  
  * Budget forecasting algorithms.

### **Epic C: Compositions (apps/web)**

* \[ \] Create (app)/dashboard/page.tsx.  
* \[ \] Import TransactionTable from @finance/transactions (Note: Features should export domain-specific components).  
* \[ \] Import BudgetGauge from @finance/analytics.  
* \[ \] Wire up tRPC routers by importing routers from features and merging them in apps/web/app/api/trpc.

### **Epic D: Intelligence Layer (packages/shared/ai)**

* \[ \] Implement the "Model Registry" adapter.  
* \[ \] Expose generic askAI() helper used by @finance/transactions.  
* \[ \] **Constraint:** shared/ai cannot import features/transactions. Data must be passed as arguments.

## **5\. Critical Database Schema (Drizzle)**

Located in packages/shared/db.

Code snippet

model Transaction {  
  id             String   @id @default(cuid())  
  userId         String   // Managed by @finance/auth  
  amount         Float  
  date           DateTime  
  description    String  
  merchant       String?  
  category       String?  // Enriched by @finance/transactions  
  necessityScore Float?   // Calculated by @finance/analytics  
}  
