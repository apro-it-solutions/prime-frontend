import { MapPin, Phone, Mail, CalendarClock, type LucideIcon } from "lucide-react";

interface ContactDetail {
  icon: LucideIcon;
  label: string;
  /** Lines of the value (address wraps across multiple lines). */
  lines: string[];
  /** Optional link (tel:/mailto:) that wraps the value. */
  href?: string;
}

const CONTACT_DETAILS: ContactDetail[] = [
  {
    icon: MapPin,
    label: "Factory",
    lines: ["PrimeNMS Private Limited,", "[Industrial Area], Kerala, India"],
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["+91 XXXXX XXXXX"],
    href: "tel:+910000000000",
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["sales@primenms.com"],
    href: "mailto:sales@primenms.com",
  },
  {
    icon: CalendarClock,
    label: "Hours",
    lines: ["Mon–Sat · 9:00 AM – 6:00 PM"],
  },
];

/** A single contact detail row: green-soft icon badge + label + value. */
function ContactInfoItem({ detail }: { detail: ContactDetail }) {
  const Icon = detail.icon;
  const value = detail.lines.map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));

  return (
    <li className="flex items-start gap-5">
      <span
        aria-hidden="true"
        className="inline-flex size-12 shrink-0 items-center justify-center rounded-[12px] bg-green-soft text-green-primary"
      >
        <Icon className="size-6" />
      </span>
      <div className="pt-1">
        <p className="font-body text-xs font-medium uppercase tracking-[0.5px] text-text-secondary">
          {detail.label}
        </p>
        <div className="mt-1.5 font-body text-base leading-[1.5] text-text-primary">
          {detail.href ? (
            <a
              href={detail.href}
              className="transition-colors hover:text-green-primary"
            >
              {value}
            </a>
          ) : (
            value
          )}
        </div>
      </div>
    </li>
  );
}

/** Left column of the "Get in Touch" section — heading + contact details. */
export function ContactInfo() {
  return (
    <div>
      <p className="font-body text-[13px] font-medium uppercase tracking-[1.5px] text-green-accent">
        Get in Touch
      </p>
      <h2 className="mt-4 font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.56px] text-text-primary sm:text-5xl lg:text-[56px]">
        Talk to our team.
      </h2>
      <p className="mt-5 max-w-[560px] font-body text-lg leading-[1.65] text-text-secondary">
        Tell us about your building requirements and we&apos;ll get back within
        one business day with a quote and next steps.
      </p>

      <ul className="mt-12 flex flex-col gap-[52px]">
        {CONTACT_DETAILS.map((detail) => (
          <ContactInfoItem key={detail.label} detail={detail} />
        ))}
      </ul>
    </div>
  );
}
