"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation } from "@/content/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
export function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 32,
    () => false,
  );
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    function close() {
      setOpen(false);
      trigger.current?.focus();
    }
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        const links = panel.current?.querySelectorAll<HTMLElement>("a, button");
        if (!links?.length) return;
        const first = links[0],
          last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    const wide = window.matchMedia("(min-width: 801px)");
    const resize = () => {
      if (wide.matches) close();
    };
    wide.addEventListener("change", resize);
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", keydown);
      wide.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}${pathname !== "/" ? " is-interior" : ""}`}
    >
      <ScrollReveal entrance className="container header-inner">
        <Link
          data-reveal
          href="/"
          className="brand"
          aria-label="Samuel Epodoi, home"
        >
          SE<span>.</span>
        </Link>
        <nav data-reveal className="desktop-nav" aria-label="Main navigation">
          {navigation.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div data-reveal className="header-actions">
          <ThemeToggle />
          <Link
            className="contact-link"
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
          >
            Contact <ArrowUpRight size={15} />
          </Link>
          <button
            ref={trigger}
            className="menu-button icon-button"
            type="button"
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </ScrollReveal>
      {open && (
        <div
          ref={panel}
          id="mobile-navigation"
          className="mobile-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="mobile-panel-top">
            <span className="brand">SE.</span>
            <button
              className="icon-button"
              onClick={() => {
                setOpen(false);
                trigger.current?.focus();
              }}
              aria-label="Close navigation"
            >
              <X />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="mono">{item.number}</span>
                {item.label}
                <ArrowUpRight size={24} />
              </Link>
            ))}
          </nav>
          <p className="mono mobile-note">Engineering. Design. Purpose.</p>
        </div>
      )}
    </header>
  );
}
