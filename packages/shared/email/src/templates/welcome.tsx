import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  userName: string;
  dashboardUrl: string;
}

export function WelcomeEmail({ userName, dashboardUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to BudgetBuddy - Your AI-powered finance assistant
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to BudgetBuddy!</Heading>
          <Text style={text}>Hi {userName},</Text>
          <Text style={text}>
            Thank you for signing up for BudgetBuddy. We&apos;re excited to help
            you take control of your finances with AI-powered insights.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={dashboardUrl}>
              Go to Dashboard
            </Button>
          </Section>
          <Text style={text}>Here&apos;s what you can do next:</Text>
          <ul style={list}>
            <li style={listItem}>Import your first bank statement via CSV</li>
            <li style={listItem}>Let our AI categorize your transactions</li>
            <li style={listItem}>
              Track your spending with personalized budget goals
            </li>
          </ul>
          <Hr style={hr} />
          <Text style={footer}>
            If you have any questions, just reply to this email. We&apos;re
            always happy to help!
          </Text>
          <Text style={footer}>- The BudgetBuddy Team</Text>
          <Hr style={hr} />
          <Link href="https://budgetbuddy.com" style={footerLink}>
            BudgetBuddy
          </Link>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "8px",
};

const h1 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "16px 48px",
};

const text = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 48px",
};

const buttonContainer = {
  margin: "32px 48px",
};

const button = {
  backgroundColor: "#7c3aed",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const list = {
  margin: "16px 48px",
  paddingLeft: "20px",
};

const listItem = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: "8px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 48px",
};

const footer = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 48px",
};

const footerLink = {
  color: "#7c3aed",
  fontSize: "14px",
  margin: "0 48px",
};

export default WelcomeEmail;
