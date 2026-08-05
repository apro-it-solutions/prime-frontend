export interface NavItem {
  label: string;
  href: string;
}

/** Primary navigation shown in the floating pill header. */
export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];
