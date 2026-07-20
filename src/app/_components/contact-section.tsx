import { contact } from "@/content/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div>
        <h2 id="contact-title">My Contact</h2>
        <p className="content-slot">{contact.introduction}</p>
      </div>

      <dl className="contact-list">
        {contact.details.map((detail) => {
          const opensNewTab =
            detail.href.startsWith("http") || detail.href.endsWith(".pdf");

          return (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>
                <a
                  href={detail.href}
                  rel={opensNewTab ? "noreferrer" : undefined}
                  target={opensNewTab ? "_blank" : undefined}
                >
                  {detail.value}
                </a>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
