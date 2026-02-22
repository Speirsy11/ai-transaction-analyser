/* eslint-disable */
/**
 * Generated API.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

import type * as analytics from "../analytics.js";
import type * as ai from "../ai.js";
import type * as categories from "../categories.js";
import type * as email from "../email.js";
import type * as http from "../http.js";
import type * as lib_auth from "../lib/auth.js";
import type * as stripe from "../stripe.js";
import type * as subscriptions from "../subscriptions.js";
import type * as transactions from "../transactions.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  analytics: typeof analytics;
  ai: typeof ai;
  categories: typeof categories;
  email: typeof email;
  http: typeof http;
  "lib/auth": typeof lib_auth;
  stripe: typeof stripe;
  subscriptions: typeof subscriptions;
  transactions: typeof transactions;
  users: typeof users;
}>;

export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
