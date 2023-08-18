import { parseProperty } from "./3_property.ts";

Deno.test("ignores whitespaces", () => {
  parseProperty("   id     number");
});
