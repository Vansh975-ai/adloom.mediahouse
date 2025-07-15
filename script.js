// Add at the beginning of the file
document.addEventListener("DOMContentLoaded", () => {
  // Add page loaded class to trigger floating animations
  setTimeout(() => {
    document.body.classList.add("page-loaded")
  }, 100)
})

// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle")
const body = document.body
const themeIcon = document.querySelector(".theme-icon")

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme")
  body.classList.toggle("dark-theme")

  if (body.classList.contains("light-theme")) {
    themeIcon.textContent = "☀️"
    localStorage.setItem("theme", "light")
  } else {
    themeIcon.textContent = "🌙"
    localStorage.setItem("theme", "dark")
  }
})

// Load saved theme
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "light") {
  body.classList.remove("dark-theme")
  body.classList.add("light-theme")
  themeIcon.textContent = "☀️"
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

// Observe all elements with animate-on-scroll class
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el)
})

// Counter Animation
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

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".stat-number")
        counters.forEach((counter) => {
          const target = Number.parseInt(counter.getAttribute("data-target"))
          animateCounter(counter, target)
        })
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const statsSection = document.querySelector(".stats")
if (statsSection) {
  statsObserver.observe(statsSection)
}

// Contact Form Handling
const contactForm = document.getElementById("contactForm")
contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Simple validation
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
  alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`)

  // Reset form
  this.reset()
})

// Mobile Menu Toggle (for future enhancement)
const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const navLinks = document.querySelector(".nav-links")

mobileMenuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("mobile-active")
  mobileMenuToggle.classList.toggle("active")
})

// Header Background on Scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.backgroundColor = body.classList.contains("light-theme")
      ? "rgba(255, 255, 255, 0.95)"
      : "rgba(13, 13, 13, 0.95)"
  } else {
    header.style.backgroundColor = body.classList.contains("light-theme") ? "#FFFFFF" : "#0D0D0D"
  }
})

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroImage = document.querySelector(".hero-image img")
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Enhanced floating text animation on scroll
const floatingTextObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running"
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

// Observe all floating text elements
document
  .querySelectorAll(".floating-text, .floating-text-delay-1, .floating-text-delay-2, .floating-text-delay-3")
  .forEach((el) => {
    floatingTextObserver.observe(el)
  })

// Enhanced loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Trigger floating animations for visible elements
  const visibleElements = document.querySelectorAll(
    ".floating-text, .floating-text-delay-1, .floating-text-delay-2, .floating-text-delay-3",
  )
  visibleElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.animationPlayState = "running"
    }, index * 100)
  })
})
