export function SectionHeading({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <>
      <p className="eyebrow">{label}</p>
      <h1 className="page-heading">{title}</h1>
    </>
  );
}
