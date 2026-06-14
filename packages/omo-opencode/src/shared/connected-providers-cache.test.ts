import { SUPPORTED_PROVIDERS, SUPPORTED_MODELS } from "@oh-my-opencode/model-core";
/// <reference types="bun-types" />

import { describe, expect, test } from "bun:test"

import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

type ConnectedProvidersCacheModule = typeof import("./connected-providers-cache")

async function importFreshConnectedProvidersCacheModule(): Promise<ConnectedProvidersCacheModule> {
  return await import(
    new URL(`./connected-providers-cache.ts?real-connected-providers-cache-test=${Date.now()}-${Math.random()}`, import.meta.url).href
  )
}

function createTestCacheContext(
  createConnectedProvidersCacheStore: ConnectedProvidersCacheModule["createConnectedProvidersCacheStore"],
) {
	const fakeUserCacheRoot = mkdtempSync(join(tmpdir(), "connected-providers-user-cache-"))
	const testCacheDir = join(fakeUserCacheRoot, "oh-my-opencode")
	const testCacheStore = createConnectedProvidersCacheStore(() => testCacheDir)

	return {
		fakeUserCacheRoot,
		testCacheDir,
		testCacheStore,
	}
}

function cleanupTestCacheContext(fakeUserCacheRoot: string): void {
	if (existsSync(fakeUserCacheRoot)) {
		rmSync(fakeUserCacheRoot, { recursive: true, force: true })
	}
}

