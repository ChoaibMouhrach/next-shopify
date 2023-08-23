import { AlignVerticalJustifyEnd } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-white">
      <AlignVerticalJustifyEnd />
      <span className="block tracking-wider font-extrabold text-lg">
        YeraCode
      </span>
    </Link>
  );
}
