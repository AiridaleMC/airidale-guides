import assert from "node:assert/strict";
import { mkdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import {
  buildRevisionHash,
  decodeUtf8,
  parseGuideSource,
  readGuides,
  sha256,
  validateGuideLinks,
  validateMarkdown,
} from "./guide-tools.mjs";

const configuration = { categories: ["Progression"], approvedCommands: ["/rankup"] };
const valid = `---
schemaVersion: 1
slug: rankup
summary: Learn how to rank up.
category: Progression
tags: [ranks]
featured: true
order: 10
status: active
---

# Rankup

## Use the command

Run \`/rankup\` after earning enough money.
`;

test("guide sources are parsed into public body and deterministic metadata", () => {
  const guide = parseGuideSource(valid, "guides/rankup.md", configuration);
  assert.equal(guide.title, "Rankup");
  assert.match(guide.body, /^## Use the command/);
  assert.equal(buildRevisionHash(guide), buildRevisionHash(guide));
  assert.equal(guide.sourceHash, sha256(valid.replace(/\r\n?/g, "\n")));
});

test("filename and slug must match", () => {
  assert.throws(() => parseGuideSource(valid, "guides/wrong.md", configuration), /filename must match/i);
});

test("raw HTML, MDX, images, unsafe links, and unapproved commands are rejected", () => {
  assert.throws(() => validateMarkdown("<script>alert(1)</script>", "bad.md", []), /HTML/i);
  assert.throws(() => validateMarkdown("export const x = 1", "bad.md", []), /MDX/i);
  assert.throws(() => validateMarkdown("![tracker](https://example.com/a.png)", "bad.md", []), /images/i);
  assert.throws(() => validateMarkdown("[click](javascript:alert(1))", "bad.md", []), /unsafe/i);
  assert.throws(() => validateMarkdown("Run `/op`.", "bad.md", []), /unapproved/i);
});

test("Airidale website links must be root relative", () => {
  assert.throws(() => validateMarkdown("[guide](https://www.airidale.net/guides/test)", "bad.md", []), /root-relative/i);
  assert.doesNotThrow(() => validateMarkdown("[guide](/guides/test)", "good.md", []));
});

test("invalid UTF-8, secret assignments, unsupported metadata, and archived links are rejected", () => {
  assert.throws(() => decodeUtf8(Buffer.from([0xc3, 0x28])), /encoded data|encoding/i);
  assert.throws(() => validateMarkdown("api_key: abcdefghijklmnop", "bad.md", []), /secret/i);
  assert.throws(() => parseGuideSource(valid.replace("status: active", "status: active\nprivate: true"), "guides/rankup.md", configuration), /unsupported frontmatter/i);
  assert.throws(() => validateGuideLinks([
    { slug: "rankup", status: "active", sourcePath: "guides/rankup.md", body: "Read [retired](/guides/retired)." },
    { slug: "retired", status: "archived", sourcePath: "guides/retired.md", body: "## Retired" },
  ]), /archived guide/i);
});

test("guide discovery rejects oversized files and non-regular entries", (context) => {
  const root = path.join(tmpdir(), `airidale-guides-${process.pid}-${Date.now()}`);
  mkdirSync(path.join(root, "config"), { recursive: true });
  mkdirSync(path.join(root, "guides"), { recursive: true });
  writeFileSync(path.join(root, "config", "categories.json"), JSON.stringify({ categories: ["Progression"] }));
  writeFileSync(path.join(root, "config", "player-command-allowlist.json"), JSON.stringify({ approvedCommands: ["/rankup"] }));
  writeFileSync(path.join(root, "guides", "rankup.md"), Buffer.alloc(250_001, 65));
  assert.throws(() => readGuides(root), /exceeds/i);

  writeFileSync(path.join(root, "guides", "rankup.md"), valid);
  mkdirSync(path.join(root, "guides", "nested"));
  assert.throws(() => readGuides(root), /regular Markdown/i);
  rmSync(path.join(root, "guides", "nested"), { recursive: true });

  try {
    symlinkSync(path.join(root, "guides", "rankup.md"), path.join(root, "guides", "linked.md"));
    assert.throws(() => readGuides(root), /regular Markdown|symlink/i);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "EPERM") context.diagnostic("Symlink creation is unavailable on this Windows host; CI covers the same assertion.");
    else throw error;
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
