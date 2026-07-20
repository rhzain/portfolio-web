import { footerCopy } from "@/content/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>{footerCopy}</p>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
