import { createHmac, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";

const snapshotPath = process.argv[2];
const secret = process.env.GUIDE_SYNC_SECRET;
const endpoint = process.env.GUIDE_SYNC_URL ?? "https://www.airidale.net/api/internal/guide-sync";
if (!snapshotPath) throw new Error("Snapshot path is required.");
if (!secret || secret.length < 32) throw new Error("GUIDE_SYNC_SECRET must contain at least 32 characters.");

const body = readFileSync(snapshotPath, "utf8");
const timestamp = Math.floor(Date.now() / 1000).toString();
const delivery = process.env.GITHUB_RUN_ID
  ? `${process.env.GITHUB_RUN_ID}.${process.env.GITHUB_RUN_ATTEMPT ?? "1"}`
  : randomUUID();
const signature = `sha256=${createHmac("sha256", secret).update(`${timestamp}.${delivery}.${body}`).digest("hex")}`;
const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-airidale-timestamp": timestamp,
    "x-airidale-delivery": delivery,
    "x-airidale-signature": signature,
  },
  body,
});
const responseText = await response.text();
if (!response.ok) throw new Error(`Guide sync failed (${response.status}): ${responseText.slice(0, 1000)}`);
console.log(responseText);
