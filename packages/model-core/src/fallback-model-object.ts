import type { SupportedModel } from "./registry";

export type FallbackModelObject = {
  readonly model: SupportedModel
  readonly variant?: string
  readonly reasoningEffort?: "none" | "minimal" | "low" | "medium" | "high" | "xhigh" | "max"
  readonly temperature?: number
  readonly top_p?: number
  readonly maxTokens?: number
  readonly thinking?: { readonly type: "enabled" | "disabled"; readonly budgetTokens?: number }
}
