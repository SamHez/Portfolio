export function RevealText({ lines }: { lines: string[] }) {
  return (
    <h1 className="hero-heading" aria-label={lines.join(" ")}>
      {lines.map((line, index) => (
        <span
          className={`headline-line line-${index}`}
          key={line}
          aria-hidden="true"
        >
          <span data-reveal>{line}</span>
        </span>
      ))}
    </h1>
  );
}
