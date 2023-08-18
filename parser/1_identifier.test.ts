import { assertThrows } from "../test_deps.ts";
import { parseIdentifier } from "./1_identifier.ts";

Deno.test("ignores whitespaces", () => {
  parseIdentifier(" a ");
  parseIdentifier(" a \n \t");
  parseIdentifier("a ");
  parseIdentifier(" a");
});

Deno.test("throws on invalid identifiers", () => {
  assertThrows(() => {
    parseIdentifier("asdf(");
  });
  assertThrows(() => {
    parseIdentifier("(asd_f");
  });
  assertThrows(() => {
    parseIdentifier("abcdef-u");
  });
  assertThrows(() => {
    parseIdentifier("a".repeat(60)); // too long
  });
});

Deno.test("allows valid identifiers", () => {
  parseIdentifier("yesThis");
  parseIdentifier("ThisShouldalsoworkAlthoughIhateIt");
});
