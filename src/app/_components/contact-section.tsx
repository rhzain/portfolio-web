import { contact } from "@/content/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div>
        <h2 id="contact-title">Let’s talk about useful work.</h2>
        <p className="content-slot">{contact.introduction}</p>
      </div>

      <dl className="contact-list">
        {contact.details.map((detail) => (
          <div key={detail.label}>
            <dt>{detail.label}</dt>
            <dd className="content-slot">{detail.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
