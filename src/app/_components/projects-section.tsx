"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Folder, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { projects } from "@/content/portfolio";
import { SectionMarker } from "@/app/_components/section-marker";

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`project-card${project.featured ? " project-card-featured" : ""}`}
    >
      <figure className="project-media">
        {project.image ? (
          <Image 
            src={project.image} 
            alt={`Screenshot of ${project.title}`} 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <>
            <span>{project.index} / Project capture</span>
            <figcaption>Add a real image or product capture</figcaption>
          </>
        )}
      </figure>
      <div className="project-copy">
        <div className="project-header">
          <span className="project-index" aria-hidden="true">
            {project.index}
          </span>
          <div className="project-title-row">
            <h3>{project.title}</h3>
            {project.year && <span className="project-year">{project.year}</span>}
          </div>
        </div>
        <p className="project-purpose">{project.purpose}</p>
        <dl className="project-meta">
          <div>
            <dt>Contribution</dt>
            <dd>{project.contribution}</dd>
          </div>
          <div>
            <dt>Built with</dt>
            <dd>{project.tools}</dd>
          </div>
        </dl>
        {(project.github || project.link) && (
          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                Visit ↗
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const [isCarousel, setIsCarousel] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "instant" });
    }
  }, [isCarousel]);

  return (
    <section
      id="projects"
      className="document-section projects"
      aria-labelledby="projects-title"
    >
      <SectionMarker index={4} />
      <div className="projects-heading">
        <div className="projects-heading-text">
          <h2 id="projects-title">Projects</h2>
          <p>
            Here are some of the projects I’ve worked on. Each one has expanded my knowledge and shaped how I approach building practical solutions.
          </p>
        </div>
      </div>

      <motion.div 
        ref={carouselRef}
        layout
        className={isCarousel ? "project-carousel" : "project-grid"}
      >
        <AnimatePresence mode="popLayout">
          {(!isCarousel ? projects.slice(0, 3) : projects).map((project) => (
            <ProjectCard key={project.index} project={project} />
          ))}

          {!isCarousel && (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setIsCarousel(true);
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
                toast("All projects are opened!", {
                  description: "Scroll to the left to view all projects"
                });
              }}
              className="project-folder-card"
              aria-label="View All Projects"
            >
              <Folder size={64} strokeWidth={1} />
              <span>All Projects</span>
            </motion.button>
          )}

          {isCarousel && (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollTo({ left: 0, behavior: "instant" });
                }
                setIsCarousel(false);
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`project-folder-card ${projects.length % 2 === 0 ? "span-2-rows" : ""}`}
              aria-label="Collapse projects"
            >
              <ArrowLeft size={64} strokeWidth={1} />
              <span>Collapse</span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
