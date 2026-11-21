#!/usr/bin/env node
// annotate-heading-ids appends `{/* #id */}` to every docs heading that contains
// prose, pinning the anchor derived from the English text before translation.
// Usage: node bin/annotate-heading-ids.mjs [file.mdx ...]  (defaults to all of docs/)
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import slugify from "slugify";
import { unified } from "unified";

// mdxParser parses docs MDX the same way the site does.
const mdxParser = unified().use(remarkParse).use(remarkMdx).use(remarkGfm);

// collectMdxFiles returns every MDX file under a directory.
function collectMdxFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return collectMdxFiles(entryPath);
    }
    return entry.name.endsWith(".mdx") ? [entryPath] : [];
  });
}

// needsExplicitId reports whether a heading has prose and no pinned ID yet.
function needsExplicitId(heading) {
  const hasProse = heading.children.some(
    (child) =>
      child.type !== "inlineCode" &&
      !(child.type === "text" && !child.value.trim()),
  );
  const hasExplicitId = heading.children.some(
    (child) =>
      child.type === "mdxTextExpression" && /^\s*\/\*\s*#/.test(child.value),
  );
  return hasProse && !hasExplicitId;
}

// annotateFile inserts explicit IDs into one file and returns how many it added.
function annotateFile(file) {
  const raw = fs.readFileSync(file, "utf8");
  const { content } = matter(raw);
  const bodyOffset = raw.length - content.length;
  const insertions = [];

  // visit records an insertion point after each heading that needs an ID.
  const visit = (node) => {
    if (node.type === "heading" && node.children?.length > 0) {
      if (needsExplicitId(node)) {
        const text = node.children
          .map((child) => (typeof child.value === "string" ? child.value : ""))
          .join("");
        const id = slugify(text.toLowerCase());
        if (!id || /[\s*]/.test(id)) {
          throw new Error(`${file}: cannot derive an ID from "${text}"`);
        }
        insertions.push([bodyOffset + node.position.end.offset, id]);
      }
    }
    node.children?.forEach(visit);
  };
  visit(mdxParser.parse(content));

  let output = raw;
  for (const [offset, id] of insertions.sort((a, b) => b[0] - a[0])) {
    output = `${output.slice(0, offset)} {/* #${id} */}${output.slice(offset)}`;
  }
  if (insertions.length > 0) {
    fs.writeFileSync(file, output);
  }
  return insertions.length;
}

// files lists the MDX files to annotate: CLI arguments, or all of docs/.
const files = process.argv.length > 2 ? process.argv.slice(2) : collectMdxFiles("docs");
// total counts headings annotated across all files.
const total = files.reduce((sum, file) => sum + annotateFile(file), 0);
console.log(`annotated ${total} headings in ${files.length} files`);
