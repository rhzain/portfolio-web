import { ArrowDown, FileText, Mail } from "lucide-react";
import { siGithub } from "simple-icons";
import { identity, identityContacts } from "@/content/portfolio";
import { ProfilePortrait } from "@/app/_components/profile-portrait";
import { TwistingRibbon } from "@/components/ui/twisting-ribbon";

const LINKEDIN_PATH =
  "M20.451 20.45h-3.554v-5.568c0-1.328-.023-3.036-1.849-3.036-1.851 0-2.135 1.445-2.135 2.939v5.665H9.359V9h3.414v1.561h.048c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.45H3.555V9h3.564z";

function ContactIcon({ label }: { label: string }) {
  if (label === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path d={siGithub.path} fill="currentColor" />
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path d={LINKEDIN_PATH} fill="currentColor" />
      </svg>
    );
  }

  return label === "Email" ? <Mail /> : <FileText />;
}

export function IdentitySection() {
  return (
    <section id="top" className="identity" aria-labelledby="identity-title">
      <TwistingRibbon
        className="identity-ribbon"
        segments={90}
        waveSpeed={0.01}
        waveAmplitude={0.72}
        twistCycles={5}
        motionDuration={4400}
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
                    <ContactIcon label={contact.label} />
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
                <ArrowDown />
              </span>
              View projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
