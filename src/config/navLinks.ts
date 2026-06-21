export type NavItem = {
  label: string;
  path?: string;
  external?: boolean;
  children?: NavItem[];
  settingKey?: string; // Maps to the CMS toggle name
};

export const NAVIGATION: NavItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Publications",
    path: "/publications",
    settingKey: "showPublications",
  },
  {
    label: "Research",
    path: "/research",
    settingKey: "showResearch",
  },
  {
    label: "Members",
    path: "/members",
    settingKey: "showMembers",
  },
  {
    label: "Join Us",
    path: "/join",
    settingKey: "showJoinUs",
  }
];
