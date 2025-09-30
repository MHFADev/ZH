"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

let registered = false;

export default function useGsapScroll(
  ref: RefObject<HTMLElement | null>,
  options?: { start?: string; end?: string; stagger?: number }
) {
  useEffect(() => {
    if (!registered) {
      try {
        gsap.registerPlugin(ScrollTrigger);
      } catch {
        // already registered or not available
      }
      registered = true;
    }

    const el = ref.current;
    if (!el) return;

    const targets = Array.from(el.children) as HTMLElement[];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: options?.stagger ?? 0.08,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: options?.start ?? "top 80%",
            end: options?.end ?? "bottom 20%",
            toggleActions: "play none none none"
          }
        }
      );
    }, el);

    return () => {
      try {
        ctx.revert();
      } catch {
        // ignore
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, options?.start, options?.end, options?.stagger]);
}
