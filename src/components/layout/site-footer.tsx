import Link from "next/link";
import { Container } from "./container";
import { Logo } from "./logo";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Contact",
    links: [
      { label: "+91 95628 37777", href: "tel:+919562837777" },
      { label: "info@primenms.com", href: "mailto:info@primenms.com" },
    ],
  },
  {
    title: "Location",
    links: [
      { label: "Prime NMS Private Limited", href: "/contact" },
      // Non-breaking spaces hold the parts of the address that are meaningless
      // apart — a highway number away from its highway, a PIN away from its
      // state — on one line when the column is too narrow for the whole line.
      { label: "1/33/1/A/1, Aspeen South Gate, NH 66", href: "/contact" },
      { label: "Hejamady, Udupi", href: "/contact" },
      { label: "Karnataka 57410, India", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Warehouses", href: "/services" },
      { label: "Industrial", href: "/services" },
      { label: "Commercial", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Careers", href: "/careers" },
      { label: "News", href: "/blog" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-text-primary text-white">
      <Container className="py-16 lg:py-[70px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-8">
          {/* Brand column */}
          <div className="flex w-full max-w-[247px] flex-col gap-7">
            <Logo className="!items-start" />
            <p className="text-base leading-[1.5] text-white/70">
              Engineering India&apos;s future in steel.
            </p>
            <p className="text-base leading-[1.5] text-white/60">
              LinkedIn · Instagram · Download Brochure
            </p>
          </div>

          {/* Link columns */}
          {/* Four even columns, except that Location is sized to its own
              content from lg up: the street line is the longest thing in the
              footer, and an even quarter is ~44px short of it, which is what
              was folding "NH 66" onto a line of its own. The three remaining
              columns still share what is left evenly, so the block keeps its
              width and its right edge. */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:flex-1 lg:grid-cols-[1fr_auto_1fr_1fr] lg:gap-x-16">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3.5">
                <p className="text-base uppercase leading-[1.5] text-green-accent-light">
                  {col.title}
                </p>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-base leading-[1.5] text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <hr className="mt-14 border-white/15" />

        <div className="mt-6 flex flex-col gap-2 text-base leading-[1.5] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Prime NMS Private Limited. All rights reserved.</p>
          <p>
            Crafted by{" "}
            <a
              href="https://aproitsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-white"
            >
              Apro IT Solutions
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
