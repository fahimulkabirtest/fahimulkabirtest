import fm from "front-matter";
import type { SiteSettings } from "../types/site";

export async function loadSiteSettings(): Promise<SiteSettings> {
  const files = import.meta.glob("/src/content/settings/*.md", { as: "raw" });
  const raw = await files["/src/content/settings/site.md"]();
  
  const { attributes } = fm<any>(raw);

  return {
    title: attributes.title,
    baseUrl: attributes.baseUrl,
    yourFirstName: attributes.yourFirstName,
    yourLastName: attributes.yourLastName,
    navbarTitle: attributes.navbarTitle,
    allowIndexing: attributes.allowIndexing ?? true,
    disallowAdmin: attributes.disallowAdmin ?? true,
    // Navigation Toggles with Fallbacks
    showHome: attributes.showHome ?? true,
    showPublications: attributes.showPublications ?? true,
    showResearch: attributes.showResearch ?? true,
    showMembers: attributes.showMembers ?? false,
    showJoinUs: attributes.showJoinUs ?? false,
  };
}
