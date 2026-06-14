import type { SupportedModel, ModelAttributes } from "./registry";

export type FallbackModelObject = Readonly<ModelAttributes> & {
  readonly model: SupportedModel
  readonly variant?: string
  readonly thinking?: { readonly type: "enabled" | "disabled"; readonly budgetTokens?: number }
}
