// Client
export { resend, getResendClient, FROM_EMAIL } from "./client";

// Email Sending Functions
export {
  sendWelcomeEmail,
  sendBudgetAlertEmail,
  sendWeeklySummaryEmail,
  type SendEmailResult,
} from "./send";

// Templates (for preview/testing)
export { WelcomeEmail } from "./templates/welcome";
export { BudgetAlertEmail } from "./templates/budget-alert";
export { WeeklySummaryEmail } from "./templates/weekly-summary";
