import { writeFileSync } from "node:fs";
import { buildSnapshot } from "./guide-tools.mjs";

function stable(snapshot) {
  return `${JSON.stringify(snapshot)}\n`;
}

try {
  const snapshot = buildSnapshot();
  if (process.argv.includes("--check-deterministic")) {
    const second = stable(buildSnapshot());
    if (stable(snapshot) !== second) throw new Error("Snapshot generation is not deterministic.");
    console.log(`Snapshot ${snapshot.snapshotHash.slice(0, 12)} is deterministic.`);
  } else {
    const outputIndex = process.argv.indexOf("--output");
    if (outputIndex >= 0) {
      const output = process.argv[outputIndex + 1];
      if (!output) throw new Error("--output requires a file path.");
      writeFileSync(output, stable(snapshot), "utf8");
      console.log(`Wrote ${snapshot.guides.length} guides to ${output}.`);
    } else {
      process.stdout.write(stable(snapshot));
    }
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
