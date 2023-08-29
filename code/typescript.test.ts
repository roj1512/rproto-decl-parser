import { assertEquals } from "../test_deps.ts";

import {
  procedureParametersToObject,
  procedureReturnTypeToType,
  typeDeclarationToInterface,
  typeReferenceToType,
} from "./typescript.ts";

const String = {
  referencedType: "string",
  array: false,
  nullable: false,
};

Deno.test("typeReferenceToType", () => {
  assertEquals(typeReferenceToType(String), "string");
  assertEquals(typeReferenceToType({ ...String, array: true }), "string[]");
  assertEquals(
    typeReferenceToType({ ...String, nullable: true }),
    "string | null",
  );
});

Deno.test("typeDeclarationToInterface", () => {
  assertEquals(
    typeDeclarationToInterface({
      kind: "type",
      identifier: "Message",
      properties: [
        {
          identifier: "id",
          type: { referencedType: "number", array: false, nullable: false },
        },
        {
          identifier: "text",
          type: { referencedType: "string", array: false, nullable: true },
        },
        {
          identifier: "attachments",
          type: { referencedType: "Attachment", array: true, nullable: false },
        },
      ],
    }),
    `interface Message {
  id: number;
  text: string | null;
  attachments: Attachment[];
}
`,
  );
});

Deno.test("procedureParametersToObject", () => {
  assertEquals(
    procedureParametersToObject([
      {
        identifier: "randomId",
        type: { referencedType: "number", array: false, nullable: false },
      },
      {
        identifier: "text",
        type: { referencedType: "string", array: false, nullable: true },
      },
      {
        identifier: "attachments",
        type: { referencedType: "Attachment", array: true, nullable: false },
      },
    ]),
    "{ randomId: number, text: string | null, attachments: Attachment[] }",
  );

  assertEquals(procedureParametersToObject([]), "{}");
});

Deno.test("procedureReturnTypeToType", () => {
  assertEquals(procedureReturnTypeToType(null), "void");
  assertEquals(procedureReturnTypeToType(String), "string");
  assertEquals(
    procedureReturnTypeToType({ ...String, array: true }),
    "string[]",
  );
  assertEquals(
    procedureReturnTypeToType({ ...String, nullable: true }),
    "string | null",
  );
});
