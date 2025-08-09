#!/usr/bin/env node
//npm run create:module posts --api=https://example.com

import fs from "fs";
import path from "path";

const moduleName = process.argv[2];
if (!moduleName) {
  console.error("❌ Please provide a module name.");
  process.exit(1);
}

const ModuleName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
const moduleDir = path.join(process.cwd(), "src", "modules", moduleName);

// Helper to create a file
function createFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

// Files
createFile(
  `${moduleDir}/types.ts`,
  `export interface ${ModuleName} {
  id: string;
  title: string;
  content: string;
}

export type Create${ModuleName}Input = Omit<${ModuleName}, "id">;
export type Update${ModuleName}Input = Partial<Create${ModuleName}Input>;
`
);

createFile(
  `${moduleDir}/schema.ts`,
  `import { z } from "zod";

export const create${ModuleName}Schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const update${ModuleName}Schema = create${ModuleName}Schema.partial();
`
);

createFile(
  `${moduleDir}/service.ts`,
  `import { prisma } from "@/lib/prisma";
import { Create${ModuleName}Input, Update${ModuleName}Input } from "./types";

export async function getAll${ModuleName}s() {
  return prisma.${moduleName}.findMany();

  // --- Example: External API fetch ---
  // const res = await fetch("https://api.example.com/${moduleName}s");
  // if (!res.ok) throw new Error("Failed to fetch");
  // return res.json();
}

export async function get${ModuleName}ById(id: string) {
  return prisma.${moduleName}.findUnique({ where: { id } });

  // --- Example: External API fetch ---
  // const res = await fetch(\`https://api.example.com/${moduleName}s/\${id}\`);
  // if (!res.ok) throw new Error("Failed to fetch");
  // return res.json();
}

export async function create${ModuleName}(data: Create${ModuleName}Input) {
  return prisma.${moduleName}.create({ data });

  // --- Example: POST to external API ---
  // const res = await fetch("https://api.example.com/${moduleName}s", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error("Failed to create");
  // return res.json();
}
`
);

createFile(
  `${moduleDir}/controller.ts`,
  `import { NextRequest, NextResponse } from "next/server";
import * as ${moduleName}Service from "./service";
import { create${ModuleName}Schema } from "./schema";

export async function GET() {
  try {
    const data = await ${moduleName}Service.getAll${ModuleName}s();

    // --- Example: Fetch directly from external API ---
    // const res = await fetch("https://api.example.com/${moduleName}s");
    // if (!res.ok) {
    //   return NextResponse.json({ error: "Failed to fetch" }, { status: res.status });
    // }
    // const data = await res.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = create${ModuleName}Schema.parse(body);

    const created = await ${moduleName}Service.create${ModuleName}(validated);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
`
);

createFile(
  `${moduleDir}/metadata.ts`,
  `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "${ModuleName} Page",
  description: "SEO description for ${ModuleName}",
};
`
);

createFile(
  `${moduleDir}/queries.ts`,
  `import { useQuery } from "@tanstack/react-query";
import { ${ModuleName} } from "./types";

export function use${ModuleName}s() {
  return useQuery<${ModuleName}[]>(["${moduleName}s"], async () => {
    const res = await fetch("/api/${moduleName}");
    return res.json();

    // --- Example: External API fetch ---
    // const res = await fetch("https://api.example.com/${moduleName}s");
    // if (!res.ok) throw new Error("Failed to fetch");
    // return res.json();
  });
}
`
);

createFile(
  `${moduleDir}/mock.json`,
  JSON.stringify(
    [
      { id: "1", title: "Mock ${ModuleName} 1", content: "Lorem ipsum" },
      { id: "2", title: "Mock ${ModuleName} 2", content: "Dolor sit amet" },
    ],
    null,
    2
  )
);

createFile(
  `${moduleDir}/components/List.tsx`,
  `import React from "react";
import { ${ModuleName} } from "../types";

interface Props {
  items: ${ModuleName}[];
}

export function ${ModuleName}List({ items }: Props) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
`
);

createFile(
  `${moduleDir}/components/Detail.tsx`,
  `import React from "react";
import { ${ModuleName} } from "../types";

interface Props {
  item: ${ModuleName};
}

export function ${ModuleName}Detail({ item }: Props) {
  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.content}</p>
    </div>
  );
}
`
);

createFile(
  `${moduleDir}/__tests__/${moduleName}.test.ts`,
  `import { describe, it, expect } from "vitest";

describe("${ModuleName} module", () => {
  it("should work", () => {
    expect(true).toBe(true);
  });
});
`
);

console.log(`✅ Module '${moduleName}' created at src/modules/${moduleName}`);
