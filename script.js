// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const themeIcon = document.querySelector(".theme-toggle__icon")
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const navClose = document.getElementById("nav-close")
const navLinks = document.querySelectorAll(".nav__link")
const contactForm = document.getElementById("contact-form")

// Theme Toggle Functionality
let isDarkMode = true

themeToggle.addEventListener("click", () => {
  isDarkMode = !isDarkMode

  if (isDarkMode) {
    document.body.classList.remove("light-mode")
    document.body.classList.add("dark-mode")
    themeIcon.textContent = "🌙"
  } else {
    document.body.classList.remove("dark-mode")
    document.body.classList.add("light-mode")
    themeIcon.textContent = "☀️"
  }
})

// Mobile Navigation
navToggle.addEventListener("click", () => {
  navMenu.classList.add("show-menu")
})

navClose.addEventListener("click", () => {
  navMenu.classList.remove("show-menu")
})

// Close mobile menu when clicking on nav links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  })
})

// Smooth Scrolling for Navigation Links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = targetSection.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Header Background on Scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = isDarkMode ? "rgba(13, 13, 13, 0.98)" : "rgba(255, 255, 255, 0.98)"
  } else {
    header.style.background = "rgba(13, 13, 13, 0.95)"
  }
})

// Animated Counter Function
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    element.textContent = Math.floor(start)

    if (start >= target) {
      element.textContent = target + "+"
      clearInterval(timer)
    }
  }, 16)
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate")

      // Animate counters when stats section is visible
      if (entry.target.classList.contains("stat__number")) {
        const target = Number.parseInt(entry.target.getAttribute("data-target"))
        animateCounter(entry.target, target)
      }
    }
  })
}, observerOptions)

// Observe all elements with data-aos attribute
document.querySelectorAll("[data-aos]").forEach((el) => {
  observer.observe(el)
})

// Observe stat numbers for counter animation
document.querySelectorAll(".stat__number").forEach((el) => {
  observer.observe(el)
})

// Contact Form Handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Basic validation
  if (!name || !email || !message) {
    alert("Please fill in all fields.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.")
    return
  }

  // Success message
  alert(`Thank you, ${name}! Your inquiry has been sent. We'll get back to you soon.`)

  // Reset form
  contactForm.reset()
})

// Add loading animation to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple effect styles
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroPattern = document.querySelector(".hero__pattern")

  if (heroPattern) {
    heroPattern.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Add active state to navigation links based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const scrollPos = window.scrollY + 200

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
})

// Add active link styles
const activeStyle = document.createElement("style")
activeStyle.textContent = `
    .nav__link.active {
        color: var(--accent-color);
        position: relative;
    }
    
    .nav__link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--accent-color);
        border-radius: 1px;
    }
`
document.head.appendChild(activeStyle)

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  // Add entrance animation to hero content
  const heroContent = document.querySelector(".hero__content")
  heroContent.style.opacity = "0"
  heroContent.style.transform = "translateY(30px)"

  setTimeout(() => {
    heroContent.style.transition = "all 1s ease"
    heroContent.style.opacity = "1"
    heroContent.style.transform = "translateY(0)"
  }, 500)
})
