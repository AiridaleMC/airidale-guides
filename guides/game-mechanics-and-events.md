---
schemaVersion: 1
slug: game-mechanics-and-events
summary: Cells, currencies, mcMMO, contests, voting, airdrops, totems, and other core server mechanics.
category: Economy & Systems
tags:
  - mechanics
  - events
  - cells
  - mcmmo
  - voting
featured: true
order: 90
status: active
---

# Game Mechanics and Events

## Prestige Commissary

The prestige commissary requires P1 or higher. Each prestige level gives you one minute of access per day, from one minute at P1 to 10 minutes at P10.

This timed area is separate from the Smuggler's Den passes sold for 333, 666, or 999 Scrap.

## Ward Cells and Auction Houses

Ward cells are rented for seven days. If a cell expires, is released, or is taken during a ward change, items stored in its containers are moved to that ward's physical Auction House.

Auction House items are placed into chests where other players can purchase them. Empty your cell before ranking into a new ward if you do not want your stored items sent there.

| Ward cell | Rank required | Seven-day rent | Interior size |
|---|---|---:|---|
| E Ward | E3 | $5,000 | `5 × 5 × 4` |
| D Ward | D4 | $10,000 | `6 × 5 × 4` |
| C Ward | C4 | $20,000 | `6 × 6 × 4` |
| B Ward | B4 | $35,000 | `7 × 6 × 4` |
| A Ward | A4 | $50,000 | `7 × 7 × 4` |

## Donor Cells

Donor cells begin at Knight rank. They are separate from prison wards and are not lost when you rank up or prestige.

| Donor rank | Rank price | Seven-day cell rent | Interior size |
|---|---:|---:|---|
| Knight | $50 | $60,000 | `5 × 5 × 5` |
| Elder | $100 | $80,000 | `7 × 7 × 5` |
| Hero | $150 | $100,000 | `9 × 9 × 5` |
| Legend | $200 | $120,000 | `11 × 11 × 5` |

Visit `/warp donate` to preview donor ranks, mines, tools, and other current donor benefits before making a purchase.

## Smuggler's Den Passes

Smuggler's Den passes let you bulk-sell selected mined materials for twice the normal server-shop price. The brokers are at the bottom of the well in the E Ward animal area.

| Broker | Pass cost | Materials accepted |
|---|---:|---|
| Hector | 333 Scrap | Gold, Iron, and Copper |
| Shane | 666 Scrap | Diamond, Gold, and Copper |
| Mia | 999 Scrap | Emerald, Gold, and Iron |

## mcMMO Progression

mcMMO adds long-term skill levels and abilities to activities such as mining and fishing. Higher levels require increasingly more experience; for example, Mining levels 1–630 require roughly as much total experience as levels 630–791.

### Super Breaker

Super Breaker is an active Mining ability unlocked at Mining level 100.

- Activate it by right-clicking, or by shift-right-clicking when using a Totem.
- Its base cooldown is four minutes.
- Its duration gains one second for every 50 Mining levels, up to the level-1,000 cap.
- While active, it adds five enchantment levels to your pickaxe.
- Triple drops are enabled during the ability.

### Double Drops

Double Drops is a passive Mining ability unlocked at level 250. It can cause a mined block to drop twice.

- It works with Silk Touch.
- The chance increases with Mining level and reaches 100% at level 1,000.
- Airidale custom pickaxes can process blocks differently, so do not assume every custom-tool effect will multiply a Double Drop in the same way.

## Risky Disenchanting

Risky disenchanting always destroys the item. In exchange, each enchantment has a chance to return as a Soulbound Book that can be applied to compatible equipment for an experience cost.

Better materials have better recovery chances, but the item itself is never returned. Use safe disenchanting if you are not prepared to lose it.

## Scrap and Souls

Scrap comes mainly from mining, but it can also be earned through crates, fishing, mobs, and woodcutting. It is used for Totems, Souls, quest-reset vouchers, Smuggler's Den passes, gang boss keys, and other server systems.

Souls are physical items used for enchanting. They can come from mining, woodcutting, mobs, animals, fishing, and crates. You can also trade for them or buy them from the Lunch Lady for 100 Scrap each.

## Totems and Death Risk

Totems provide effects while held, but they can be lost like ordinary items if you die while carrying them.

| Totem | Effect |
|---|---|
| Speed | Speed II while held |
| Vitality | Two extra hearts while held |
| Fishing | Doubled Fishing Scrap, Souls, and Keys while held |
| Haste | Haste II for five minutes with a 30-minute base cooldown |

