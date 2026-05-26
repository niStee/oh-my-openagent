import { MIN_OPENCODE_VERSION, SUPPORTED_LOCAL_OPENCODE_DEV_VERSIONS } from "./doctor/constants"
import { compareVersions } from "../shared/opencode-version"

export function isSupportedLocalOpenCodeDevVersion(openCodeVersion: string): boolean {
  return SUPPORTED_LOCAL_OPENCODE_DEV_VERSIONS.some((version) => version === openCodeVersion)
}

export function getUnsupportedOpenCodeVersionMessage(openCodeVersion: string | null): string | null {
  if (!openCodeVersion) {
    return null
  }

  if (
    isSupportedLocalOpenCodeDevVersion(openCodeVersion) ||
    compareVersions(openCodeVersion, MIN_OPENCODE_VERSION) >= 0
  ) {
    return null
  }

  return `Detected OpenCode ${openCodeVersion}, but ${MIN_OPENCODE_VERSION}+ is required. Update OpenCode, then rerun the installer.`
}
