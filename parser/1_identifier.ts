import { ParseError } from "./0_parse_error.ts";

const IDENTIFIER_EXP = /^[a-zA-Z][a-zA-Z0-9]{0,49}$/;

export function parseIdentifier(identifier: string) {
  identifier = identifier.trim();
  if (!IDENTIFIER_EXP.test(identifier)) {
    throw new ParseError("Invalid identifier: " + identifier);
  }
  return identifier;
}
