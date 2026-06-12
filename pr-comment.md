## Decision Criteria
- **Delivery Speed**: How quickly can we finalize the centralization of model strings without breaking downstream consumers?
- **Correctness Risk**: The danger of introducing regressions in model resolution, testing fallbacks, and TOML configuration files.
- **Maintainability**: Ensuring there is a single, ultimate source of truth for providers and models.
- **Reversibility**: Ability to easily rollback changes if the new registry pattern conflicts with `omo-codex` extension architecture or other external requirements.

## Option Comparison
| Option | Speed | Risk | Maintainability | Reversibility | Notes |
| --- | --- | --- | --- | --- | --- |
| **Option A (Current Phase)**: Centralize TS constants but keep TOMLs static. | Fast | Low | Medium | High | Safest immediate step. Tests pass and type-safety is improved, but duplication remains in TOMLs. |
| **Option B**: Use `registry.ts` to generate TOML configurations via a build script. | Medium | Medium | High | Medium | Eliminates duplication. Requires modifying the build/install pipeline. |
| **Option C**: Eliminate TOML entirely and use TypeScript objects as defaults for configurations. | Slow | High | Very High | Low | Most robust architecture, but requires significant refactoring of configuration loaders and risks breaking external `omo-codex` tooling. |

## Status Quo & Current Assessment
**What we know**:
- We have successfully centralized the model and provider constants into `packages/model-core/src/registry.ts`.
- The TypeScript ecosystem (including `agent-model-requirements.ts` and `category-model-requirements.ts`) and all related test suites now consume these constants.
- We performed a strict-typing audit by temporarily removing `(string & {})` from the union types, forcing the TypeScript compiler to flag unregistered strings. This successfully discovered and allowed us to add missing models (like `o3-mini`, `deepseek-v4-pro`) and providers (`openai-compatible`) to the registry.
- To preserve test fidelity (tests explicitly verify fallback logic by passing fake strings like `"nonexistent-model"`) and external extensibility (for `omo-codex` or user config), we reached a consensus to retain the loose `(string & {})` typing in `registry.ts`. This provides IDE auto-complete while keeping the API flexible.
- The test suite is fully passing indicating zero regressions in the current TypeScript refactor scope.
- Hardcoded string values still reside in TOML configuration files.

**What we don't know**:
- We do not know if replacing TOML files entirely (Option C) is architecturally acceptable or if TOML is a hard requirement for the `omo-codex` ecosystem.
- We do not know the exact build implications if we choose to dynamically generate TOML files from `registry.ts` (Option B).

**Our Hypothesis for Now**:
We hypothesize that `registry.ts` should become the absolute single source of truth. The most pragmatic way forward is likely **Option B**, where we write a build script that consumes `registry.ts` to generate or inject model configurations into the TOML files during package build/installation. This avoids ripping out the TOML loaders while still achieving a single source of truth.

## Chosen Option
- **Option A (Current Phase)** is selected for the immediate present. The PR has been marked as **Draft** to allow for architectural review of the TS registry before we commit to Option B or C.

## Execution Handoff
1. Review the current implementation of `registry.ts` and its integration in the TypeScript codebase.
2. Review the loose typing approach `(string & {})` that accommodates our testing framework and API extensibility.
3. Decide whether to proceed with generating TOML configurations from `registry.ts` (Option B) or fully replacing TOML with TS (Option C).
4. Once decided, implement the next phase and move the PR out of Draft state.
