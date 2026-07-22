"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import type { ProfilePortraitHandle } from "@/app/_components/profile-portrait";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { siGithub } from "simple-icons";
import { identity, identityContacts } from "@/content/portfolio";
import { ProfilePortrait } from "@/app/_components/profile-portrait";
import { TwistingRibbon } from "@/components/ui/twisting-ribbon";
import { Button } from "@/components/motion/button";

const MotionButton = motion.create(Button);

const LINKEDIN_PATH =
  "M20.451 20.45h-3.554v-5.568c0-1.328-.023-3.036-1.849-3.036-1.851 0-2.135 1.445-2.135 2.939v5.665H9.359V9h3.414v1.561h.048c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.45H3.555V9h3.564z";

function ContactIcon({ label }: { label: string }) {
  if (label === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" focusable="false" style={{ strokeWidth: 0 }}>
        {/* Scale down to 90% and shift right to visually center the asymmetrical cat head */}
        <g transform="translate(1.8, 1.2) scale(0.9)">
          <path d={siGithub.path} fill="currentColor" />
        </g>
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" focusable="false" style={{ strokeWidth: 0 }}>
        <path d={LINKEDIN_PATH} fill="currentColor" />
      </svg>
    );
  }

  return label === "Email" ? <Mail /> : <FileText />;
}

export function IdentitySection() {
  const [showLockIn, setShowLockIn] = useState(false);
  const portraitRef = useRef<ProfilePortraitHandle>(null);

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
        <div className="identity-portrait-container">
          <ProfilePortrait ref={portraitRef} name={identity.name} onSmile={() => setShowLockIn(true)} />
          {showLockIn && (
            <MotionButton
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => {
                portraitRef.current?.reset();
                setShowLockIn(false);
              }}
              variant="none"
              size="none"
              ripple
              pressScale={0.93}
              className="identity-contact identity-contact-link lock-in-btn"
            >
              Let&apos;s lock in 🤓
            </MotionButton>
          )}
        </div>

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
                <Button
                  key={contact.label}
                  href={contact.href}
                  target={opensNewTab ? "_blank" : undefined}
                  rel={opensNewTab ? "noreferrer" : undefined}
                  variant="ghost"
                  ripple
                  pressScale={0.94}
                  className="identity-contact identity-contact-link !h-auto p-0"
                >
                  <span className="contact-mark" aria-hidden="true">
                    <ContactIcon label={contact.label} />
                  </span>
                  {contact.label}
                </Button>
              );
            })}

            <Button
              href="#projects"
              variant="primary"
              ripple
              pressScale={0.94}
              className="identity-work-link !h-auto p-0"
            >
              <span
                className="contact-mark identity-work-mark"
                aria-hidden="true"
              >
                <ArrowDown />
              </span>
              View projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
