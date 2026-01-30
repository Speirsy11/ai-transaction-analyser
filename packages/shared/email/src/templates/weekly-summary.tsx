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

interface CategorySummary {
  name: string;
  amount: number;
  percentage: number;
}

interface WeeklySummaryEmailProps {
  userName: string;
  weekStartDate: string;
  weekEndDate: string;
  totalSpent: number;
  totalIncome: number;
  netSavings: number;
  topCategories: CategorySummary[];
  budgetStatus: {
    needs: { spent: number; budget: number };
    wants: { spent: number; budget: number };
    savings: { spent: number; budget: number };
  };
  dashboardUrl: string;
}

export function WeeklySummaryEmail({
  userName,
  weekStartDate,
  weekEndDate,
  totalSpent,
  totalIncome,
  netSavings,
  topCategories,
  budgetStatus,
  dashboardUrl,
}: WeeklySummaryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Your weekly finance summary: ${totalSpent.toFixed(0)} spent
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Weekly Summary</Heading>
          <Text style={dateRange}>
            {weekStartDate} - {weekEndDate}
          </Text>
          <Text style={greeting}>Hi {userName},</Text>
          <Text style={text}>
            Here&apos;s your financial summary for the past week:
          </Text>

          {/* Overview Stats */}
          <Section style={statsContainer}>
            <div style={statBox}>
              <Text style={statLabel}>Income</Text>
              <Text style={{ ...statValue, color: "#059669" }}>
                +${totalIncome.toFixed(2)}
              </Text>
            </div>
            <div style={statBox}>
              <Text style={statLabel}>Spent</Text>
              <Text style={{ ...statValue, color: "#dc2626" }}>
                -${totalSpent.toFixed(2)}
              </Text>
            </div>
            <div style={statBox}>
              <Text style={statLabel}>Saved</Text>
              <Text
                style={{
                  ...statValue,
                  color: netSavings >= 0 ? "#059669" : "#dc2626",
                }}
              >
                {netSavings >= 0 ? "+" : ""}${netSavings.toFixed(2)}
              </Text>
            </div>
          </Section>

          {/* 50/30/20 Progress */}
          <Section style={sectionContainer}>
            <Text style={sectionTitle}>50/30/20 Budget Progress</Text>
            <BudgetBar
              label="Needs (50%)"
              spent={budgetStatus.needs.spent}
              budget={budgetStatus.needs.budget}
              color="#3b82f6"
            />
            <BudgetBar
              label="Wants (30%)"
              spent={budgetStatus.wants.spent}
              budget={budgetStatus.wants.budget}
              color="#8b5cf6"
            />
            <BudgetBar
              label="Savings (20%)"
              spent={budgetStatus.savings.spent}
              budget={budgetStatus.savings.budget}
              color="#059669"
            />
          </Section>

          {/* Top Categories */}
          <Section style={sectionContainer}>
            <Text style={sectionTitle}>Top Spending Categories</Text>
            {topCategories.map((category, index) => (
              <div key={index} style={categoryRow}>
                <Text style={categoryName}>{category.name}</Text>
                <Text style={categoryAmount}>
                  ${category.amount.toFixed(2)} (
                  {category.percentage.toFixed(0)}
                  %)
                </Text>
              </div>
            ))}
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={dashboardUrl}>
              View Full Report
            </Button>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            Want to adjust your email preferences?{" "}
            <Link href={`${dashboardUrl}/settings`} style={footerLink}>
              Update settings
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function BudgetBar({
  label,
  spent,
  budget,
  color,
}: {
  label: string;
  spent: number;
  budget: number;
  color: string;
}) {
  const percentage = Math.min((spent / budget) * 100, 100);
  const isOver = spent > budget;

  return (
    <div style={budgetBarContainer}>
      <div style={budgetBarHeader}>
        <Text style={budgetBarLabel}>{label}</Text>
        <Text style={budgetBarAmount}>
          ${spent.toFixed(0)} / ${budget.toFixed(0)}
        </Text>
      </div>
      <div style={budgetBarTrack}>
        <div
          style={{
            ...budgetBarFill,
            width: `${percentage}%`,
            backgroundColor: isOver ? "#dc2626" : color,
          }}
        />
      </div>
    </div>
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
  padding: "32px 0",
  marginBottom: "64px",
  borderRadius: "8px",
};

const h1 = {
  color: "#1f2937",
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "40px",
  margin: "0 48px 8px",
};

const dateRange = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "0 48px 24px",
};

const greeting = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 48px 8px",
};

const text = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 48px 24px",
};

const statsContainer = {
  margin: "0 48px 32px",
  display: "flex",
  gap: "12px",
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
  fontSize: "20px",
  fontWeight: "700",
  margin: "0",
};

const sectionContainer = {
  margin: "0 48px 32px",
};

const sectionTitle = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 16px",
};

const budgetBarContainer = {
  marginBottom: "16px",
};

const budgetBarHeader = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "4px",
};

const budgetBarLabel = {
  color: "#4b5563",
  fontSize: "14px",
  margin: "0",
};

const budgetBarAmount = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "0",
};

const budgetBarTrack = {
  backgroundColor: "#e5e7eb",
  borderRadius: "4px",
  height: "8px",
  overflow: "hidden",
};

const budgetBarFill = {
  height: "100%",
  borderRadius: "4px",
  transition: "width 0.3s ease",
};

const categoryRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid #f3f4f6",
};

const categoryName = {
  color: "#4b5563",
  fontSize: "14px",
  margin: "0",
};

const categoryAmount = {
  color: "#1f2937",
  fontSize: "14px",
  fontWeight: "600",
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
  margin: "0 48px 16px",
};

const footer = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 48px",
};

const footerLink = {
  color: "#7c3aed",
};

export default WeeklySummaryEmail;
