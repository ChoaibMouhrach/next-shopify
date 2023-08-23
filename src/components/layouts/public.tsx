import { ScrollArea } from "@/components/ui/scroll-area";
import NavBand from "../custom/nav-band";
import NavBar from "../custom/nav-bar";
import Footer from "../custom/footer";

interface PublicLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PublicLayout({
  children,
  className,
}: PublicLayoutProps) {
  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen flex flex-col">
        <div className="shrink-0">
          <NavBand />
          <NavBar />
        </div>
        <div className={`flex-1 flex flex-col shrink-0 ${className}`}>
          {children}
        </div>
        <Footer />
      </div>
    </ScrollArea>
  );
}
