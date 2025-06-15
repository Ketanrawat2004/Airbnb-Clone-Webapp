
import { ReactNode } from "react";

// Simple fade/slide animation on mount with fallback styles
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
      className={`opacity-100 translate-y-0 ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
}
