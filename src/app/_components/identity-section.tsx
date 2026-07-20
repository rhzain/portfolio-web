import { identity, identityContacts } from "@/content/portfolio";
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
        <div className="identity-mark" aria-hidden="true">
          {identity.initials}
        </div>

        <div className="identity-copy">
          <p className="identity-role content-slot">{identity.role}</p>
          <h1 id="identity-title">{identity.name}</h1>
          <p className="identity-lede content-slot">{identity.lede}</p>

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
            {identityContacts.map((contact) => (
              <span
                className="identity-contact"
                aria-disabled="true"
                aria-label={`${contact.label} link pending`}
                title={contact.pending}
                key={contact.label}
              >
                <span className="contact-mark" aria-hidden="true">
                  {contact.mark}
                </span>
                {contact.label}
              </span>
            ))}

            <a className="identity-work-link" href="#projects">
              <span
                className="contact-mark identity-work-mark"
                aria-hidden="true"
              >
                ↘
              </span>
              View projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
