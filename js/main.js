const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const heroHeight = header.offsetHeight;

  if (window.scrollY > heroHeight - header.offsetHeight) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

/// Header Navigation
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a");
  const currentPath = window.location.pathname.split("/").pop();

  // ACTIVE LINK LOGIC (your existing code)
  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href").split("/").pop();

    if (
      (currentPath === "" || currentPath === "index.html") &&
      linkPath === "index.html"
    ) {
      link.classList.add("active");
    }

    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });

  // SMOOTH PAGE SWITCH
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");

      // Prevent reload if already on same page
      if (href.split("/").pop() === currentPath) return;

      e.preventDefault();

      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = href;
      }, 400); // must match CSS transition time
    });
  });
});


/// Heading Typing Animation
const texts = [
  "Data-Driven Future",
  "Smarter Decisions",
  "Actionable Intelligence"
];

const typingSpeed = 100;
const erasingSpeed = 60;
const delayBetweenTexts = 1500;

const typeElement = document.getElementById("typeText");

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    typeElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      setTimeout(() => (isDeleting = true), delayBetweenTexts);
    }
  } else {
    typeElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
}

document.addEventListener("DOMContentLoaded", typeEffect);


/// Global Animation - Appear as we reach the section
// Select all sections you want to animate
const animatedSections = document.querySelectorAll(".animate-on-scroll");

// Create observer
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // animate only once
      }
    });
  },
  {
    threshold: 0.25
  }
);

// Observe all sections
animatedSections.forEach(section => observer.observe(section));


/// What we do Animation
// Observe all sections with .animate-on-scroll
const scrollSections = document.querySelectorAll(".appear-on-scroll");

const popObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const items = entry.target.children;
        Array.from(items).forEach((child, index) => {
          child.style.transitionDelay = `${index * 0.1}s`; // dynamic stagger
        });
        entry.target.classList.add("show");
        popObserver.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.25 }
);

scrollSections.forEach((section) => popObserver.observe(section));


/// Solution Section Slider

const solutionSlider = document.querySelector(".solution-grid");
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");

const slides = document.querySelectorAll(".solution-item");
const slideGap = 30; // same as CSS gap
const visibleSlides = 3; // number of visible slides
const maxIndex = slides.length - visibleSlides;
let currentIndex = 0;

// Update arrow states (opacity 10% if disabled)
function updateArrows() {
  leftArrow.classList.toggle("arrow-disabled", currentIndex === 0);
  rightArrow.classList.toggle("arrow-disabled", currentIndex === maxIndex);
}

// Slide to current index
function slideToIndex() {
  const slideWidth = slides[0].offsetWidth + slideGap;
 solutionSlider.scrollTo({
    left: slideWidth * currentIndex,
    behavior: "smooth",
  });
  updateArrows();
}

// Arrow click events
rightArrow.addEventListener("click", () => {
  if (currentIndex < maxIndex) {
    currentIndex++;
    slideToIndex();
  }
});

leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    slideToIndex();
  }
});

// Initial arrow state
updateArrows();




let slideIndex = 1;
let autoPlayInterval;

showSlides(slideIndex);
startAutoPlay();

function plusSlides(n) {
  stopAutoPlay();
  showSlides(slideIndex += n);
  startAutoPlay();
}

function currentSlide(n) {
  stopAutoPlay();
  showSlides(slideIndex = n);
  startAutoPlay();
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");

  document.getElementById("currentSlide").textContent = slideIndex;
  document.getElementById("totalSlides").textContent = slides.length;
}

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 4000); // Change slide every 4 seconds
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

/// Reviews Section
let currentReviewSlide = 0;
const sliderReviewWrapper = document.getElementById('sliderWrapper');
const sliderReviewContainer = document.querySelector('.slider-container');
const reviewSlides = document.querySelectorAll('.review-card');
const totalReviewSlides = reviewSlides.length;
const dotsContainer = document.getElementById('dotsContainer');

let startReviewX = 0;
let currentReviewX = 0;
let isReviewDragging = false;
let reviewStartScrollLeft = 0;

// Create dots
for (let i = 0; i < totalReviewSlides; i++) {
  const dot = document.createElement('div');
  dot.className = 'dot2';
  if (i === 0) dot.classList.add('active');
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
}

function updateSlider() {
  sliderReviewWrapper.style.transform = `translateX(-${currentReviewSlide * 100}%)`;

  // Update dots
  const dots = document.querySelectorAll('.dot2');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentReviewSlide);
  });
}

function nextSlide() {
  if (currentReviewSlide < totalReviewSlides - 1) {
    currentReviewSlide++;
    updateSlider();
  }
}

function previousSlide() {
  if (currentReviewSlide > 0) {
    currentReviewSlide--;
    updateSlider();
  }
}

function goToSlide(index) {
  currentReviewSlide = index;
  updateSlider();
}

// Touch and mouse events for swipe
function handleStart(e) {
  isReviewDragging = true;
  startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  sliderReviewWrapper.style.transition = 'none';
  clearInterval(autoplayInterval);
}

function handleMove(e) {
  if (!isReviewDragging) return;
  e.preventDefault();

  currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  const diff = currentX - startX;
  const containerWidth = sliderReviewContainer.offsetWidth;
  const translateX = -currentReviewSlide * 100 + (diff / containerWidth) * 100;

  sliderReviewWrapper.style.transform = `translateX(${translateX}%)`;
}

function handleEnd(e) {
  if (!isReviewDragging) return;
  isReviewDragging = false;

  const diff = currentX - startX;
  const threshold = sliderReviewContainer.offsetWidth * 0.2;

  sliderReviewWrapper.style.transition = 'transform 0.5s ease-in-out';

  if (diff > threshold && currentReviewSlide > 0) {
    previousSlide();
  } else if (diff < -threshold && currentReviewSlide < totalReviewSlides - 1) {
    nextSlide();
  } else {
    updateSlider();
  }

  startAutoplay();
}

// Mouse events
sliderReviewContainer.addEventListener('mousedown', handleStart);
sliderReviewContainer.addEventListener('mousemove', handleMove);
sliderReviewContainer.addEventListener('mouseup', handleEnd);
sliderReviewContainer.addEventListener('mouseleave', handleEnd);

// Touch events
sliderReviewContainer.addEventListener('touchstart', handleStart, { passive: true });
sliderReviewContainer.addEventListener('touchmove', handleMove, { passive: false });
sliderReviewContainer.addEventListener('touchend', handleEnd);

// Prevent click when dragging
sliderReviewContainer.addEventListener('click', (e) => {
  if (Math.abs(currentX - startX) > 5) {
    e.preventDefault();
    e.stopPropagation();
  }
}, true);

// Auto-play
let autoplayInterval;

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    if (currentReviewSlide < totalReviewSlides - 1) {
      nextSlide();
    } else {
      currentReviewSlide = 0;
      updateSlider();
    }
  }, 5000);
}

// Pause autoplay on hover
sliderReviewContainer.addEventListener('mouseenter', () => {
  clearInterval(autoplayInterval);
});

sliderReviewContainer.addEventListener('mouseleave', () => {
  if (!isReviewDragging) {
    startAutoplay();
  }
});

// Initialize
updateSlider();
startAutoplay();


const video = document.getElementById("myVideo");

video.addEventListener("click", () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

/// FAQ Section
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  const icon = item.querySelector(".icon");

  question.addEventListener("click", () => {
    item.classList.toggle("active");
    icon.textContent = item.classList.contains("active") ? "×" : "+";
  });
});
