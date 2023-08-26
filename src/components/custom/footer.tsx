import Link from "next/link";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary shrink-0">
      <div className="container h-full flex flex-col sm:flex-row items-center justify-between gap-4 py-4 text-white">
        <p>© YeraCode 2023 - 2024</p>
        <div className="flex items-center gap-2">
          <p>Proudly open source on</p>
          <Link href="https://github.com/pacy2/next-shopify" target="_blank">
            <Github className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
