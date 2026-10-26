import type { Metadata } from "next";
import { metadataForProject } from "@/lib/project-metadata";
import { notFound } from "next/navigation";
import { getPublishedProjects } from "@/content/projects";
import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
export const dynamicParams = false;
export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublishedProjects().find((item) => item.slug === slug);
  if (!project) notFound();
  return metadataForProject(project);
}
export default async function Project({ params }: Props) {
  const { slug } = await params;
  const projects = getPublishedProjects();
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const selected = projects.filter((item) => item.featured);
  const selectedIndex = selected.findIndex((item) => item.slug === slug);
  return (
    <CaseStudyLayout
      project={projects[index]}
      next={selected[(selectedIndex + 1) % selected.length]}
    />
  );
}
