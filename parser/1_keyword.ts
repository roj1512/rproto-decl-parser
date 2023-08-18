import { ParseError } from "./0_parse_error.ts";

export type Keyword = "type" | "proc";

export function parseKeyword(keyword: string): Keyword {
  if (keyword != "type" && keyword != "proc") {
    throw new ParseError("Invalid keyword");
  }
  return keyword;
}
