import fs from "fs";
import path from "path";

// 🧠 Smart URL Detection Function
function getSiteUrl() {
  // 1. Check if user manually set a custom domain
  if (process.env.SITE_URL) return process.env.SITE_URL;

  // 2. Auto-detect Vercel Production URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  // Fallback for Vercel Preview deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 3. Auto-detect GitHub Pages URL
  if (process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY) {
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
    return `https://${owner}.github.io/${repo}`;
  }

  // 4. Fallback if run locally without variables
  console.warn("⚠️ WARNING: Could not auto-detect URL. Using fallback for robots.txt.");
  return "https://YOUR-URL-HERE.com";
}

const finalUrl = getSiteUrl();

const robots = `
User-agent: *
Allow: /

Sitemap: ${finalUrl}/sitemap.xml
`;

const outputPath = path.join(process.cwd(), "public", "robots.txt");
fs.writeFileSync(outputPath, robots.trim());

console.log(`✅ robots.txt generated successfully for: ${finalUrl}`);
