import { assertThrows } from "../test_deps.ts";
import { parseTypeReference } from "./2_type_reference.ts";

Deno.test("ignores whitespaces", () => {
  parseTypeReference("  string");
  parseTypeReference("\nboolean\n\t\n");
});

Deno.test("throws on invalid type references", () => {
  assertThrows(() => {
    parseTypeReference("[[string]]");
  });
  assertThrows(() => {
    parseTypeReference("[string]?");
  });
  assertThrows(() => {
    parseTypeReference("[string?]");
  });
  assertThrows(() => {
    parseTypeReference("w_");
  });
  assertThrows(() => {
    parseTypeReference("1a");
  });
});

Deno.test("allows valid type references", () => {
  parseTypeReference("string");
  parseTypeReference("string?");
  parseTypeReference("[boolean]");
});
