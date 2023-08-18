import { parseIdentifier } from "./1_identifier.ts";

export interface TypeReference {
  referencedType: string;
  array: boolean;
  nullable: boolean;
}

export function parseTypeReference(typeReference: string): TypeReference {
  typeReference = typeReference.trim();
  let array = false, nullable = false;
  if (typeReference.endsWith("]") && typeReference.startsWith("[")) {
    array = true;
    typeReference = typeReference.slice(1, -1);
  }
  if (!array) {
    if (typeReference.endsWith("?")) {
      nullable = true;
      typeReference = typeReference.slice(0, -1);
    }
  }
  typeReference = parseIdentifier(typeReference);
  return { referencedType: typeReference, array, nullable };
}
