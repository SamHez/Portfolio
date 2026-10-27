import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function TextLink({
  href,
  children,
  external = false,
  arrow = true,
  target,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  arrow?: boolean;
  target?: "_top";
}) {
  return (
    <Link
      prefetch={external || target === "_top" ? false : undefined}
      href={href}
      className="text-link"
      target={target}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      {arrow && <ArrowUpRight size={16} aria-hidden="true" />}
    </Link>
  );
}
