import { PageHero } from "@/components/layout/PageHero";
export default function NotFound() {
  return (
    <PageHero
      eyebrow="404 / PAGE NOT FOUND"
      title="There’s no page here."
      description="Explore the project archive or return to the homepage."
      cta={{ label: "Return home", href: "/" }}
    />
  );
}
