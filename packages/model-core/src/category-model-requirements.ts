import { SUPPORTED_PROVIDERS } from "./registry"
import type { ModelRequirement } from "./model-requirement-types"

export const CATEGORY_MODEL_REQUIREMENTS: Record<string, ModelRequirement> = {
  "visual-engineering": {
    fallbackChain: [
      {
        providers: [SUPPORTED_PROVIDERS.GOOGLE, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "gemini-3.1-pro",
        variant: "high",
      },
      { providers: ["zai-coding-plan", SUPPORTED_PROVIDERS.OPENCODE, "bailian-coding-plan", SUPPORTED_PROVIDERS.VERCEL], model: "glm-5" },
      {
        providers: [SUPPORTED_PROVIDERS.ANTHROPIC, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "claude-opus-4-7",
        variant: "max",
      },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "glm-5.1" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
    ],
  },
  ultrabrain: {
    fallbackChain: [
      {
        providers: [SUPPORTED_PROVIDERS.OPENAI, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "gpt-5.5",
        variant: "xhigh",
      },
      {
        providers: [SUPPORTED_PROVIDERS.GOOGLE, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "gemini-3.1-pro",
        variant: "high",
      },
      {
        providers: [SUPPORTED_PROVIDERS.ANTHROPIC, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "claude-opus-4-7",
        variant: "max",
      },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "glm-5.1" },
    ],
  },
  deep: {
    fallbackChain: [
      {
        providers: [SUPPORTED_PROVIDERS.OPENAI, SUPPORTED_PROVIDERS.GITHUB_COPILOT, "venice", SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "gpt-5.5",
        variant: "medium",
      },
      {
        providers: [SUPPORTED_PROVIDERS.ANTHROPIC, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "claude-opus-4-7",
        variant: "max",
      },
      {
        providers: [SUPPORTED_PROVIDERS.GOOGLE, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "gemini-3.1-pro",
        variant: "high",
      },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "kimi-k2.6" },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "glm-5.1" },
    ],
  },
  artistry: {
    fallbackChain: [
      {
        providers: [SUPPORTED_PROVIDERS.GOOGLE, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "gemini-3.1-pro",
        variant: "high",
      },
      {
        providers: [SUPPORTED_PROVIDERS.ANTHROPIC, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "claude-opus-4-7",
        variant: "max",
      },
      { providers: [SUPPORTED_PROVIDERS.OPENAI, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL], model: "gpt-5.5" },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "kimi-k2.6" },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "glm-5.1" },
    ],
  },
  quick: {
    fallbackChain: [
      {
        providers: [SUPPORTED_PROVIDERS.OPENAI, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "gpt-5.4-mini",
      },
      {
        providers: [SUPPORTED_PROVIDERS.ANTHROPIC, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.VERCEL],
        model: "claude-haiku-4-5",
      },
      {
        providers: [SUPPORTED_PROVIDERS.GOOGLE, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "gemini-3-flash",
      },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "minimax-m3" },
      { providers: ["minimax-coding-plan", "minimax-cn-coding-plan"], model: "MiniMax-M3" },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "minimax-m2.7" },
      { providers: [SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL], model: "gpt-5-nano" },
    ],
  },
  "unspecified-low": {
    fallbackChain: [
      {
        providers: [SUPPORTED_PROVIDERS.ANTHROPIC, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "claude-sonnet-4-6",
      },
      {
        providers: [SUPPORTED_PROVIDERS.OPENAI, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "gpt-5.5",
        variant: "medium",
      },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "kimi-k2.6" },
      {
        providers: [SUPPORTED_PROVIDERS.GOOGLE, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "gemini-3-flash",
      },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "minimax-m3" },
      { providers: ["minimax-coding-plan", "minimax-cn-coding-plan"], model: "MiniMax-M3" },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "minimax-m2.7" },
    ],
  },
  "unspecified-high": {
    fallbackChain: [
      {
        providers: [SUPPORTED_PROVIDERS.ANTHROPIC, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "claude-opus-4-7",
        variant: "max",
      },
      {
        providers: [SUPPORTED_PROVIDERS.OPENAI, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "gpt-5.5",
        variant: "high",
      },
      { providers: ["zai-coding-plan", SUPPORTED_PROVIDERS.OPENCODE, "bailian-coding-plan", SUPPORTED_PROVIDERS.VERCEL], model: "glm-5" },
      { providers: ["kimi-for-coding"], model: "k2p5" },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "glm-5.1" },
      { providers: [SUPPORTED_PROVIDERS.OPENCODE, "bailian-coding-plan", SUPPORTED_PROVIDERS.VERCEL], model: "kimi-k2.5" },
      {
        providers: [
          SUPPORTED_PROVIDERS.OPENCODE,
          "bailian-coding-plan",
          "moonshotai",
          "moonshotai-cn",
          "firmware",
          "ollama-cloud",
          "aihubmix",
          SUPPORTED_PROVIDERS.VERCEL,
        ],
        model: "kimi-k2.5",
      },
    ],
  },
  writing: {
    fallbackChain: [
      {
        providers: [SUPPORTED_PROVIDERS.GOOGLE, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "gemini-3-flash",
      },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "kimi-k2.6" },
      {
        providers: [SUPPORTED_PROVIDERS.ANTHROPIC, SUPPORTED_PROVIDERS.GITHUB_COPILOT, SUPPORTED_PROVIDERS.OPENCODE, SUPPORTED_PROVIDERS.VERCEL],
        model: "claude-sonnet-4-6",
      },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "minimax-m3" },
      { providers: ["minimax-coding-plan", "minimax-cn-coding-plan"], model: "MiniMax-M3" },
      { providers: ["opencode-go", SUPPORTED_PROVIDERS.VERCEL], model: "minimax-m2.7" },
    ],
  },
};
