"use client";
import { useBackgroundMotion } from "@/lib/background-motion";
export function FloatingCollage({ children }: { children: React.ReactNode }) {
  const { paused } = useBackgroundMotion();
  return (
    <div className="recognition-collage" data-reveal data-paused={paused}>
      {children}
    </div>
  );
}
