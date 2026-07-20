import { stack } from "@/content/portfolio";

export function StackSection() {
  return (
    <section id="stack" className="document-section stack" aria-labelledby="stack-title">
      <h2 id="stack-title">Technical stack</h2>
      <dl className="stack-list">
        {stack.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd className="content-slot">{item.tools}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
