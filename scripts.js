// Initialize Lottie animations
document.addEventListener('DOMContentLoaded', function () {
    // Example Lottie animation initialization
    lottie.loadAnimation({
        container: document.querySelector('.lottie-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'dummy-animation.json' // Replace with your Lottie animation JSON file
    });
});
