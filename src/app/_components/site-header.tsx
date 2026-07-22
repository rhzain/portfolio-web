"use client";

import type { FocusEvent, KeyboardEvent, MouseEvent } from "react";
import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { identity, previewNavigation } from "@/content/portfolio";
import { EASE_IN, EASE_OUT } from "@/lib/ease";
import {
  MorphPopover,
  MorphPopoverTrigger,
  MorphPopoverContent,
} from "@/components/motion/popover-morph";

const ENTER_TRANSITION = { duration: 0.3, ease: EASE_OUT } as const;
const EXIT_TRANSITION = { duration: 0.2, ease: EASE_IN } as const;
const REDUCED_TRANSITION = { duration: 0.12, ease: EASE_OUT } as const;

function subscribeToReadingIndex(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-reading-index-active", "data-reading-section"],
  });

  return () => observer.disconnect();
}

function getReadingIndexSnapshot() {
  return document.documentElement.hasAttribute("data-reading-index-active");
}

function getServerReadingIndexSnapshot() {
  return false;
}

function getReadingSectionSnapshot() {
  return document.documentElement.dataset.readingSection ?? "";
}

function getServerReadingSectionSnapshot() {
  return "";
}

function closeIndex(event: MouseEvent<HTMLAnchorElement>) {
  event.currentTarget.closest("details")?.removeAttribute("open");
}

function closeIndexOnBlur(event: FocusEvent<HTMLDetailsElement>) {
  if (
    !event.relatedTarget ||
    !event.currentTarget.contains(event.relatedTarget as Node)
  ) {
    event.currentTarget.open = false;
  }
}

function closeIndexOnEscape(event: KeyboardEvent<HTMLDetailsElement>) {
  if (event.key !== "Escape") return;

  event.currentTarget.open = false;
  event.currentTarget.querySelector("summary")?.focus();
}

function SectionMenu({
  dock = false,
  activeLabel = "About",
}: {
  dock?: boolean;
  activeLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <MorphPopover open={open} onOpenChange={setOpen}>
      <MorphPopoverTrigger className={dock ? "dock-index" : "nav-index"}>
        <div className={dock ? "dock-progress" : "nav-index-summary"}>
          <span>{dock ? activeLabel : "Menu"}</span>
        </div>
      </MorphPopoverTrigger>

      <MorphPopoverContent
        side={dock ? "top" : "bottom"}
        align="center"
        sideOffset={dock ? 38 : 22}
        className="w-56 p-2"
      >
        <div className="nav-index-panel-content">
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)] font-mono">
            Portfolio index
          </p>
          <ol className="flex flex-col m-0 p-0 list-none divide-y divide-[var(--color-rule)] border-t border-[var(--color-rule)]">
            {previewNavigation.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-2 py-2 text-sm font-semibold text-[var(--color-ink-2)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)] transition-colors"
                >
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </MorphPopoverContent>
    </MorphPopover>
  );
}

export function SiteHeader() {
  const reduceMotion = useReducedMotion();
  const isDock = useSyncExternalStore(
    subscribeToReadingIndex,
    getReadingIndexSnapshot,
    getServerReadingIndexSnapshot,
  );
  const activeSectionId = useSyncExternalStore(
    subscribeToReadingIndex,
    getReadingSectionSnapshot,
    getServerReadingSectionSnapshot,
  );
  const activeSection = previewNavigation.find(
    (item) => item.id === activeSectionId,
  );
  const hiddenState = reduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: isDock ? 8 : -8,
      };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <AnimatePresence initial={false}>
        <motion.header
          key={isDock ? "dock" : "navigation"}
          className={`utility-shell ${isDock ? "utility-shell--dock" : "utility-shell--navigation"}`}
          initial={hiddenState}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            ...hiddenState,
            transition: reduceMotion ? REDUCED_TRANSITION : EXIT_TRANSITION,
          }}
          transition={reduceMotion ? REDUCED_TRANSITION : ENTER_TRANSITION}
        >
          <nav
            className={`utility-nav ${isDock ? "utility-dock" : ""}`}
            aria-label="Primary navigation"
          >
            <a className="brand" href="#top" aria-label="Back to top">
              <span className="brand-name">{identity.initials}</span>
            </a>

            {isDock ? (
              <SectionMenu dock activeLabel={activeSection?.label} />
            ) : (
              <>
                <ul className="desktop-nav">
                  {previewNavigation.map((item) => (
                    <li key={item.href}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>

                <SectionMenu />
              </>
            )}

            <div className="utility-actions">
              <ThemeToggle
                variant="circle-blur"
                start="bottom-up"
                className="theme-toggle"
                iconClassName="theme-toggle-icon"
              />
            </div>
          </nav>
        </motion.header>
      </AnimatePresence>
    </>
  );
}
