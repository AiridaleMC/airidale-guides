---
schemaVersion: 1
slug: interactive-chat
summary: Share items and inventories, mention players, and use Airidale's interactive chat tags.
category: Events & Community
tags:
  - chat
  - items
  - mentions
  - privacy
featured: false
order: 120
status: active
---

# Interactive Chat

## Sharing Items and Inventories

Airidale's chat tags let other players inspect an item or inventory without trading anything.

| Type in chat | What it shares |
|---|---|
| `[item]` or `[i]` | The item in your main hand |
| `[inv]` or `[inventory]` | Your inventory |
| `[ender]` or `[e]` | Your Ender Chest |

Shared previews remain available in chat for five minutes. `[enderchest]` is not an available alias.

## Sharing Player Information

The following information tags have a 30-second cooldown:

| Type in chat | Information shown |
|---|---|
| `[scrap]` or `[s]` | Your Scrap balance |
| `[balance]` or `[bal]` | Your money balance |
| `[coinflipstats]` or `[cfstats]` | Coinflip profit, games played, and win percentage |
| `[mcmmopower]` or `[mcpower]` | Your mcMMO Power Level |
| `[country]` or `[region]` | Your geolocated country |
| `[internet]` or `[isp]` | Your geolocated internet provider |
| `[ip]` | A randomly generated fake `10.x.x.x` address |
| `[junkered]` or `[junker]` | Your Junker totals, favorite material, milestone, and weekly rank |
| `[experience]` or `[exp]` | Your total experience |
| `[tps]` | Current server-performance information |

The `[ip]` tag is only a joke—it never displays your real IP address.

Country and internet-provider tags share geolocation-derived information when you deliberately type them. Avoid using those tags if you do not want that information shown in chat.

## Mentions and Clickable Text

- Type `@PlayerName` to mention a player.
- Mentions play a sound and show a short notification.
- You must wait 15 seconds before mentioning the same player again.
- `@here` and `@everyone` are disabled.
- Text written as `[/command]` becomes a clickable command suggestion.
- Hovering over a recognized player name shows their gang, mcMMO Power Level, and playtime.
