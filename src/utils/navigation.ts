import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenis } from "../components/Navbar";

export function smoothNavigateTo(targetSelector: string) {
  const target = document.querySelector(targetSelector) as HTMLElement;
  if (!target) return;

  const currentScroll = window.scrollY || document.documentElement.scrollTop;
  const targetOffset = target.getBoundingClientRect().top + currentScroll;
  const distance = Math.abs(targetOffset - currentScroll);

  // Short distance and not contact: standard smooth scroll
  if (distance < 1500 && targetSelector !== "#contact") {
    if (lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.0,
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }

  // Long distance navigation (e.g. Home to Contact, or Contact to Home):
  // Provide an ultra-smooth direct crossfade transition so user doesn't have to scroll through every section
  let overlay = document.getElementById("direct-nav-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "direct-nav-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(11, 8, 12, 0.88)";
    overlay.style.backdropFilter = "blur(12px)";
    overlay.style.setProperty("-webkit-backdrop-filter", "blur(12px)");
    overlay.style.zIndex = "99999";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.transition = "opacity 0.2s cubic-bezier(0.25, 1, 0.5, 1)";
    document.body.appendChild(overlay);
  }

  overlay.style.pointerEvents = "auto";
  overlay.style.opacity = "1";

  setTimeout(() => {
    if (lenis) {
      lenis.scrollTo(target, { immediate: true, offset: 0 });
    } else {
      target.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    }

    ScrollTrigger.refresh();

    if (targetSelector === "#contact") {
      const firstInput = target.querySelector("input, textarea") as HTMLInputElement | null;
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 250);
      }
    }

    setTimeout(() => {
      if (overlay) {
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
      }
    }, 50);
  }, 200);
}
