import { parseIdentifier } from "./1_identifier.ts";
import { parseKeyword } from "./1_keyword.ts";
import { parseTypeReference, TypeReference } from "./2_type_reference.ts";
import { parsePropertyList, Property } from "./3_property.ts";

export interface TypeDeclaration {
  kind: "type";
  identifier: string;
  properties: Property[];
}

export interface ProcDeclaration {
  kind: "proc";
  identifier: string;
  parameters: Property[];
  returnType: null | TypeReference;
}

export class Parser {
  private index = 0;
  private eof = false;

  constructor(private readonly contents: string) {}

  private skipWhitespaces() {
    while (/^\s$/.test(this.contents[this.index])) {
      this.index++;
    }
  }

  readUntil(what: string | RegExp, skipWhitespaces: boolean) {
    if (skipWhitespaces) {
      this.skipWhitespaces();
    }
    let string = "";

    while (true) {
      const nextChar = this.contents[this.index++];
      if (!nextChar) {
        this.eof = true;
        break;
      }
      if (typeof what === "string" && nextChar == what) {
        break;
      } else if (what instanceof RegExp && what.test(nextChar)) {
        break;
      }
      string += nextChar;
    }

    return string;
  }

  readKeyword() {
    return parseKeyword(this.readUntil(/\s/, true));
  }

  readTypeDeclaration(): TypeDeclaration {
    const identifier = this.readUntil("{", true);
    const propertyList = this.readUntil("}", true);

    return {
      kind: "type" as const,
      identifier: parseIdentifier(identifier),
      properties: parsePropertyList(propertyList, "\n", true),
    };
  }

  readProcDeclaration(): ProcDeclaration {
    this.skipWhitespaces();

    const identifier = this.readUntil("(", true);
    const parameters = this.readUntil(")", true).trim();
    const returnType = this.readUntil("\n", false);

    return {
      kind: "proc" as const,
      identifier: parseIdentifier(identifier),
      parameters: parameters.length == 0
        ? []
        : parsePropertyList(parameters, ",", false),
      returnType: returnType.length == 0
        ? null
        : parseTypeReference(returnType),
    };
  }

  readDeclaration() {
    if (this.readKeyword() == "proc") {
      return this.readProcDeclaration();
    } else {
      return this.readTypeDeclaration();
    }
  }

  readDeclarations() {
    const declarations = new Array<TypeDeclaration | ProcDeclaration>();

    while (true) {
      try {
        declarations.push(this.readDeclaration());
      } catch (err) {
        if (this.eof) {
          break;
        } else {
          throw err;
        }
      }
    }

    return declarations;
  }
}
