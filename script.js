document.addEventListener('DOMContentLoaded', function () {
    const stages = document.querySelectorAll('.stage');
    let currentStage = 0;

    // Initialize Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threejs-container').appendChild(renderer.domElement);

    // Create a basic sphere as an example of a planet
    const geometry = new THREE.SphereGeometry(10, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    camera.position.z = 50;

    // Add keyboard and touch controls for spaceship movement
    const spaceship = new THREE.Object3D(); // Replace with your spaceship model

    // Keyboard controls
    const keyboard = {};
    document.addEventListener('keydown', (e) => {
        keyboard[e.code] = true;
    });
    document.addEventListener('keyup', (e) => {
        keyboard[e.code] = false;
    });

    // Touch controls
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Adjust spaceship position based on deltaX and deltaY
        // Example: spaceship.position.x += deltaX * sensitivity;
        // Example: spaceship.position.y -= deltaY * sensitivity;

        touchStartX = touchEndX;
        touchStartY = touchEndY;
    });

    // Function to animate the planet
    function animatePlanet() {
        planet.rotation.y += 0.005;
    }

    // Function to animate the scene
    function animate() {
        requestAnimationFrame(animate);
        animateSpaceship(); // Animate the spaceship
        animatePlanet(); // Animate the planet or other 3D elements
        renderer.render(scene, camera);
    }

    // Function to animate the spaceship
    function animateSpaceship() {
        // Example: Update spaceship position based on keyboard or touch controls
        if (keyboard['KeyW']) {
            spaceship.position.z -= 0.1;
        }
        if (keyboard['KeyS']) {
            spaceship.position.z += 0.1;
        }
        if (keyboard['KeyA']) {
            spaceship.position.x -= 0.1;
        }
        if (keyboard['KeyD']) {
            spaceship.position.x += 0.1;
        }

        // Example: Limit spaceship movement within certain boundaries
        // Adjust according to your scene
        spaceship.position.x = Math.min(Math.max(spaceship.position.x, -50), 50);
        spaceship.position.z = Math.min(Math.max(spaceship.position.z, -50), 50);
    }

    // Button click to explore Mercury
    document.getElementById('exploreMercury').addEventListener('click', () => {
        unlockStage(1); // Unlock Mercury
    });

    // Button click to explore Jupiter
    document.getElementById('exploreJupiter').addEventListener('click', () => {
        unlockStage(2); // Unlock Jupiter
    });

    // Button click to explore Mars
    document.getElementById('exploreMars').addEventListener('click', () => {
        unlockStage(3); // Unlock Mars
    });

    // Button click to end exploration
    document.getElementById('endGame').addEventListener('click', () => {
        unlockStage(4); // End the game
    });

    // Function to unlock stages based on currentStage index
    function unlockStage(stageIndex) {
        if (stageIndex >= 0 && stageIndex < stages.length) {
            stages[currentStage].classList.add('hidden');
            currentStage = stageIndex;
            stages[currentStage].classList.remove('hidden');

            // Update the planet appearance based on the current stage
            switch (currentStage) {
                case 0: // Earth
                    planet.material.color.set(0x00ff00); // Green
                    break;
                case 1: // Mercury
                    planet.material.color.set(0xff0000); // Red
                    break;
                case 2: // Jupiter
                    planet.material.color.set(0xffff00); // Yellow
                    break;
                case 3: // Mars
                    planet.material.color.set(0xff00ff); // Magenta
                    break;
                case 4: // End credits
                    planet.material.color.set(0xffffff); // White
                    break;
                default:
                    break;
            }
        }
    }

    // Responsive canvas resizing
    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    // Start the animation
    animate();
});
