import throttle from "../utils/throttle.js";

const progressBar = document.getElementById("progressBar");

function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  if (progressBar) {
    progressBar.style.width = scrollPercent + "%";
  }
}

const backToTopBtn = document.getElementById("backToTop");

function toggleBackToTop() {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const header = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("section[id]");

function updateActiveNavLink() {
  const scrollY = window.scrollY;
  const headerHeight = header ? header.offsetHeight : 0;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + sectionId) {
          link.classList.add("active");
        }
      });
    }
  });
}

//est ce que c'est utile ?
let lastScrollY = 0;

function handleHeaderScroll() {
  const currentScrollY = window.scrollY;

  if (header) {
    if (currentScrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  lastScrollY = currentScrollY;
}

const ScrollFeatures = () => {
  const throttledScroll = throttle(() => {
    updateProgressBar();
    toggleBackToTop();
    updateActiveNavLink();
    handleHeaderScroll
  }, 100);

  window.addEventListener("scroll", throttledScroll);

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", scrollToTop);
  }
};

export default ScrollFeatures;
