import { describe, expect, test } from "bun:test"
import { getUnsupportedOpenCodeVersionMessage, isSupportedLocalOpenCodeDevVersion } from "./minimum-opencode-version"

describe("minimum OpenCode version", () => {
  test("allows the pinned local development runtime", () => {
    const version = "0.0.0-dev-202605251856"

    expect(isSupportedLocalOpenCodeDevVersion(version)).toBe(true)
    expect(getUnsupportedOpenCodeVersionMessage(version)).toBeNull()
  })

  test("does not allow arbitrary development runtime versions", () => {
    const version = "0.0.0-dev-202605260001"

    expect(isSupportedLocalOpenCodeDevVersion(version)).toBe(false)
    expect(getUnsupportedOpenCodeVersionMessage(version)).toContain("1.4.0+ is required")
  })

  test("still rejects stable versions below the required minimum", () => {
    expect(getUnsupportedOpenCodeVersionMessage("1.3.9")).toContain("1.4.0+ is required")
    expect(getUnsupportedOpenCodeVersionMessage("1.4.0")).toBeNull()
  })
})
