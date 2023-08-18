import { ParseError } from "./0_parse_error.ts";
import { parseIdentifier } from "./1_identifier.ts";
import { parseTypeReference, TypeReference } from "./2_type_reference.ts";

export interface Property {
  identifier: string;
  type: TypeReference;
}

export function parseProperty(property: string): Property {
  property = property.trim();
  const slices = property.split(/\s/).map((v) => v.trim()).filter((v) => v);
  if (slices.length != 2) {
    throw new ParseError("Invalid property");
  }
  return {
    identifier: parseIdentifier(slices[0]),
    type: parseTypeReference(slices[1]),
  };
}

export function parsePropertyList(
  propertyList: string,
  delim: string,
  allowEmptySlices: boolean,
): Property[] {
  propertyList = propertyList.trim();
  const slices = propertyList.split(delim).map((v) => v.trim());
  const properties = new Array<Property>();
  for (const slice of slices) {
    if (slice.length == 0) {
      if (!allowEmptySlices) {
        throw new Error("Invalid property list");
      }
      continue;
    }
    properties.push(parseProperty(slice));
  }
  return properties;
}
