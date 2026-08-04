# Contributing to Airidale guides

Thank you for helping keep Airidale's player information accurate.

## Factual changes

- Verify commands, prices, cooldowns, rewards, ranks, and requirements in game or with an Airidale staff member.
- Keep a pull request focused on one subject.
- Do not include plugin configuration, credentials, player data, staff-only procedures, or internal AI instructions.
- Use root-relative links for the Airidale website, such as `/guides/ranks-and-rankups`.
- Do not add raw HTML, MDX, executable content, or images.

## Guide files

Every guide is stored as `guides/<slug>.md`. Existing slugs and filenames are permanent because players and search engines may link to them. To retire a guide, change its frontmatter to `status: archived`; do not delete the file.

The Markdown body must start with exactly one H1 title and contain at least one H2 section. Metadata categories and player commands must already exist in the files under `config/`. If a genuinely public command needs to be added, explain that separately in the pull request.

## Validation

Run these commands with Node.js 22 before opening a pull request:

```text
npm ci
npm test
npm run validate
npm run check:deterministic
```

By submitting a contribution, you agree to license the contributed guide content under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International.
