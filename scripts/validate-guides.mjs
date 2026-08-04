import { readGuides } from "./guide-tools.mjs";

try {
  const guides = readGuides();
  console.log(`Validated ${guides.length} Airidale guides.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
