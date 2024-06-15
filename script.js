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

    // Function to animate the planet
    function animatePlanet() {
        planet.rotation.y += 0.005;
    }

    // Function to animate the scene
    function animate() {
        requestAnimationFrame(animate);
        animatePlanet(); // Animate the planet or other 3D elements
        renderer.render(scene, camera);
    }

    // Function to start exploration from Earth
    function exploreEarth() {
        animate(); // Start the animation loop
        unlockStage(1); // Unlock Mercury after animation starts
    }

    // Button click to explore Mercury
    document.getElementById('exploreMercury').addEventListener('click', () => {
        unlockStage(2); // Unlock Mercury
    });

    // Button click to explore Jupiter
    document.getElementById('exploreJupiter').addEventListener('click', () => {
        unlockStage(3); // Unlock Jupiter
    });

    // Button click to explore Mars
    document.getElementById('exploreMars').addEventListener('click', () => {
        unlockStage(4); // Unlock Mars
    });

    // Button click to end exploration
    document.getElementById('endGame').addEventListener('click', () => {
        unlockStage(5); // End Credits
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
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Initiate exploration from Earth
    exploreEarth();
});
