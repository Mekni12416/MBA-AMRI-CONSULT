
// Modal functionality for certificate viewing
document.addEventListener("DOMContentLoaded", function () {
    const certificateModal = document.getElementById("certificateModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");

    // Handle modal opening
    certificateModal.addEventListener("show.bs.modal", function (event) {
        const button = event.relatedTarget;
        const imageSrc = button.getAttribute("data-image");
        const title = button.getAttribute("data-title");

        modalImage.src = imageSrc;
        modalTitle.textContent = title;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    // Back to top button functionality
    const backToTopBtn = document.querySelector(".back-to-top");
    
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    }

    window.addEventListener("scroll", toggleBackToTop);

    backToTopBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = "running";
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    document.querySelectorAll(".fade-in").forEach((el) => {
        el.style.animationPlayState = "paused";
        observer.observe(el);
    });

    // Navbar scroll effect
    window.addEventListener("scroll", function() {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(255, 255, 255, 0.98)";
            navbar.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
        }
    });

    // Certificate card hover effects
    document.querySelectorAll(".certificate-card").forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-10px) scale(1.02)";
        });
        
        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0) scale(1)";
        });
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector(".newsletter-form");
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector("input[type='email']");
        const submitBtn = newsletterForm.querySelector(".btn");
        
        submitBtn.addEventListener("click", function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // Simulate subscription
                submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Inscrit !';
                submitBtn.style.background = "#28a745";
                emailInput.value = "";
                
                setTimeout(() => {
                    submitBtn.innerHTML = "S'inscrire";
                    submitBtn.style.background = "";
                }, 3000);
            } else {
                emailInput.style.borderColor = "#dc3545";
                setTimeout(() => {
                    emailInput.style.borderColor = "";
                }, 2000);
            }
        });
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Initialize tooltips if needed
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Loading animation trigger
    setTimeout(() => {
        document.querySelectorAll(".fade-in").forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, index * 100);
        });
    }, 100);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-dependent animations can go here
}, 10);

window.addEventListener("scroll", debouncedScroll);