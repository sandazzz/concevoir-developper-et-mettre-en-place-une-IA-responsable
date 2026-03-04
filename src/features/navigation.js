import throttle from "../utils/throttle.js";

const header = document.querySelector(".site-header");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navMenu = document.getElementById("nav-menu");

function toggleMobileMenu() {
  const isExpanded = mobileMenuToggle.getAttribute("aria-expanded") === "true";
  mobileMenuToggle.setAttribute("aria-expanded", !isExpanded);
  navMenu.classList.toggle("active");

  // Toggle hamburger animation
  const hamburger = mobileMenuToggle.querySelector(".hamburger");
  if (hamburger) {
    hamburger.style.backgroundColor = isExpanded ? "" : "transparent";
  }
}

function closeMobileMenu() {
  mobileMenuToggle.setAttribute("aria-expanded", "false");
  navMenu.classList.remove("active");
}

function handleAnchorClick(e) {
  const href = this.getAttribute("href");

  if (href.startsWith("#")) {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      closeMobileMenu();

      // Update URL without jumping
      history.pushState(null, null, href);
    }
  }
}

function handleKeyboardNav(e) {
  // Close mobile menu on Escape
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    closeMobileMenu();
    mobileMenuToggle.focus();
  }
}

function Navigation() {
  // Mobile menu
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  }

  // Anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", handleAnchorClick);
  });

  // Keyboard navigation
  document.addEventListener("keydown", handleKeyboardNav);

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navMenu && navMenu.classList.contains("active")) {
      if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  // Handle resize
  window.addEventListener(
    "resize",
    throttle(() => {
      if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove("active");
        if (mobileMenuToggle) {
          mobileMenuToggle.setAttribute("aria-expanded", "false");
        }
      }
    }, 200),
  );
}

export default Navigation;
