document.addEventListener("DOMContentLoaded", () => {
    // Scroll reveal animation
    const elementsToReveal = document.querySelectorAll('.fade-in-scroll');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 80; // trigger point offset

        elementsToReveal.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    };

    // Throttle scroll event for better performance
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                revealOnScroll();
                handleNavbar();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    // Trigger scroll actions once on load
    revealOnScroll(); 

    // Form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation simulation
            const btn = bookingForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Processing...';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            setTimeout(() => {
                alert('Thank you for booking! Your request has been sent.');
                btn.textContent = originalText;
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'all';
                bookingForm.reset();
            }, 1000);
        });
    }

    // Navbar background on scroll function
    const navbar = document.querySelector('.navbar');
    const handleNavbar = () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(0, 102, 178, 0.3)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8)';
            navbar.style.padding = '15px 50px'; // shrink navbar slightly
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.5)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
            navbar.style.boxShadow = 'none';
            if (window.innerWidth > 768) {
                navbar.style.padding = '24px 50px';
            }
        }
    };
    handleNavbar(); // Initial check

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
