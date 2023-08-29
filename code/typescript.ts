import { TypeReference } from "../parser/2_type_reference.ts";
import { Property } from "../parser/3_property.ts";
import { TypeDeclaration } from "../parser/4_parser.ts";

export function typeReferenceToType(ref: TypeReference) {
  let code = ref.referencedType;
  if (ref.nullable) {
    code += " | null";
  } else if (ref.array) {
    code += "[]";
  }
  return code;
}

export function typeDeclarationToInterface(
  declaration: TypeDeclaration,
) {
  let code = `interface ${declaration.identifier} {\n`;
  for (const p of declaration.properties) {
    code += `  ${p.identifier}: ${typeReferenceToType(p.type)};\n`;
  }
  code += "}\n";
  return code;
}

export function procedureParametersToObject(parameters: Property[]) {
  let code = "{ ";
  for (const [i, p] of parameters.entries()) {
    code += p.identifier + ": " + typeReferenceToType(p.type);
    if (i != parameters.length - 1) {
      code += ", ";
    }
  }
  code += " }";
  code = code.replace("{  }", "{}");
  return code;
}

export function procedureReturnTypeToType(returnType: null | TypeReference) {
  if (returnType == null) {
    return "void";
  } else {
    return typeReferenceToType(returnType);
  }
}
