import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { lstatSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";

export const GUIDE_REPOSITORY = "AiridaleMC/airidale-guides";
export const GUIDE_BRANCH = "main";
export const MAX_GUIDE_BYTES = 250_000;
export const MAX_GUIDES = 100;

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const hashPattern = /^[a-f0-9]{64}$/;
const commitPattern = /^[a-f0-9]{40}$/;
const allowedFrontmatter = new Set([
  "schemaVersion", "slug", "summary", "category", "tags", "featured", "order", "status",
]);
const secretAssignment = /(?:api[_-]?key|client[_-]?secret|private[_-]?key|password|auth[_-]?token)\s*[:=]\s*["']?[A-Za-z0-9_./+=-]{12,}/i;

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function decodeUtf8(bytes) {
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function requiredString(value, label, maxLength) {
  if (typeof value !== "string" || !value.trim() || value.trim().length > maxLength) {
    throw new Error(`${label} must contain between 1 and ${maxLength} characters.`);
  }
  return value.trim();
}

function proseOnly(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "")
    .replace(/`[^`\r\n]*`/g, "");
}

export function validateMarkdown(markdown, sourcePath) {
  if (secretAssignment.test(markdown)) throw new Error(`${sourcePath}: possible secret assignment found.`);

  const prose = proseOnly(markdown);
  if (/<\/?[A-Za-z][^>\r\n]*>/.test(prose)) throw new Error(`${sourcePath}: raw HTML or JSX is not allowed.`);
  if (/^\s*(?:import|export)\s+/m.test(prose) || /\{[^}\r\n]+\}/.test(prose)) {
    throw new Error(`${sourcePath}: MDX expressions are not allowed.`);
  }
  if (/!\[[^\]]*\]\([^)]*\)/.test(prose)) throw new Error(`${sourcePath}: Markdown images are not allowed.`);

  for (const match of prose.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+[^)]*)?\)/g)) {
    const href = match[1];
    if (/^(?:javascript|data|file|vbscript):/i.test(href)) throw new Error(`${sourcePath}: unsafe link protocol.`);
    if (/^https?:\/\/(?:www\.)?airidale\.net(?:\/|$)/i.test(href)) {
      throw new Error(`${sourcePath}: use a root-relative path for Airidale website links.`);
    }
  }
}

export function parseGuideSource(source, sourcePath, configuration) {
  const normalized = source.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n+([\s\S]*?)\s*$/);
  if (!match) throw new Error(`${sourcePath}: missing YAML frontmatter.`);
  const metadata = loadYaml(match[1], { json: true });
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) throw new Error(`${sourcePath}: frontmatter must be an object.`);
  const extraKeys = Object.keys(metadata).filter((key) => !allowedFrontmatter.has(key));
  if (extraKeys.length) throw new Error(`${sourcePath}: unsupported frontmatter: ${extraKeys.join(", ")}`);
  if (metadata.schemaVersion !== 1) throw new Error(`${sourcePath}: schemaVersion must be 1.`);

  const slug = requiredString(metadata.slug, `${sourcePath} slug`, 120);
  if (!slugPattern.test(slug)) throw new Error(`${sourcePath}: invalid slug.`);
  if (sourcePath !== `guides/${slug}.md`) throw new Error(`${sourcePath}: filename must match slug ${slug}.`);
  const summary = requiredString(metadata.summary, `${sourcePath} summary`, 320);
  if (!configuration.categories.includes(metadata.category)) throw new Error(`${sourcePath}: invalid category.`);
  if (!Array.isArray(metadata.tags) || metadata.tags.length > 12 || metadata.tags.some((tag) => typeof tag !== "string" || !tag.trim() || tag.length > 40)) {
    throw new Error(`${sourcePath}: tags must contain at most 12 non-empty strings of 40 characters or fewer.`);
  }
  if (typeof metadata.featured !== "boolean") throw new Error(`${sourcePath}: featured must be a boolean.`);
  if (!Number.isInteger(metadata.order) || metadata.order < 0 || metadata.order > 10_000) throw new Error(`${sourcePath}: order must be an integer from 0 to 10000.`);
  if (metadata.status !== "active" && metadata.status !== "archived") throw new Error(`${sourcePath}: status must be active or archived.`);

  const markdown = match[2].trim();
  const h1Matches = [...markdown.matchAll(/^#\s+(.+)$/gm)];
  if (h1Matches.length !== 1) throw new Error(`${sourcePath}: exactly one H1 title is required.`);
  if (!markdown.startsWith(h1Matches[0][0])) throw new Error(`${sourcePath}: the H1 title must be the first content line.`);
  const title = requiredString(h1Matches[0][1], `${sourcePath} title`, 160);
  const body = markdown.slice(h1Matches[0][0].length).trim();
  if (!/^##\s+/m.test(body)) throw new Error(`${sourcePath}: at least one H2 section is required.`);
  validateMarkdown(body, sourcePath);

  return {
    slug,
    title,
    summary,
    category: metadata.category,
    tags: metadata.tags.map((tag) => tag.trim()),
    featured: metadata.featured,
    order: metadata.order,
    status: metadata.status,
    body,
    sourcePath,
    sourceHash: sha256(normalized),
  };
}

export function buildRevisionHash(guide) {
  return sha256(JSON.stringify({
    schemaVersion: 1,
    slug: guide.slug,
    title: guide.title,
    summary: guide.summary,
    category: guide.category,
    tags: guide.tags,
    featured: guide.featured,
    order: guide.order,
    status: guide.status,
    body: guide.body,
  }));
}

export function validateGuideLinks(guides) {
  const active = new Set(guides.filter((guide) => guide.status === "active").map((guide) => guide.slug));
  for (const guide of guides) {
    const prose = proseOnly(guide.body);
    for (const match of prose.matchAll(/\[[^\]]*\]\(\/guides\/([a-z0-9-]+)(?:[?#][^)]*)?\)/g)) {
      if (!active.has(match[1])) throw new Error(`${guide.sourcePath}: link targets an unknown or archived guide: ${match[1]}.`);
    }
  }
}

export function readConfiguration(root) {
  const categories = JSON.parse(readFileSync(path.join(root, "config", "categories.json"), "utf8")).categories;
  if (!Array.isArray(categories)) throw new Error("Guide configuration is invalid.");
  return { categories };
}

export function readGuides(root = process.cwd()) {
  const guidesDir = path.join(root, "guides");
  const configuration = readConfiguration(root);
  const entries = readdirSync(guidesDir, { withFileTypes: true });
  if (entries.length > MAX_GUIDES) throw new Error(`Guide count exceeds ${MAX_GUIDES}.`);
  const guides = entries.map((entry) => {
    if (!entry.isFile() || entry.isSymbolicLink() || !entry.name.endsWith(".md")) throw new Error(`guides/${entry.name}: only regular Markdown files are allowed.`);
    const filePath = path.join(guidesDir, entry.name);
    const stat = lstatSync(filePath);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`guides/${entry.name}: symlinks are not allowed.`);
    if (stat.size > MAX_GUIDE_BYTES) throw new Error(`guides/${entry.name}: exceeds ${MAX_GUIDE_BYTES} bytes.`);
    const sourcePath = `guides/${entry.name}`;
    return parseGuideSource(decodeUtf8(readFileSync(filePath)), sourcePath, configuration);
  }).sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

  const slugs = new Set();
  for (const guide of guides) {
    if (slugs.has(guide.slug)) throw new Error(`Duplicate guide slug: ${guide.slug}.`);
    slugs.add(guide.slug);
  }
  validateGuideLinks(guides);
  return guides;
}

function resolveCommit(root) {
  const supplied = process.env.GITHUB_SHA;
  if (supplied && commitPattern.test(supplied)) return supplied;
  try {
    const commit = execFileSync("git", ["-C", root, "rev-parse", "HEAD"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    if (commitPattern.test(commit)) return commit;
  } catch {
    // A zero commit is useful only for local validation before the initial commit.
  }
  return "0".repeat(40);
}

export function buildSnapshot(root = process.cwd()) {
  const sourceCommit = resolveCommit(root);
  const guides = readGuides(root).map((guide) => ({ ...guide, revisionHash: buildRevisionHash(guide) }));
  const snapshotHash = sha256(JSON.stringify(guides.map((guide) => [guide.slug, guide.revisionHash])));
  if (!hashPattern.test(snapshotHash)) throw new Error("Snapshot hash is invalid.");
  return {
    schemaVersion: 1,
    repository: GUIDE_REPOSITORY,
    branch: GUIDE_BRANCH,
    sourceCommit,
    snapshotHash,
    guides,
  };
}
