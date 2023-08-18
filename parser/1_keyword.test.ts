import { assertThrows } from "../test_deps.ts";
import { parseKeyword } from "./1_keyword.ts";

Deno.test("allows valid keywords", () => {
  parseKeyword("proc");
  parseKeyword("type");
});

Deno.test("throws on invalid keywords", () => {
  assertThrows(() => {
    parseKeyword("");
  });
  assertThrows(() => {
    parseKeyword("aaaa");
  });
  assertThrows(() => {
    parseKeyword("ay ay");
  });
});
