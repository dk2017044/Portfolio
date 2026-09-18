import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";
import { config } from "../config";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  useEffect(() => {
    // On mobile and tablet devices, use native browser touch scrolling
    if (window.innerWidth <= 1024) {
      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "hidden";

      const links = document.querySelectorAll(".header ul a");
      const clickHandlers: Array<[Element, (e: Event) => void]> = [];
      links.forEach((elem) => {
        const handler = (e: Event) => {
          const targetHref = (elem as HTMLElement).getAttribute("data-href");
          if (targetHref) {
            e.preventDefault();
            const targetElem = document.querySelector(targetHref);
            if (targetElem) {
              targetElem.scrollIntoView({ behavior: "smooth" });
            }
          }
        };
        elem.addEventListener("click", handler);
        clickHandlers.push([elem, handler]);
      });

      return () => {
        clickHandlers.forEach(([elem, handler]) => elem.removeEventListener("click", handler));
      };
    }

    // Initialize Lenis smooth scroll for Desktop
    lenis = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.7,
      touchMultiplier: 2,
      infinite: false,
    });

    // Start paused until loader completes
    lenis.stop();

    let reqId: number;
    function raf(time: number) {
      lenis?.raf(time);
      reqId = requestAnimationFrame(raf);
    }
    reqId = requestAnimationFrame(raf);

    // Handle navigation links on desktop
    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let section = element.getAttribute("data-href");
        if (section && lenis) {
          const target = document.querySelector(section) as HTMLElement;
          if (target) {
            lenis.scrollTo(target, {
              offset: 0,
              duration: 1.5,
            });
          }
        }
      });
    });

    const resizeHandler = () => {
      lenis?.resize();
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", resizeHandler);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          DK
        </a>
        <a
          href={`mailto:${config.contact.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {config.contact.email}
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
