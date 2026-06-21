// src/types/site.ts
export type SiteSettings = {
  title: string;
  baseUrl?: string;
  yourFirstName: string;
  yourLastName: string;
  navbarTitle?: string;
  allowIndexing?: boolean;
  disallowAdmin?: boolean;
  // Navigation Toggles
  showHome: boolean;
  showPublications: boolean;
  showResearch: boolean;
  showMembers: boolean;
  showJoinUs: boolean;
};
