document.addEventListener('DOMContentLoaded', function () {
    // Loader
    setTimeout(function () {
        document.getElementById('loader').style.display = 'none';
    }, 3000);

    // Mobile menu toggle
    document.getElementById('mobile-menu-toggle').addEventListener('click', function () {
        document.getElementById('mobile-menu').classList.toggle('hidden');
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
});
