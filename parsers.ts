class ParseError extends Error {}

const IDENTIFIER_EXP = /^[a-zA-Z][a-zA-Z0-9]{0,49}$/;

function parseIdentifier(identifier: string): string {
  if (!IDENTIFIER_EXP.test(identifier)) {
    throw new ParseError("Expected identifier");
  }
  return identifier;
}
