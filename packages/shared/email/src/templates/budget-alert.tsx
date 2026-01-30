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

interface BudgetAlertEmailProps {
  userName: string;
  categoryName: string;
  budgetAmount: number;
  spentAmount: number;
  percentageUsed: number;
  dashboardUrl: string;
}

export function BudgetAlertEmail({
  userName,
  categoryName,
  budgetAmount,
  spentAmount,
  percentageUsed,
  dashboardUrl,
}: BudgetAlertEmailProps) {
  const isOver = percentageUsed >= 100;
  const alertColor = isOver ? "#dc2626" : "#f59e0b";

  return (
    <Html>
      <Head />
      <Preview>
        {isOver ? "Budget exceeded" : "Budget warning"}: {categoryName}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <div
            style={{
              ...alertBanner,
              backgroundColor: alertColor,
            }}
          >
            <Text style={alertText}>
              {isOver ? "BUDGET EXCEEDED" : "BUDGET WARNING"}
            </Text>
          </div>
          <Heading style={h1}>{categoryName}</Heading>
          <Text style={text}>Hi {userName},</Text>
          <Text style={text}>
            {isOver
              ? `You've exceeded your budget for ${categoryName}.`
              : `You're approaching your budget limit for ${categoryName}.`}
          </Text>

          <Section style={statsContainer}>
            <div style={statBox}>
              <Text style={statLabel}>Budget</Text>
              <Text style={statValue}>${budgetAmount.toFixed(2)}</Text>
            </div>
            <div style={statBox}>
              <Text style={statLabel}>Spent</Text>
              <Text
                style={{ ...statValue, color: isOver ? "#dc2626" : "#1f2937" }}
              >
                ${spentAmount.toFixed(2)}
              </Text>
            </div>
            <div style={statBox}>
              <Text style={statLabel}>Used</Text>
              <Text
                style={{ ...statValue, color: isOver ? "#dc2626" : "#f59e0b" }}
              >
                {percentageUsed.toFixed(0)}%
              </Text>
            </div>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={dashboardUrl}>
              View Budget Details
            </Button>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            You can adjust your budget alerts in{" "}
            <Link href={`${dashboardUrl}/settings`} style={footerLink}>
              Settings
            </Link>
            .
          </Text>
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
  marginBottom: "64px",
  borderRadius: "8px",
  overflow: "hidden",
};

const alertBanner = {
  padding: "12px",
  textAlign: "center" as const,
};

const alertText = {
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "1px",
  margin: "0",
};

const h1 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "24px 48px 16px",
};

const text = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 48px",
};

const statsContainer = {
  display: "flex",
  margin: "24px 48px",
  gap: "16px",
};

const statBox = {
  flex: "1",
  textAlign: "center" as const,
  padding: "16px",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
};

const statLabel = {
  color: "#6b7280",
  fontSize: "12px",
  fontWeight: "500",
  margin: "0 0 4px",
  textTransform: "uppercase" as const,
};

const statValue = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0",
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

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 48px",
};

const footer = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 48px 32px",
};

const footerLink = {
  color: "#7c3aed",
};

export default BudgetAlertEmail;
