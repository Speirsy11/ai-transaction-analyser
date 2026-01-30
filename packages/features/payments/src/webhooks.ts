import type Stripe from "stripe";
import { getStripeClient } from "./stripe-client";

export type WebhookEventType =
  | "checkout.session.completed"
  | "customer.subscription.created"
  | "customer.subscription.updated"
  | "customer.subscription.deleted"
  | "invoice.paid"
  | "invoice.payment_failed";

export interface WebhookHandlers {
  onCheckoutCompleted?: (session: Stripe.Checkout.Session) => Promise<void>;
  onSubscriptionCreated?: (subscription: Stripe.Subscription) => Promise<void>;
  onSubscriptionUpdated?: (subscription: Stripe.Subscription) => Promise<void>;
  onSubscriptionDeleted?: (subscription: Stripe.Subscription) => Promise<void>;
  onInvoicePaid?: (invoice: Stripe.Invoice) => Promise<void>;
  onInvoicePaymentFailed?: (invoice: Stripe.Invoice) => Promise<void>;
}

export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  const stripe = getStripeClient();
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

export async function handleWebhookEvent(
  event: Stripe.Event,
  handlers: WebhookHandlers
): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handlers.onCheckoutCompleted?.(session);
      break;
    }

    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription;
      await handlers.onSubscriptionCreated?.(subscription);
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      await handlers.onSubscriptionUpdated?.(subscription);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await handlers.onSubscriptionDeleted?.(subscription);
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      await handlers.onInvoicePaid?.(invoice);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      await handlers.onInvoicePaymentFailed?.(invoice);
      break;
    }
  }
}

export function isRelevantEvent(eventType: string): boolean {
  const relevantEvents: WebhookEventType[] = [
    "checkout.session.completed",
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
    "invoice.paid",
    "invoice.payment_failed",
  ];
  return relevantEvents.includes(eventType as WebhookEventType);
}
