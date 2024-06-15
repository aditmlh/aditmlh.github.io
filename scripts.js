document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const contentContainer = document.querySelector('.container');
    const stages = document.querySelectorAll('.stage');
    const startButton = document.getElementById('startButton');
    let currentStage = 0;

    // Canvas size adjustment
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Game initialization
    function initGame() {
        drawBackground();
        animateStory(); // Call story animation function
        drawScene(); // Draw the initial scene
    }

    // Draw background
    function drawBackground() {
        ctx.fillStyle = '#1a202c'; // Background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw scene
    function drawScene() {
        // Example: Implementing a simple scene with buildings, roads, houses, mountains, etc.
        // Buildings
        ctx.fillStyle = '#555';
        ctx.fillRect(100, 200, 200, 400);
        ctx.fillRect(400, 100, 150, 500);

        // Roads
        ctx.fillStyle = '#888';
        ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

        // Houses
        ctx.fillStyle = '#b88';
        ctx.fillRect(600, 300, 100, 200);

        // Mountains
        ctx.fillStyle = '#444';
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.lineTo(300, 50);
        ctx.lineTo(400, 200);
        ctx.closePath();
        ctx.fill();

        // Sun
        ctx.beginPath();
        ctx.arc(canvas.width - 100, 100, 50, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();

        // Beach
        ctx.fillStyle = '#fcba03';
        ctx.fillRect(0, canvas.height - 100, canvas.width, 50);

        // Birds
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(120, 90);
        ctx.lineTo(120, 110);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(150, 120);
        ctx.lineTo(170, 110);
        ctx.lineTo(170, 130);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(200, 90);
        ctx.lineTo(220, 80);
        ctx.lineTo(220, 100);
        ctx.closePath();
        ctx.fill();
    }

    // Animate story
    function animateStory() {
        // Example: Implementing a simple story animation
        let textX = canvas.width / 2;
        let textY = canvas.height / 2;
        let storyText = [
            "Welcome to Aditya's Interactive Resume!",
            "Explore my career and skills...",
            "Let's begin!"
        ];

        ctx.fillStyle = '#fff';
        ctx.font = '30px Arial';

        let index = 0;
        let intervalId = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBackground();
            ctx.fillText(storyText[index], textX, textY);
            index++;

            if (index === storyText.length) {
                clearInterval(intervalId);
                contentContainer.classList.remove('hidden');
                stages[currentStage].classList.remove('hidden');
            }
        }, 2000); // 2 seconds per text animation
    }

    // Button click to navigate stages
    startButton.addEventListener('click', () => {
        unlockStage(1); // Start with the second stage (index 1)
    });

    // Function to unlock stages based on currentStage index
    function unlockStage(stageIndex) {
        if (stageIndex >= 0 && stageIndex < stages.length) {
            stages[currentStage].classList.add('hidden');
            currentStage = stageIndex;
            stages[currentStage].classList.remove('hidden');
        }
    }

    // Responsive canvas resizing
    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawBackground();
        drawScene(); // Redraw the scene on resize
    });

    // Initiate game
    initGame();
});
