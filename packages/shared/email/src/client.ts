import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey && process.env.NODE_ENV === "production") {
  throw new Error("RESEND_API_KEY is required in production");
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export function getResendClient(): Resend {
  if (!resend) {
    throw new Error("Resend is not configured. Set RESEND_API_KEY.");
  }
  return resend;
}

export const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@financeai.com";
