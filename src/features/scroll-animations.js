function setupIntersectionObserver() {
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -100px 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements that should animate
  const animatableElements = document.querySelectorAll(
    ".content-block, .sommaire-card, .feature-card, .stat-card, " +
      ".step-card, .model-card, .technique-card, .timeline-item",
  );

  animatableElements.forEach((el) => {
    el.classList.add("animate-ready");
    observer.observe(el);
  });
}

function ScrollAnimations() {
  setupIntersectionObserver();
}

export default ScrollAnimations;
