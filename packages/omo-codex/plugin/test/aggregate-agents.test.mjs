import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";

import { root } from "./aggregate-plugin-fixture.mjs";

test("#given bundled Codex agents #when components/ultrawork/agents directory is scanned #then planner support TOMLs are present and match expected schema keys", async () => {
	const agentsDir = join(root, "components", "ultrawork", "agents");
	const entries = (await readdir(agentsDir, { withFileTypes: true }))
		.filter((entry) => entry.isFile() && entry.name.endsWith(".ts") && entry.name !== "index.ts")
		.map((entry) => entry.name)
		.sort();

	assert.deepEqual(entries, [
		"codex-ultrawork-reviewer.ts",
		"explorer.ts",
		"librarian.ts",
		"metis.ts",
		"momus.ts",
		"plan.ts",
	]);

	for (const fileName of entries) {
		const content = await readFile(join(agentsDir, fileName), "utf8");
		assert.match(content, /name:\s*".+"/);
		assert.match(content, /description:\s*".+"/);
		assert.match(content, /nickname_candidates:\s*\[.+\]/);
		assert.match(content, /model:\s*.+/);
		assert.match(content, /model_reasoning_effort:\s*.+/);
		assert.match(content, /developer_instructions:\s*`/);
	}
});

test("#given planner agent prompt #when inspected #then generated artifacts stay under .omo", async () => {
	const prompt = await readFile(join(root, "components", "ultrawork", "agents", "plan.ts"), "utf8");

	assert.match(prompt, /\.omo\/plans\/<slug>\.md/);
	assert.match(prompt, /\.omo\/evidence\/task-<N>-<slug>\.<ext>/);
	assert.doesNotMatch(prompt, /(?<!\.omo\/)plans\/<slug>\.md/);
	assert.doesNotMatch(prompt, /(?<!\.omo\/)evidence\/task-/);
});

test("#given reviewer agent prompt #when inspected #then default model uses bounded reasoning", async () => {
	const prompt = await readFile(
		join(root, "components", "ultrawork", "agents", "codex-ultrawork-reviewer.ts"),
		"utf8",
	);

	assert.match(prompt, /model:\s*SUPPORTED_MODELS\.GPT_5_5/);
	assert.match(prompt, /model_reasoning_effort:\s*"high"/);
	assert.doesNotMatch(prompt, /model_reasoning_effort:\s*"xhigh"/);
	assert.doesNotMatch(prompt, /model:\s*SUPPORTED_MODELS\.GPT_5_2/);
	assert.match(prompt, /ChatGPT account/);
});
