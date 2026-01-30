import { describe, it, expect } from "vitest";
import { parseCSV, detectCSVFormat } from "./csv-parser";

describe("CSV Parser", () => {
  describe("detectCSVFormat", () => {
    it("detects Monzo format", () => {
      const headers = ["Date", "Description", "Amount", "Name"];
      const format = detectCSVFormat(headers);
      expect(format).not.toBeNull();
      expect(format?.name).toBe("Monzo");
    });

    it("detects Starling format", () => {
      const headers = ["Date", "Reference", "Amount"];
      const format = detectCSVFormat(headers);
      expect(format).not.toBeNull();
      expect(format?.name).toBe("Starling");
    });

    it("detects Revolut format", () => {
      const headers = ["Started Date", "Description", "Amount"];
      const format = detectCSVFormat(headers);
      expect(format).not.toBeNull();
      expect(format?.name).toBe("Revolut");
    });

    it("detects Barclays format", () => {
      const headers = ["Date", "Memo", "Amount"];
      const format = detectCSVFormat(headers);
      expect(format).not.toBeNull();
      expect(format?.name).toBe("Barclays");
    });

    it("detects NatWest format", () => {
      const headers = ["Date", "Description", "Value"];
      const format = detectCSVFormat(headers);
      expect(format).not.toBeNull();
      expect(format?.name).toBe("NatWest");
    });

    it("detects Lloyds format", () => {
      const headers = [
        "Transaction Date",
        "Transaction Description",
        "Debit Amount",
      ];
      const format = detectCSVFormat(headers);
      expect(format).not.toBeNull();
      expect(format?.name).toBe("Lloyds");
    });

    it("returns null for unrecognized format", () => {
      const headers = ["foo", "bar", "baz"];
      const format = detectCSVFormat(headers);
      expect(format).toBeNull();
    });

    it("is case-insensitive", () => {
      const headers = ["DATE", "DESCRIPTION", "AMOUNT"];
      const format = detectCSVFormat(headers);
      expect(format).not.toBeNull();
    });
  });

  describe("parseCSV", () => {
    it("parses valid Monzo CSV", () => {
      const csv = `Date,Description,Amount,Name
2024-01-15,Grocery Store,-50.00,Tesco
2024-01-16,Salary Deposit,3000.00,Employer`;

      const result = parseCSV(csv);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.errors).toHaveLength(0);

      expect(result.data[0].description).toBe("Grocery Store");
      expect(result.data[0].amount).toBe(-50);
      expect(result.data[0].merchant).toBe("Tesco");

      expect(result.data[1].description).toBe("Salary Deposit");
      expect(result.data[1].amount).toBe(3000);
    });

    it("parses amounts with pound symbol", () => {
      const csv = `Date,Description,Amount
2024-01-15,Purchase,"£-100.50"
2024-01-16,Refund,"£25.00"`;

      const result = parseCSV(csv);

      expect(result.success).toBe(true);
      expect(result.data[0].amount).toBe(-100.5);
      expect(result.data[1].amount).toBe(25);
    });

    it("parses amounts with dollar and euro symbols", () => {
      const csv = `Date,Description,Amount
2024-01-15,USD Purchase,"$-50.00"
2024-01-16,EUR Purchase,"€-75.00"`;

      const result = parseCSV(csv);

      expect(result.success).toBe(true);
      expect(result.data[0].amount).toBe(-50);
      expect(result.data[1].amount).toBe(-75);
    });

    it("parses amounts with commas", () => {
      const csv = `Date,Description,Amount
2024-01-15,Big Purchase,"-1,234.56"`;

      const result = parseCSV(csv);

      expect(result.success).toBe(true);
      expect(result.data[0].amount).toBe(-1234.56);
    });

    it("parses negative amounts in parentheses", () => {
      const csv = `Date,Description,Amount
2024-01-15,Expense,"(99.99)"`;

      const result = parseCSV(csv);

      expect(result.success).toBe(true);
      expect(result.data[0].amount).toBe(-99.99);
    });

    it("handles various date formats", () => {
      const csv = `Date,Description,Amount
2024-01-15,ISO Format,-10
01/15/2024,US Format,-20
01-15-2024,Dash Format,-30`;

      const result = parseCSV(csv);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(3);
    });

    it("skips rows with missing required fields", () => {
      const csv = `Date,Description,Amount
2024-01-15,Valid Row,-50.00
,Missing Date,-25.00
2024-01-17,,-30.00`;

      const result = parseCSV(csv);

      expect(result.data).toHaveLength(1);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("returns error for empty CSV", () => {
      const csv = "";
      const result = parseCSV(csv);

      expect(result.success).toBe(false);
      expect(result.data).toHaveLength(0);
    });

    it("returns error for unrecognized format", () => {
      const csv = `foo,bar,baz
1,2,3`;

      const result = parseCSV(csv);

      expect(result.success).toBe(false);
      expect(result.errors[0]).toContain("Could not detect CSV format");
    });

    it("includes raw data in parsed transactions", () => {
      const csv = `Date,Description,Amount,extra
2024-01-15,Test,-50.00,extra value`;

      const result = parseCSV(csv);

      expect(result.success).toBe(true);
      expect(result.data[0].rawData).toHaveProperty("extra", "extra value");
    });

    it("extracts merchant when available (Monzo format)", () => {
      const csv = `Date,Description,Amount,Name
2024-01-15,Coffee,-5.00,Costa Coffee`;

      const result = parseCSV(csv);

      expect(result.success).toBe(true);
      expect(result.data[0].merchant).toBe("Costa Coffee");
    });

    it("parses Starling format", () => {
      const csv = `Date,Reference,Amount
2024-01-15,Direct Debit - Netflix,-12.99`;

      const result = parseCSV(csv);

      expect(result.success).toBe(true);
      expect(result.data[0].description).toBe("Direct Debit - Netflix");
      expect(result.data[0].amount).toBe(-12.99);
    });

    it("parses Revolut format", () => {
      const csv = `Started Date,Description,Amount
2024-01-15,Transfer to John,-50.00`;

      const result = parseCSV(csv);

      expect(result.success).toBe(true);
      expect(result.data[0].description).toBe("Transfer to John");
      expect(result.data[0].amount).toBe(-50);
    });
  });
});
