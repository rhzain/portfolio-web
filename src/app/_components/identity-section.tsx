import { identity, identityContacts } from "@/content/portfolio";
import { ProfilePortrait } from "@/app/_components/profile-portrait";
import { TwistingRibbon } from "@/components/ui/twisting-ribbon";

export function IdentitySection() {
  return (
    <section id="top" className="identity" aria-labelledby="identity-title">
      <TwistingRibbon
        className="identity-ribbon"
        segments={180}
        waveSpeed={0.01}
        waveAmplitude={0.72}
        twistCycles={5}
        motionDuration={440}
        continuous
        aria-hidden="true"
      />

      <div className="identity-inner">
        <ProfilePortrait name={identity.name} />

        <div className="identity-copy">
          <h1 id="identity-title">{identity.name}</h1>
          <p className="identity-lede">{identity.lede}</p>

          <dl className="identity-facts">
            <div>
              <dt>Location</dt>
              <dd className="content-slot">{identity.location}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd className="content-slot">{identity.status}</dd>
            </div>
          </dl>

          <div className="identity-links" aria-label="Profile links">
            {identityContacts.map((contact) => {
              const opensNewTab =
                contact.href.startsWith("http") || contact.href.endsWith(".pdf");

              return (
                <a
                  className="identity-contact identity-contact-link"
                  href={contact.href}
                  key={contact.label}
                  rel={opensNewTab ? "noreferrer" : undefined}
                  target={opensNewTab ? "_blank" : undefined}
                >
                  <span className="contact-mark" aria-hidden="true">
                    {contact.mark}
                  </span>
                  {contact.label}
                </a>
              );
            })}

            <a className="identity-work-link" href="#projects">
              <span
                className="contact-mark identity-work-mark"
                aria-hidden="true"
              >
                ↓
              </span>
              View projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
