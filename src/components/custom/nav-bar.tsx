import Link from "next/link";
import Logo from "./logo";

export default function NavBar() {
  return (
    <nav className="h-16 bg-primary">
      <div className="h-full container flex items-center gap-8 text-white">
        <Logo />
        <div>
          <Link href="/shop">Shop</Link>
        </div>
      </div>
    </nav>
  );
}
