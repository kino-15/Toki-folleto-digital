const presentation = document.querySelector(".presentation");
const slides = [...document.querySelectorAll(".slide")];
let currentSlide = 0;

const observer = new IntersectionObserver(
  (entries) => {
    const visibleSlide = entries.find((entry) => entry.isIntersecting);

    if (visibleSlide) {
      currentSlide = slides.indexOf(visibleSlide.target);
    }
  },
  {
    root: presentation,
    threshold: 0.6,
  },
);

slides.forEach((slide) => observer.observe(slide));

window.addEventListener("keydown", (event) => {
  const nextKeys = ["ArrowDown", "PageDown"];
  const previousKeys = ["ArrowUp", "PageUp"];

  if (!nextKeys.includes(event.key) && !previousKeys.includes(event.key)) {
    return;
  }

  event.preventDefault();
  const direction = nextKeys.includes(event.key) ? 1 : -1;
  const destination = Math.max(
    0,
    Math.min(slides.length - 1, currentSlide + direction),
  );

  slides[destination].scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
});
