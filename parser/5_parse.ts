import { Parser } from "./4_parser.ts";

export function parse(declarations: string) {
  return new Parser(declarations).readDeclarations();
}
