import { TypeReference } from "./parser/2_type_reference.ts";
import { ProcDeclaration, TypeDeclaration } from "./parser/4_parser.ts";

function unparseTypeReference(typeReference: TypeReference) {
  let u = typeReference.referencedType;
  if (typeReference.nullable) {
    u += "?";
  } else if (typeReference.array) {
    u = "[" + u + "]";
  }
  return u;
}

export function unparse(declarations: (TypeDeclaration | ProcDeclaration)[]) {
  let contents = "";

  for (const d of declarations) {
    contents += `${d.kind} ${d.identifier}`;
    if (d.kind == "type") {
      contents += " {\n";
      for (const p of d.properties) {
        contents += `    ${p.identifier} ${unparseTypeReference(p.type)}\n`;
      }
      contents += "}\n\n";
    } else {
      contents += "(";
      for (const [i, p] of d.parameters.entries()) {
        contents += `${p.identifier} ${unparseTypeReference(p.type)}`;
        if (i + 1 != d.parameters.length) {
          contents += ", ";
        }
      }
      contents += ")";
      if (d.returnType != null) {
        contents += ` ${unparseTypeReference(d.returnType)}`;
      }
      contents += "\n\n";
    }
  }

  if (contents.endsWith("\n\n")) {
    contents = contents.slice(0, -1);
  }

  return contents;
}
