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
    document.documentElement.toggleAttribute(
      "data-reading-index-active",
      isVisible,
    );

    return () => {
      document.documentElement.removeAttribute("data-reading-index-active");
    };
  }, [isVisible]);

  useEffect(() => {
    const sections = previewNavigation.flatMap((item) => {
      const element = document.getElementById(item.id);
      return element ? [{ id: item.id, element }] : [];
    });

    if (!sections.length) return;

    const visibleSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) visibleSections.add(id);
          else visibleSections.delete(id);

          if (id === FIRST_SECTION_ID) {
            setIsVisible(
              entry.isIntersecting ||
                entry.boundingClientRect.top < (entry.rootBounds?.bottom ?? 0),
            );
          }
        }

        const nextActive = sections.findLast(({ id }) =>
          visibleSections.has(id),
        );
        if (nextActive) setActiveId(nextActive.id);
      },
      { rootMargin: "0px 0px -65% 0px" },
    );

    for (const { element } of sections) observer.observe(element);

    return () => {
      observer.disconnect();
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
