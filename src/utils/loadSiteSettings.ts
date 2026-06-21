import fm from "front-matter";
import type { SiteSettings } from "../types/site";

export async function loadSiteSettings(): Promise<SiteSettings> {
  const files = import.meta.glob("/src/content/settings/*.md", { as: "raw" });
  const raw = await files["/src/content/settings/site.md"]();
  
  // Use front-matter to safely parse the data
  const { attributes } = fm<any>(raw);

  return {
    title: attributes.title,
    yourFirstName: attributes.yourFirstName,
    yourLastName: attributes.yourLastName,
    navbarTitle: attributes.navbarTitle,
  };
}
