// Entry program for the news-image bounty: writes the finished infographic
// (entry.png, committed beside this file) to the harness output directory.
// Deterministic: it is a byte-for-byte copy, so two runs produce identical files.
// Outside the grader container, set MAKEFUN_OUTPUT_DIR to test it, e.g.
//   MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = new URL("./entry.png", import.meta.url);
const target = join(outputDir, "entry.png");

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);
const sourceBytes = statSync(source).size;
const bytes = statSync(target).size;
if (bytes !== sourceBytes) {
  throw new Error(`entry.png copy mismatch: wrote ${bytes} bytes, source is ${sourceBytes}`);
}
console.log(`entry.png -> ${target} (${bytes} bytes, verified)`);
