import { getStripeClient } from "./stripe-client";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "incomplete"
  | "incomplete_expired"
  | "paused";

export interface UserSubscription {
  id: string;
  status: SubscriptionStatus;
  planId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  customerId: string;
}

export async function getSubscription(
  subscriptionId: string
): Promise<UserSubscription | null> {
  const stripe = getStripeClient();

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    return {
      id: subscription.id,
      status: subscription.status as SubscriptionStatus,
      planId: (subscription.metadata.planId as string) || "pro",
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      customerId:
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id,
    };
  } catch {
    return null;
  }
}

export async function cancelSubscription(
  subscriptionId: string,
  immediately = false
): Promise<void> {
  const stripe = getStripeClient();

  if (immediately) {
    await stripe.subscriptions.cancel(subscriptionId);
  } else {
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
  }
}

export async function resumeSubscription(
  subscriptionId: string
): Promise<void> {
  const stripe = getStripeClient();

  await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
}

export async function getCustomerSubscriptions(
  customerId: string
): Promise<UserSubscription[]> {
  const stripe = getStripeClient();

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "all",
  });

  return subscriptions.data.map((sub) => ({
    id: sub.id,
    status: sub.status as SubscriptionStatus,
    planId: (sub.metadata.planId as string) || "pro",
    currentPeriodStart: new Date(sub.current_period_start * 1000),
    currentPeriodEnd: new Date(sub.current_period_end * 1000),
    cancelAtPeriodEnd: sub.cancel_at_period_end,
    customerId:
      typeof sub.customer === "string" ? sub.customer : sub.customer.id,
  }));
}

export function isActiveSubscription(status: SubscriptionStatus): boolean {
  return status === "active" || status === "trialing";
}
