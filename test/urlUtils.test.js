import assert from "node:assert/strict";
import test from "node:test";
import { extractDomains, sanitizeUrls, unsanitizeUrls } from "../src/urlUtils.js";

test("sanitizes URLs and bare domains", () => {
  assert.deepEqual(sanitizeUrls(["https://example.com/path", "example.org"]), [
    "hXXps://example[.]com/path",
    "hXXp://example[.]org",
  ]);
});

test("unsanitizes standard and defanged separators", () => {
  assert.deepEqual(
    unsanitizeUrls([
      "hXXp://example[.]com",
      "hXXps[://]example[.]org/path",
    ]),
    ["http://example.com", "https://example.org/path"],
  );
});

test("extracts and deduplicates domains", () => {
  assert.deepEqual(
    extractDomains([
      "https://www.example.com/path",
      "hXXp://example[.]com/other",
      "sample.org",
    ]),
    ["example.com", "sample.org"],
  );
});
