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
  OPENCODE_GO: "opencode-go",
  OLLAMA: "ollama",
  OLLAMA_CLOUD: "ollama-cloud",
  AZURE: "azure",
  KIMI_FOR_CODING: "kimi-for-coding",
  BAILIAN_CODING_PLAN: "bailian-coding-plan",
  MOONSHOTAI: "moonshotai",
  MOONSHOTAI_CN: "moonshotai-cn",
  FIRMWARE: "firmware",
  ZAI_CODING_PLAN: "zai-coding-plan",
  VENICE: "venice",
  MINIMAX_CODING_PLAN: "minimax-coding-plan",
  MINIMAX_CN_CODING_PLAN: "minimax-cn-coding-plan",
  AIHUBMIX: "aihubmix",
  UNKNOWN: "unknown",
} as const;

export type Provider = typeof SUPPORTED_PROVIDERS[keyof typeof SUPPORTED_PROVIDERS] | (string & {});

export const SUPPORTED_MODELS = {
  // OpenAI
  GPT_5_5: "gpt-5.5",
  GPT_5_4: "gpt-5.4",
  GPT_5_4_MINI: "gpt-5.4-mini",
  GPT_5_4_MINI_FAST: "gpt-5.4-mini-fast",
  GPT_5_4_NANO: "gpt-5.4-nano",
  GPT_5_NANO: "gpt-5-nano",
  GPT_4O: "gpt-4o",
  GPT_4O_MINI: "gpt-4o-mini",

  // Anthropic
  CLAUDE_OPUS_4_7: "claude-opus-4-7",
  CLAUDE_SONNET_4_6: "claude-sonnet-4-6",
  CLAUDE_SONNET_5_1: "claude-sonnet-5-1",
  CLAUDE_HAIKU_4_5: "claude-haiku-4-5",

  // Google
  GEMINI_3_1_PRO: "gemini-3.1-pro",
  GEMINI_3_FLASH: "gemini-3-flash",

  // Z.ai / OP / Kimi
  GLM_5_1: "glm-5.1",
  GLM_5: "glm-5",
  GLM_4_6V: "glm-4.6v",
  KIMI_K2_6: "kimi-k2.6",
  KIMI_K2_5: "kimi-k2.5",
  KIMI_K2P5: "k2p5",

  // Qwen
  QWEN_3_5_PLUS: "qwen3.5-plus",

  // Minimax
  MINIMAX_M2_7_HIGHSPEED: "minimax-m2.7-highspeed",
  MINIMAX_M3: "minimax-m3",
  MINIMAX_M3_CAP: "MiniMax-M3",
  MINIMAX_M2_7: "minimax-m2.7",

  // Custom
  BIG_PICKLE: "big-pickle",
} as const;

export type SupportedModel = typeof SUPPORTED_MODELS[keyof typeof SUPPORTED_MODELS] | (string & {});
