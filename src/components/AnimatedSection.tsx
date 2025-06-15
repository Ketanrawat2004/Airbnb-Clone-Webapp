
import { ReactNode } from "react";

// Simple fade/slide animation on mount
export default function AnimatedSection({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`opacity-0 translate-y-8 animate-fade-in ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
}
