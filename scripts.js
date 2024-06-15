document.addEventListener('DOMContentLoaded', function () {
    // Loader
    setTimeout(function () {
        document.getElementById('loader').style.display = 'none';
    }, 3000);

    // Mobile menu toggle
    document.getElementById('mobile-menu-toggle').addEventListener('click', function () {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Smooth scroll and active section
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for section activation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Portfolio modal
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioModal = document.getElementById('portfolio-modal');
    const closeModal = document.getElementById('close-modal');

    portfolioItems.forEach(item => {
        item.addEventListener('click', function () {
            portfolioModal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', function () {
        portfolioModal.classList.add('hidden');
    });

    // Tiny Slider (Clients Carousel)
    var slider = tns({
        container: '.slider',
        items: 3,
        slideBy: 'page',
        autoplay: true,
        autoplayButtonOutput: false,
        nav: false,
        controls: false,
        responsive: {
            640: {
                items: 3
            },
            768: {
                items: 4
            },
            1024: {
                items: 6
            }
        }
    });

    // Interactive Effects
    const interactiveItems = document.querySelectorAll('.interactive');

    interactiveItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            item.classList.add('transform', 'rotate-12', 'shadow-lg');
        });

        item.addEventListener('mouseleave', function () {
            item.classList.remove('transform', 'rotate-12', 'shadow-lg');
        });
    });

    // Typewriter Effect
    const typewriterText = document.getElementById('typewriter-text');
    const texts = ["Creative Developer", "Full Stack Developer", "UX/UI Enthusiast", "Proud Father", "Sports Lover", "Geek"];

    let index = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < texts[index].length) {
            typewriterText.textContent += texts[index].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 1500);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typewriterText.textContent = texts[index].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            index++;
            if (index >= texts.length) index = 0;
            setTimeout(type, 500);
        }
    }

    type();

    // Game-like interactions (example)
    const gameItems = document.querySelectorAll('.game-item');

    gameItems.forEach(item => {
        item.addEventListener('click', function () {
            const randomNumber = Math.floor(Math.random() * 100) + 1;
            if (randomNumber > 50) {
                item.classList.add('bg-green-300', 'text-green-900');
                item.textContent = 'You won!';
            } else {
                item.classList.add('bg-red-300', 'text-red-900');
                item.textContent = 'You lost!';
            }
        });
    });

});