Activate a Haste Totem by placing it in your offhand and right-clicking. Prestige levels reduce its cooldown.

## Voting and VoteParty

Use `/vote` in game or visit the [Airidale vote page](/vote) to access the five voting sites. Each site normally has a 24-hour delay and awards one virtual Vote Crate Key.

Use `/votetop` to see the voting leaderboard.

VoteParty activates when the online counter reaches 500 votes:

- Every player currently online receives one virtual Rare Crate Key.
- Eligible contributors who are offline can receive the offline reward when they return.
- At least one vote is required to qualify as a contributor.
- A vote cast while offline does not increase the live VoteParty counter.

Monthly voting recognition is enabled, but the current automatic setup does not list a store-credit prize. Do not rely on older prize advertisements unless staff announces a current promotion.

## Armor Trim Sources

| Activity crate | Possible armor trims |
|---|---|
| Fishing | Dune, Coast, Tide, and Rib |
| Mining | Shaper, Wayfinder, Wild, Flow, and Silence |
| Mob | Ward, Bolt, Eye, and Sentry |
| Woodcutting | Host, Vex, Spire, Snout, and Raiser |

## Rank Prices After Prestige

Base prices are listed in the [Ranks and Rankup Costs guide](/guides/ranks-and-rankups). Prices rise after prestige, but available sources disagree about the exact multiplier.

Use the amount displayed by the live Warden interface rather than calculating from an older price chart.

## Discord Support

Use `/discord` to join the Airidale community and open a support ticket for in-game or store help.

## Automatic Contests

Airidale rotates between individual Mining, individual Fishing, cooperative Mining, and cooperative Fishing contests.

- A new contest is scheduled every three hours.
- Each contest lasts 30 minutes.
- Use `/contest time` to check the current timing.
- Contest announcements can be controlled through your personal settings.

### Individual Mining

Individual Mining is based on finding lucky blocks rather than total blocks mined.

- Below 30 players online, an eligible block has a 0.01% lucky-block chance.
- At 30 or more players, the chance is 0.005%.
- The first three different players to find a lucky block place in the event.
- Explosive Pickaxes can contribute at most one contest point per swing.
- Player-placed Creative blocks and Calcite do not count.

### Individual Fishing

Individual Fishing is based on treasure rarity:

- Below 30 players online, Epic, Legendary, and Mythic treasures qualify.
- At 30 or more players, only Legendary and Mythic treasures qualify.
- The first three different players to catch a qualifying treasure place.

### Cooperative Mining

- The shared goal is 1,500 blocks per online player, with a minimum goal of 1,500.
- You must contribute at least 750 blocks to earn the participation reward.
- Explosive Pickaxes count at most one block per swing toward the contest.

### Cooperative Fishing

- The shared goal is 25 catches per online player, with a minimum goal of 25.
- You must contribute at least 12 catches to earn the participation reward.
- Fish, treasure, junk, and other catches all count.

### Contest Rewards

| Result | Virtual key reward |
|---|---|
| 1st place | 1 Epic Crate Key |
| 2nd place | 1 Rare Crate Key |
| 3rd place | 2 Uncommon Crate Keys |
| Participation | 1 Uncommon Crate Key |

If an individual contest does not find three winners before time expires, its participation fallback is used.

## Weekly Gang Competition

The gang leaderboard resets every Sunday at 9:00 PM Eastern Time. Gang members build progress through mcMMO activity, and each eligible member of a top-three gang can claim a reward.

See [Gangs and Bosses](/guides/gangs-and-bosses) for the exact rewards, shared-storage warning, and gang boss fights.

## Airdrops at The Pit

Airdrops, also called Envoys, take place in The Pit. Use `/warp pit` to get there.

- Automatic Airdrops are scheduled every two hours.
- An event lasts five minutes and spawns between 7 and 11 crates.
- At least 15 players must be online for an automatic event.
- A newly spawned crate has a 15-second claim grace period.
- After claiming a crate, you must wait eight seconds before claiming another.
- An Airdrop Flare requires at least 10 players online and can only be activated in The Pit.

The Pit is a PvP area. Other players can fight you for the crates, so carry only what you are prepared to risk.

### Airdrop Tiers

| Tier | Spawn chance | Possible rewards |
|---|---:|---|
| Basic | 75% | Basic ore kit, physical Uncommon Crate Key, or Elder kit with a Prison Guard encounter |
| Intermediate | 20% | Intermediate ore kit, physical Rare Crate Key, or Hero kit with a Prison Guard encounter |
| Advanced | 5% | Advanced ore kit, 2 physical Rare Crate Keys, or Legend kit with a Prison Guard encounter |
