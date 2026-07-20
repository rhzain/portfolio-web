import { AboutSection } from "@/app/_components/about-section";
import { ContactSection } from "@/app/_components/contact-section";
import { ExperienceSection } from "@/app/_components/experience-section";
import { IdentitySection } from "@/app/_components/identity-section";
import { ProjectsSection } from "@/app/_components/projects-section";
import { SiteFooter } from "@/app/_components/site-footer";
import { SiteHeader } from "@/app/_components/site-header";
import { StackSection } from "@/app/_components/stack-section";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="site-shell">
        <IdentitySection />
        <AboutSection />
        <ExperienceSection />
        <StackSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
