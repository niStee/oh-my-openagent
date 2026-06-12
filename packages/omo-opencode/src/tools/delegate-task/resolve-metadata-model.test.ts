import { SUPPORTED_PROVIDERS, SUPPORTED_MODELS } from "@oh-my-opencode/model-core";
const { describe, test, expect } = require("bun:test")

import { resolveMetadataModel } from "./resolve-metadata-model"

const PRIMARY = { providerID: SUPPORTED_PROVIDERS.OPENAI, modelID: SUPPORTED_MODELS.GPT_5_4 }
const FALLBACK = { providerID: SUPPORTED_PROVIDERS.ANTHROPIC, modelID: SUPPORTED_MODELS.CLAUDE_SONNET_4_6 }

describe("resolveMetadataModel", () => {
  describe("#given primary and fallback are both present", () => {
    test("#when resolving #then returns primary", () => {
      const result = resolveMetadataModel(PRIMARY, FALLBACK)

      expect(result).toEqual(PRIMARY)
    })
  })

  describe("#given only fallback is present", () => {
    test("#when resolving #then returns fallback", () => {
      const result = resolveMetadataModel(undefined, FALLBACK)

      expect(result).toEqual(FALLBACK)
    })
  })

  describe("#given only primary is present", () => {
    test("#when resolving #then returns primary", () => {
      const result = resolveMetadataModel(PRIMARY, undefined)

      expect(result).toEqual(PRIMARY)
    })
  })

  describe("#given both are undefined", () => {
    test("#when resolving #then returns undefined", () => {
      const result = resolveMetadataModel(undefined, undefined)

      expect(result).toBeUndefined()
    })
  })

  describe("#given primary has extra fields", () => {
    test("#when resolving #then preserves variant and strips unrelated fields", () => {
      const extended = { providerID: SUPPORTED_PROVIDERS.OPENAI, modelID: SUPPORTED_MODELS.GPT_5_4, variant: "high", temperature: 0.7 } as const

      const result = resolveMetadataModel(extended, undefined)

      expect(result).toEqual({ providerID: SUPPORTED_PROVIDERS.OPENAI, modelID: SUPPORTED_MODELS.GPT_5_4, variant: "high" })
    })
  })

  describe("#given primary has variant", () => {
    test("#when resolving metadata model #then variant is preserved", () => {
      const primary = { providerID: SUPPORTED_PROVIDERS.GOOGLE, modelID: SUPPORTED_MODELS.GEMINI_3_1_PRO, variant: "high" }

      const result = resolveMetadataModel(primary, undefined)

      expect(result).toEqual({ providerID: SUPPORTED_PROVIDERS.GOOGLE, modelID: SUPPORTED_MODELS.GEMINI_3_1_PRO, variant: "high" })
    })
  })

  describe("#given primary lacks variant but fallback has variant", () => {
    test("#when primary provided #then fallback variant is not used", () => {
      const primary = { providerID: SUPPORTED_PROVIDERS.GOOGLE, modelID: SUPPORTED_MODELS.GEMINI_3_1_PRO }
      const fallback = { providerID: SUPPORTED_PROVIDERS.ANTHROPIC, modelID: "claude", variant: "max" }

      const result = resolveMetadataModel(primary, fallback)

      expect(result).toEqual({ providerID: SUPPORTED_PROVIDERS.GOOGLE, modelID: SUPPORTED_MODELS.GEMINI_3_1_PRO })
      expect(result?.variant).toBeUndefined()
    })
  })

  describe("#given primary is undefined and fallback has variant", () => {
    test("#when resolving metadata model #then fallback variant is preserved", () => {
      const fallback = { providerID: SUPPORTED_PROVIDERS.ANTHROPIC, modelID: "claude", variant: "max" }

      const result = resolveMetadataModel(undefined, fallback)

      expect(result).toEqual({ providerID: SUPPORTED_PROVIDERS.ANTHROPIC, modelID: "claude", variant: "max" })
    })
  })

  describe("#given both lack variant", () => {
    test("#when resolving metadata model #then variant is not on result", () => {
      const primary = { providerID: SUPPORTED_PROVIDERS.OPENAI, modelID: SUPPORTED_MODELS.GPT_5_4 }

      const result = resolveMetadataModel(primary, undefined)

      expect(result).toEqual({ providerID: SUPPORTED_PROVIDERS.OPENAI, modelID: SUPPORTED_MODELS.GPT_5_4 })
      expect(result?.variant).toBeUndefined()
    })
  })
})
