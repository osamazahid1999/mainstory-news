import Link from "next/link";
import { categories } from "@/lib/mock-data";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <div>
          <Link className="logo light" href="/">MAIN <strong>STORY</strong></Link>
          <p>What matters. Why it matters.</p>
        </div>
        <div>
          <h4>Sections</h4>
          {categories.slice(0,5).map((item) => <Link key={item} href={"/category/" + item}>{item[0].toUpperCase()+item.slice(1)}</Link>)}
        </div>
        <div>
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Editorial Policy</a>
          <a href="#">Corrections</a>
          <a href="#">Contact</a>
        </div>
        <div>
          <h4>Follow</h4>
          <a href="#">YouTube</a>
          <a href="#">Instagram</a>
          <a href="#">X</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
      <div className="wrap copyright">© 2026 Main Story. All rights reserved.</div>
    </footer>
  );
}
