"use client";

import { useEffect, useState } from "react";
import { Text } from "@/components/typography";
import { COMPONENT_SECTIONS } from "./data";
import { cn } from "@/lib/utils";

const PageSidebar = () => {
  const [activeId, setActiveId] = useState<string | null>("buttons");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0.1,
      }
    );

    COMPONENT_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="sticky top-0 pt-4 h-[100dvh] scrollbar-hide overflow-auto w-64 shrink-0 border-r pr-4">
      <Text size="lg" weight="semibold" className="mb-4">
        Components
      </Text>

      <nav className="space-y-1">
        {COMPONENT_SECTIONS.map((item) => {
          const isActive = activeId === item.id;

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActiveId(item.id);
                }}
                className={cn(
                  "block w-full rounded-md px-3 py-2 text-left text-sm transition-all duration-300",
                  isActive
                    ? "bg-accent text-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {item.label}
              </button>
              <div className="pl-4">
                {item.children?.map((child) => {
                  const isChildActive = activeId === child.id;
                  return (
                    <button
                      key={child.id}
                      onClick={() => {
                        document.getElementById(child.id)?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                        setActiveId(child.id);
                      }}
                      className={cn(
                        "block w-full rounded-md px-3 py-2 text-left text-sm transition",
                        isChildActive
                          ? "bg-accent text-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      {child.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default PageSidebar;
