# Airidale Player Guides

This public repository is the authoritative source for the player guides published on [www.airidale.net](https://www.airidale.net/guides).

Anyone may propose a factual correction through a pull request. Airidale maintainers verify gameplay information before merging, and merged changes remain pending until staff previews and publishes them on the website.

## Suggest a correction

1. Open the relevant file in [`guides/`](guides/).
2. Select **Edit this file**. GitHub will create a fork when necessary.
3. Make the smallest factual correction needed.
4. Explain how the information was verified in the pull request template.

Read [CONTRIBUTING.md](CONTRIBUTING.md) before adding a new guide or changing frontmatter. Server plugin configurations, secrets, runtime data, player information, and internal staff instructions do not belong in this repository.

## Publication flow

```text
Community pull request -> maintainer merge -> pending website revision -> staff publication
```

The live website reads published revisions from Supabase. It does not fetch GitHub during normal page requests.

## License

Guide content is available under [CC BY-NC-SA 4.0](LICENSE). Code and automation in this repository may be used to contribute to Airidale but are not offered as a standalone software product.
