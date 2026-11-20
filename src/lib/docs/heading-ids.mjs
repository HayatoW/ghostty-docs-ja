import slugify from "slugify";

// EXPLICIT_HEADING_ID_PATTERN matches an MDX comment such as `{/* #my-id */}`
// placed in a heading to pin its anchor ID independently of the heading text.
const EXPLICIT_HEADING_ID_PATTERN = /^\s*\/\*\s*#([^\s*]+)\s*\*\/\s*$/;

// headingText returns the plain text of a heading node from its literal children.
// MDX expressions (including explicit ID comments) are not part of the text.
export function headingText(headingNode) {
  if (!Array.isArray(headingNode.children)) {
    return "";
  }
  return headingNode.children
    .filter((child) => child.type !== "mdxTextExpression")
    .map((child) => (typeof child.value === "string" ? child.value : ""))
    .join("")
    .trim();
}

// explicitHeadingId returns the ID pinned with `{/* #my-id */}` in a heading, if any.
// Translated headings use this to keep the anchors of the original English text.
export function explicitHeadingId(headingNode) {
  if (!Array.isArray(headingNode.children)) {
    return undefined;
  }
  for (const child of headingNode.children) {
    if (child.type !== "mdxTextExpression" || typeof child.value !== "string") {
      continue;
    }
    const match = EXPLICIT_HEADING_ID_PATTERN.exec(child.value);
    if (match) {
      return match[1];
    }
  }
  return undefined;
}

// createHeadingIdResolver returns a function that maps heading text to a page-unique ID.
// Repeated headings get a numeric suffix, e.g. "foo", "foo-2", "foo-3".
// An explicit ID, when given, replaces the ID derived from the text.
// This must be shared by everything that links to headings (rendered
// pages, the sidecar, and the search index) so anchors stay in sync.
export function createHeadingIdResolver() {
  const encounteredIDs = new Map();

  return (text, explicitId) => {
    const baseId = explicitId ?? slugify(text.toLowerCase());
    const index = (encounteredIDs.get(baseId) || 0) + 1;
    encounteredIDs.set(baseId, index);
    return {
      id: index >= 2 ? `${baseId}-${index}` : baseId,
      index,
    };
  };
}
