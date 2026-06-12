/**
 * Centralized registry for supported providers and model strings.
 * Use these constants instead of magic string literals to prevent typos
 * and facilitate future model deprecations.
 */

export const SUPPORTED_PROVIDERS = {
  OPENAI: "openai",
  ANTHROPIC: "anthropic",
  GOOGLE: "google",
  GITHUB_COPILOT: "github-copilot",
  LITELLM: "litellm",
  OPENROUTER: "openrouter",
  VERCEL: "vercel",
  OPENCODE: "opencode",
  OLLAMA: "ollama",
  AZURE: "azure",
  UNKNOWN: "unknown",
} as const;

export type Provider = typeof SUPPORTED_PROVIDERS[keyof typeof SUPPORTED_PROVIDERS] | (string & {});

export const SUPPORTED_MODELS = {
  // OpenAI
  GPT_5_5: "openai/gpt-5.5",
  GPT_5_4: "openai/gpt-5.4",
  GPT_5_4_MINI: "openai/gpt-5.4-mini",
  GPT_4O: "openai/gpt-4o",
  GPT_4O_MINI: "openai/gpt-4o-mini",

  // Anthropic
  CLAUDE_OPUS_4_7: "anthropic/claude-opus-4-7",
  CLAUDE_SONNET_4_6: "anthropic/claude-sonnet-4-6",
  CLAUDE_SONNET_5_1: "anthropic/claude-sonnet-5-1",
  CLAUDE_HAIKU_4_5: "anthropic/claude-haiku-4-5",

  // Google
  GEMINI_3_1_PRO: "google/gemini-3.1-pro",
  GEMINI_3_FLASH: "google/gemini-3-flash",

  // Z.ai / OP
  GLM_5_1: "opencode-go/glm-5.1",
} as const;

export type SupportedModel = typeof SUPPORTED_MODELS[keyof typeof SUPPORTED_MODELS] | (string & {});
