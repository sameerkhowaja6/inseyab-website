const header = document.getElementById('header');
const logoImg = document.getElementById('logoImg');
const brandsImage = document.getElementById('brandsImage');


const brandImageDesktop = "assets/images/brands.png";
const brandImageMobile = "assets/images/brands-mobile.png";
const defaultLogo = "../assets/logo-2.png";
const stickyLogo = "../assets/logo.png";


window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('sticky');
    logoImg.src = stickyLogo;
  } else {
    header.classList.remove('sticky');
    logoImg.src = defaultLogo;
  }
});


// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  console.log("======DOcument loaded");
  // Create mobile menu elements
  createMobileMenu();
  
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const closeMenuIcon = document.getElementById('closeMenuIcon')
  
  console.log('Hamburger:', hamburger);
  console.log('Mobile Menu:', mobileMenu);
  console.log('Overlay:', mobileMenuOverlay);
  console.log('Close Menu:', closeMenuIcon);

  // Toggle mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Hamburger clicked');
      
      hamburger.classList.toggle('active');
      
      if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        console.log('Menu toggled, active:', mobileMenu.classList.contains('active'));
      }
      
      if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.toggle('active');
      }
      
      // Prevent body scroll when menu is open
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  // Close menu when clicking overlay
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', function(e) {
      console.log('Overlay clicked');
      closeMobileMenu();
    });
  }

  // Close menu when clicking on close icon
  if(closeMenuIcon) {
    closeMenuIcon.addEventListener('click', function(e) {
      console.log('Close Icon Clicked');
      closeMobileMenu();
    });
  }

  // Close menu when clicking a link
  if (mobileMenu) {
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        console.log('Link clicked');
        closeMobileMenu();
      });
    });
  }

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  function closeMobileMenu() {
    console.log('Closing menu');
    if (hamburger) hamburger.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Function to create mobile menu structure
function createMobileMenu() {
  console.log('Creating mobile menu...');
  
  // Check if mobile menu already exists
  // if (document.querySelector('.mobile-menu')) {
  //   console.log('Mobile menu already exists');
  //   return;
  // }

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'mobile-menu-overlay';
  document.body.appendChild(overlay);
  console.log('Overlay created');

  // Create mobile menu
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';

  // Add "Menu" label
  const menuLabel = document.createElement('div');
  menuLabel.className = 'mobile-menu-label';
  menuLabel.textContent = 'Menu';
  mobileMenu.appendChild(menuLabel);

  // Get navigation links from desktop nav
  const desktopNav = document.querySelector('.nav') || document.querySelector('.nav2');
  console.log('Desktop nav found:', desktopNav);
  
  const navLinks = document.querySelectorAll(".nav a");;
  console.log('Nav links found:', navLinks.length);

  // Clone navigation links and set active state
  const currentPage = window.location.pathname.split('/').pop();
  
  navLinks.forEach(link => {
    const mobileLink = link.cloneNode(true);
    mobileLink.style.margin = '0';
    
    // Set active class based on current page
    const linkPath = link.getAttribute("href").split("/").pop();

    if (
      (currentPage === "" || currentPage === "index.html") &&
      linkPath === "index.html"
    ) {
      link.classList.add("active");
    }

    if (linkPath === currentPage) {
      link.classList.add("active");
    }
    
    mobileMenu.appendChild(mobileLink);
  });

  document.body.appendChild(mobileMenu);
  console.log('Mobile menu created and appended');

  // Add hamburger to headers if not exists
  addHamburgerToHeaders();
}

// Function to add hamburger icon to headers
function addHamburgerToHeaders() {
  const headers = document.querySelectorAll('.header, .header2');
  console.log('Headers found:', headers.length);
  
  headers.forEach(header => {
    // Check if hamburger already exists
    if (header.querySelector('.hamburger')) {
      console.log('Hamburger already exists in header');
      return;
    }

    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    
    // Insert hamburger at the end of header
    header.appendChild(hamburger);
    console.log('Hamburger added to header');
  });
}

/// Header Navigation
document.addEventListener("DOMContentLoaded", () => {
  /// Brand Image Change on mobile and desktop
  if(brandsImage){
    if (window.innerWidth < 768) {
    brandsImage.src = brandImageMobile;
  } else {
     brandsImage.src = brandImageDesktop;
  }
  }

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


if (typeElement) {
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
}


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
let currentIndex = 0;
let visibleSlides = getVisibleSlides();
let maxIndex = slides.length - visibleSlides;

// Determine number of visible slides based on screen width
function getVisibleSlides() {
  if (window.innerWidth < 768) {
    return 1; // mobile
  } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
    return 2; // tablet
  } else {
    return 3; // desktop
  }
}

// Update arrow states
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

if (leftArrow && rightArrow && solutionSlider && slides.length) {
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
}

// Update visible slides on window resize
window.addEventListener("resize", () => {
  visibleSlides = getVisibleSlides();
  maxIndex = slides.length - visibleSlides;
  if (currentIndex > maxIndex) currentIndex = maxIndex;
  slideToIndex();
});




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

  if (!slides.length) return;

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