describe("updateConnectedProvidersCache", () => {
	test("extracts models from provider.list().all response", async () => {
		const { createConnectedProvidersCacheStore } = await importFreshConnectedProvidersCacheModule()
		const { testCacheStore, fakeUserCacheRoot } = createTestCacheContext(createConnectedProvidersCacheStore)

		try {
			//#given
			const mockClient = {
				provider: {
					list: async () => ({
						data: {
							connected: [SUPPORTED_PROVIDERS.OPENAI, SUPPORTED_PROVIDERS.ANTHROPIC],
							all: [
								{
									id: SUPPORTED_PROVIDERS.OPENAI,
									name: "OpenAI",
									env: [],
									models: {
										[SUPPORTED_MODELS.GPT_5_5]: { id: SUPPORTED_MODELS.GPT_5_5, name: "GPT-5.5" },
										[SUPPORTED_MODELS.GPT_5_4]: { id: SUPPORTED_MODELS.GPT_5_4, name: "GPT-5.4" },
									},
								},
								{
									id: SUPPORTED_PROVIDERS.ANTHROPIC,
									name: "Anthropic",
									env: [],
									models: {
										[SUPPORTED_MODELS.CLAUDE_OPUS_4_7]: { id: SUPPORTED_MODELS.CLAUDE_OPUS_4_7, name: "Claude Opus 4.7" },
										[SUPPORTED_MODELS.CLAUDE_SONNET_4_6]: { id: SUPPORTED_MODELS.CLAUDE_SONNET_4_6, name: "Claude Sonnet 4.6" },
									},
								},
							],
						},
					}),
				},
			}

			//#when
			await testCacheStore.updateConnectedProvidersCache(mockClient)

			//#then
			const cache = testCacheStore.readProviderModelsCache()
			expect(cache).not.toBeNull()
			expect(cache!.connected).toEqual([SUPPORTED_PROVIDERS.OPENAI, SUPPORTED_PROVIDERS.ANTHROPIC])
			expect(cache!.models).toEqual({
				openai: [
					{ id: SUPPORTED_MODELS.GPT_5_5, name: "GPT-5.5" },
					{ id: SUPPORTED_MODELS.GPT_5_4, name: "GPT-5.4" },
				],
				anthropic: [
					{ id: SUPPORTED_MODELS.CLAUDE_OPUS_4_7, name: "Claude Opus 4.7" },
					{ id: SUPPORTED_MODELS.CLAUDE_SONNET_4_6, name: "Claude Sonnet 4.6" },
				],
			})
		} finally {
			cleanupTestCacheContext(fakeUserCacheRoot)
		}
	})

	test("writes empty models when provider has no models", async () => {
		const { createConnectedProvidersCacheStore } = await importFreshConnectedProvidersCacheModule()
		const { testCacheStore, fakeUserCacheRoot } = createTestCacheContext(createConnectedProvidersCacheStore)

		try {
			//#given
			const mockClient = {
				provider: {
					list: async () => ({
						data: {
							connected: ["empty-provider"],
							all: [
								{
									id: "empty-provider",
									name: "Empty",
									env: [],
									models: {},
								},
							],
						},
					}),
				},
			}

			//#when
			await testCacheStore.updateConnectedProvidersCache(mockClient)

			//#then
			const cache = testCacheStore.readProviderModelsCache()
			expect(cache).not.toBeNull()
			expect(cache!.models).toEqual({})
		} finally {
			cleanupTestCacheContext(fakeUserCacheRoot)
		}
	})

	test("writes empty models when all field is missing", async () => {
		const { createConnectedProvidersCacheStore } = await importFreshConnectedProvidersCacheModule()
		const { testCacheStore, fakeUserCacheRoot } = createTestCacheContext(createConnectedProvidersCacheStore)

		try {
			//#given
			const mockClient = {
				provider: {
					list: async () => ({
						data: {
							connected: [SUPPORTED_PROVIDERS.OPENAI],
						},
					}),
				},
			}

			//#when
			await testCacheStore.updateConnectedProvidersCache(mockClient)

			//#then
			const cache = testCacheStore.readProviderModelsCache()
			expect(cache).not.toBeNull()
			expect(cache!.models).toEqual({})
		} finally {
			cleanupTestCacheContext(fakeUserCacheRoot)
		}
	})

	test("does nothing when client.provider.list is not available", async () => {
		const { createConnectedProvidersCacheStore } = await importFreshConnectedProvidersCacheModule()
		const { testCacheStore, fakeUserCacheRoot } = createTestCacheContext(createConnectedProvidersCacheStore)

		try {
			//#given
			const mockClient = {}

			//#when
			await testCacheStore.updateConnectedProvidersCache(mockClient)

			//#then
			const cache = testCacheStore.readProviderModelsCache()
			expect(cache).toBeNull()
		} finally {
			cleanupTestCacheContext(fakeUserCacheRoot)
		}
	})

	test("does not remove unrelated files in the cache directory", async () => {
		const { createConnectedProvidersCacheStore } = await importFreshConnectedProvidersCacheModule()
		const { testCacheStore, fakeUserCacheRoot } = createTestCacheContext(createConnectedProvidersCacheStore)

		//#given
		const realCacheDir = join(fakeUserCacheRoot, "oh-my-opencode")
		const sentinelPath = join(realCacheDir, "connected-providers-cache.test-sentinel.json")
		mkdirSync(realCacheDir, { recursive: true })
		writeFileSync(sentinelPath, JSON.stringify({ keep: true }))

		const mockClient = {
			provider: {
				list: async () => ({
					data: {
						connected: [SUPPORTED_PROVIDERS.OPENAI],
						all: [
							{
								id: SUPPORTED_PROVIDERS.OPENAI,
								models: {
									[SUPPORTED_MODELS.GPT_5_4]: { id: SUPPORTED_MODELS.GPT_5_4 },
								},
							},
						],
					},
				}),
			},
		}

		try {
			//#when
			await testCacheStore.updateConnectedProvidersCache(mockClient)

			//#then
			expect(testCacheStore.readConnectedProvidersCache()).toEqual([SUPPORTED_PROVIDERS.OPENAI])
			expect(existsSync(sentinelPath)).toBe(true)
			expect(readFileSync(sentinelPath, "utf-8")).toBe(JSON.stringify({ keep: true }))
		} finally {
			if (existsSync(sentinelPath)) {
				rmSync(sentinelPath, { force: true })
			}
			cleanupTestCacheContext(fakeUserCacheRoot)
		}
	})

	test("findProviderModelMetadata returns rich cached metadata", async () => {
		const {
			createConnectedProvidersCacheStore,
			findProviderModelMetadata,
		} = await importFreshConnectedProvidersCacheModule()
		const { testCacheStore, fakeUserCacheRoot } = createTestCacheContext(createConnectedProvidersCacheStore)

		try {
			//#given
			const mockClient = {
				provider: {
					list: async () => ({
						data: {
							connected: [SUPPORTED_PROVIDERS.OPENAI],
							all: [
								{
									id: SUPPORTED_PROVIDERS.OPENAI,
									models: {
										[SUPPORTED_MODELS.GPT_5_4]: {
											id: SUPPORTED_MODELS.GPT_5_4,
											name: "GPT-5.4",
											temperature: false,
											variants: {
												low: {},
												high: {},
											},
											limit: { output: 128000 },
										},
									},
								},
							],
						},
					}),
				},
			}

			await testCacheStore.updateConnectedProvidersCache(mockClient)
			const cache = testCacheStore.readProviderModelsCache()

			//#when
			const result = findProviderModelMetadata(SUPPORTED_PROVIDERS.OPENAI, SUPPORTED_MODELS.GPT_5_4, cache)

			//#then
			expect(result).toEqual({
				id: SUPPORTED_MODELS.GPT_5_4,
				name: "GPT-5.4",
				temperature: false,
				variants: {
					low: {},
					high: {},
				},
				limit: { output: 128000 },
			})
		} finally {
			cleanupTestCacheContext(fakeUserCacheRoot)
		}
	})

	test("keeps normalized fallback ids when raw metadata id is not a string", async () => {
		const {
			createConnectedProvidersCacheStore,
			findProviderModelMetadata,
		} = await importFreshConnectedProvidersCacheModule()
		const { testCacheStore, fakeUserCacheRoot } = createTestCacheContext(createConnectedProvidersCacheStore)

		try {
			const mockClient = {
				provider: {
					list: async () => ({
						data: {
							connected: [SUPPORTED_PROVIDERS.OPENAI],
							all: [
								{
									id: SUPPORTED_PROVIDERS.OPENAI,
									models: {
										"o3-mini": {
											id: 123,
											name: "o3-mini",
										},
									},
								},
							],
						},
					}),
				},
			}

			await testCacheStore.updateConnectedProvidersCache(mockClient)
			const cache = testCacheStore.readProviderModelsCache()

			expect(cache?.models.openai).toEqual([
				{ id: "o3-mini", name: "o3-mini" },
			])
			expect(findProviderModelMetadata(SUPPORTED_PROVIDERS.OPENAI, "o3-mini", cache)).toEqual({
				id: "o3-mini",
				name: "o3-mini",
			})
		} finally {
			cleanupTestCacheContext(fakeUserCacheRoot)
		}
	})
})
