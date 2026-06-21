import type { Publication } from "../types/publication";

// Helper to strip CMS quotes and fix escaped newlines
function cleanString(str?: string) {
  if (!str) return "";
  return str.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---([\s\S]*?)---([\s\S]*)$/);

  if (!match) {
    throw new Error("Invalid markdown frontmatter");
  }

  const frontmatter = match[1].trim();
  const body = match[2].trim();

  const data: any = {};

  frontmatter.split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (key && rest.length >= 0) {
      data[key.trim()] = rest.join(":").trim();
    }
  });

  return { data, body };
}

export async function loadPublications(): Promise<Publication[]> {
  const files = import.meta.glob("/src/content/publications/*.md", {
    as: "raw",
  });

  const publications: Publication[] = [];

  for (const path in files) {
    const raw = await files[path]();
    const { data, body } = parseFrontmatter(raw);

    publications.push({
      // Apply the cleaner to all text fields
      title: cleanString(data.title),
      authors: cleanString(data.authors),
      venue: cleanString(data.venue),
      year: Number(data.year),
      link: cleanString(data.link) || undefined,
      bibtex: cleanString(data.bibtex) || undefined,
      body,
    });
  }

  return publications.sort((a, b) => b.year - a.year);
}
