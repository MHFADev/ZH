1) Hero image fade-in on load – Framer Motion initial {opacity:0, y:8} animate {opacity:1,y:0} duration 0.6.
2) Header slide-down on mount – Framer Motion initial {y:-12,opacity:0} animate {y:0,opacity:1} duration 0.45.
3) Nav link hover underline – CSS + Framer Motion scaleX 1.05 on hover.
4) Category button hover scale – Framer Motion whileHover scale 1.03.
5) Category active indicator transition – CSS transform with Framer Motion layout transition.
6) Product card entrance stagger – useGsapScroll on grid parent with stagger 0.08.
7) Product image hover zoom – Framer Motion whileHover scale 1.02.
8) Add button microinteraction – Framer Motion whileTap scale 0.98 and color flash.
9) Modal open/close – Framer Motion scale from 0.96 to 1 and backdrop fade.
10) Order form field focus ring – CSS with small Framer Motion pulse on focus.
11) Quantity increment animation – Framer Motion keyframe scale bounce.
12) Cart total update highlight – small GSAP tween to pulse background.
13) Footer reveal on scroll – GSAP ScrollTrigger fade-up.
14) WhatsApp CTA pulse – Framer Motion animate infinite yoyo scale 1.03.
15) Breadcrumbs transition – Framer Motion staggered fade.
16) Toast success — small framer-motion fly-in from top with auto-dismiss.
17) Image lazy-load reveal – Framer Motion onLoad opacity transition.
18) Button hover shadow lift – Framer Motion box-shadow interpolate.
19) Staggered list in order summary – useGsapScroll stagger children.
20) Mobile menu slide-in – Framer Motion x: -100% to 0%.
21) Logo hover rotation – Framer Motion rotate small degrees.

Implementation hints:
- Prefer Framer Motion for small UI interactions and GSAP ScrollTrigger for complex scroll reveals.
- Use the custom hook useGsapScroll(ref, { stagger: 0.08 }) to animate lists efficiently.
- Use transform and opacity for performant animations and avoid layout thrashing.
- Recommended durations: 0.35 - 0.6 seconds for interactive elements.
