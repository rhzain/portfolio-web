import { ThemeToggle } from "@/components/theme/theme-toggle";
import { identity, navigation } from "@/content/portfolio";

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="utility-shell">
        <nav className="utility-nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Back to top">
            <span className="brand-mark" aria-hidden="true">
              {identity.initials}
            </span>
            <span className="brand-name">{identity.name}</span>
          </a>

          <ul className="desktop-nav">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          <details className="mobile-nav">
            <summary>Menu</summary>
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </details>

          <div className="utility-actions">
            <ThemeToggle
              variant="circle-blur"
              start="bottom-up"
              className="theme-toggle"
              iconClassName="theme-toggle-icon"
            />
            <a className="nav-contact" href="#contact">
              Contact
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
