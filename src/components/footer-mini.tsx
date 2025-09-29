import { LinkIcon } from "lucide-react";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`border-t bg-muted/30 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center space-x-2">
          <LinkIcon className="w-5 h-5 text-primary" />
          <span className="font-semibold">Pendekin</span>
          <span className="text-muted-foreground">
            • The smart way to shorten links
          </span>
        </div>
      </div>
    </footer>
  );
}
