import { Mail } from "lucide-react";

export default function NavBand() {
  return (
    <div>
      <div className="container flex flex-col md:flex-row items-center py-4 text-sm justify-between text-muted-foreground">
        <p>FREE SHIPPING FOR ALL ORDERS OF 200 $</p>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <p>example@example.com</p>
        </div>
      </div>
    </div>
  );
}
