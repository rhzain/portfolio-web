"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  PreviewRail,
  type PreviewRailItem,
} from "@/components/motion/preview-rail";
import { previewNavigation } from "@/content/portfolio";
import { EASE_IN, EASE_OUT } from "@/lib/ease";

const FIRST_SECTION_ID = previewNavigation[0]?.id ?? "";
const VISIBILITY_HYSTERESIS = 32;

function SectionPreview({ item }: { item: PreviewRailItem }) {
  return (
    <div className="section-progress-card">
      <p>{item.label}</p>
      {item.description ? <span>{item.description}</span> : null}
    </div>
  );
}

export function SectionProgressRail() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(FIRST_SECTION_ID);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sections = previewNavigation.flatMap((item) => {
      const element = document.getElementById(item.id);
      return element ? [{ id: item.id, element }] : [];
    });

    if (!sections.length) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.35;
      const firstSectionTop = sections[0].element.getBoundingClientRect().top;
      let nextActiveId = sections[0].id;

      for (const section of sections) {
        if (section.element.getBoundingClientRect().top > readingLine) break;
        nextActiveId = section.id;
      }

      const pageBottom = window.scrollY + window.innerHeight;
      if (pageBottom >= document.documentElement.scrollHeight - 1) {
        nextActiveId = sections.at(-1)?.id ?? nextActiveId;
      }

      setIsVisible(
        (visible) =>
          firstSectionTop <=
          readingLine + (visible ? VISIBILITY_HYSTERESIS : 0),
      );
      setActiveId(nextActiveId);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="section-progress-rail">
      <motion.div
        initial={false}
        animate={{
          opacity: isVisible ? 1 : 0,
          x: reduceMotion || isVisible ? 0 : -8,
        }}
        transition={
          reduceMotion
            ? { duration: 0.12, ease: EASE_OUT }
            : isVisible
              ? { duration: 0.3, ease: EASE_OUT }
              : { duration: 0.2, ease: EASE_IN }
        }
        aria-hidden={!isVisible}
        inert={!isVisible}
      >
        <PreviewRail
          items={previewNavigation}
          activeId={activeId}
          onActiveChange={setActiveId}
          className="section-progress-rail-layout min-h-0"
          railClassName="section-progress-rail-track"
          previewClassName="section-progress-rail-preview"
          renderPreview={(item) => <SectionPreview item={item} />}
        />
      </motion.div>
    </div>
  );
}
