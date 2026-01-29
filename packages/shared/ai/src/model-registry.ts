import { createOpenAI } from "@ai-sdk/openai";

export type ModelId = "gpt-4o-mini" | "gpt-4o" | "gpt-4-turbo";

interface ModelConfig {
  id: ModelId;
  name: string;
  description: string;
  costPerMillionTokens: {
    input: number;
    output: number;
  };
}

export const modelRegistry: Record<ModelId, ModelConfig> = {
  "gpt-4o-mini": {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    description: "Fast and cost-effective for routine classification",
    costPerMillionTokens: {
      input: 0.15,
      output: 0.6,
    },
  },
  "gpt-4o": {
    id: "gpt-4o",
    name: "GPT-4o",
    description: "High accuracy for complex financial analysis",
    costPerMillionTokens: {
      input: 2.5,
      output: 10,
    },
  },
  "gpt-4-turbo": {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "Extended context for batch processing",
    costPerMillionTokens: {
      input: 10,
      output: 30,
    },
  },
};

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export function getModel(modelId: ModelId = "gpt-4o-mini") {
  return openai(modelId);
}
