import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function TextLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className="text-link"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      <ArrowUpRight size={16} aria-hidden="true" />
    </Link>
  );
}
