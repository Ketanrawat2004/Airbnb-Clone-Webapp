
import { ReactNode, Children, cloneElement, isValidElement } from "react";

export default function StaggeredFadeIn({
  children,
  stagger = 0.12,
  className = "",
}: {
  children: ReactNode;
  stagger?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child, idx) => {
        if (!isValidElement(child)) return child;
        // Cast to React.ReactElement<any> so we can override style/className
        const el = child as React.ReactElement<any>;
        return cloneElement(el, {
          style: {
            ...(el.props.style || {}),
            animationDelay: `${idx * stagger}s`,
            animationFillMode: "forwards",
          },
          className: `${el.props.className || ""} opacity-0 translate-y-8 animate-fade-in`,
        });
      })}
    </div>
  );
}
