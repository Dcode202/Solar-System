//============================== Import necessary Three.js modules and dependencie
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Import textures and bump maps for celestial bodies
import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import sunBumpmap from '../img/sunBumpmap.png';
import mercuryTexture from '../img/mercury.jpg';
import mercuryBumpmap from '../img/mercuryBumpmap.png';
import venusTexture from '../img/venus.jpg';
import venusBumpmap from '../img/venusBumpmap.png';
import earthTexture from '../img/earth.jpg';
import earthBumpmap from '../img/earthBumpmap.png';
import marsTexture from '../img/mars.jpg';
import marsBumpmap from '../img/marsBumpmap.png';
import jupiterTexture from '../img/jupiter.jpg';
import jupiterBumpmap from '../img/jupiterBumpmap.png';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn ring.png';
import saturnBumpmap from '../img/saturnBumpmap.png';
import uranusTexture from '../img/uranus.jpg';
import uranusBumpmap from '../img/uranusBumpmap.png';
import uranusRingTexture from '../img/uranus ring.png';
import neptuneTexture from '../img/neptune.jpg';
import neptuneBumpmap from '../img/neptuneBumpmap.png';
import plutoTexture from '../img/pluto.jpg';
import plutoBumpmap from '../img/plutoBumpmap.png';
import titanTexture from '../img/titan.jpg';
import titanBumpmap from '../img/titanBumpmap.png';
import mimasTexture from '../img/mimas.jpg';
import mimasBumpmap from '../img/mimasBumpmap.png';
import enceladusTexture from '../img/enceladus.jpg';
import encledusBumpmap from '../img/enceladusBumpmap.png';


//============================== Create a new scene
const scene = new THREE.Scene();

// Create the camera with specified parameters
const camera = new THREE.PerspectiveCamera(
    45,                                         // Field of view
    window.innerWidth / window.innerHeight,     // Aspect ratio
    0.1,                                        // Near clipping plane
    10000                                        // Far clipping plane
);

// Create the renderer and attach it to the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Enable shadows in the renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Create OrbitControls to allow camera movement
const orbit = new OrbitControls(camera, renderer.domElement);

// Set the initial camera position and update the OrbitControls
camera.position.set(-100, 80, 80); // x, y, z
orbit.update();

// Add ambient light to the scene
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Add a point light to the scene
const sunLight = new THREE.PointLight(0xffffff, 1); // Color, intensity
sunLight.position.set(0, 0, 0); // Position at the center of the sun
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.1;
sunLight.shadow.camera.far = 1000;
sunLight.shadow.radius = 8; // Adjust this value to control the softness of the shadows
scene.add(sunLight);

// Create a cube texture loader and set the scene background with starsTexture
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,                           // Right
    starsTexture,                           // Left
    starsTexture,                           // Top
    starsTexture,                           // Bottom
    starsTexture,                           // Front
    starsTexture                            // Back
]);


// Create a texture loader for individual planet textures
const textureLoader = new THREE.TextureLoader();

//============================== Create a sun (central star)
const sunGeometry = new THREE.SphereGeometry(16, 30, 30); // Radius, widthSegments, heightSegments
const sunMaterial = new THREE.MeshBasicMaterial({ 
    map: textureLoader.load(sunTexture),
    bumpMap: textureLoader.load(sunBumpmap),
    bumpScale: 0.5,
    shininess: 0.5 
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

//============================== Create planets and moons

// Create arrays to store planet meshes and orbit lines
const planets = [];
const planetData = [
    { // 0
        name: 'mercury', 
        radius: 3.2, 
        distance: 39, 
        texture: mercuryTexture, 
        bumpTexture: mercuryBumpmap, 
        revolutionSpeed: 0.0002874,
        eccentricity: 0.3,
    },
    { // 1
        name: 'venus',
        radius: 5.8,
        distance: 72,
        texture: venusTexture,
        bumpTexture: venusBumpmap,
        revolutionSpeed: 0.0002100,
        eccentricity: 0.3,
    },
    { // 2
        name: 'earth',
        radius: 6,
        distance: 100,
        texture: earthTexture,
        bumpTexture: earthBumpmap,
        revolutionSpeed: 0.0001718,
        eccentricity: 0.3,
    },
    { // 3
        name: 'mars',
        radius: 4,
        distance: 152,
        texture: marsTexture,
        bumpTexture: marsBumpmap,
        revolutionSpeed: 0.0001430,
        eccentricity: 0.3,
    },
    { // 4
        name: 'jupiter',
        radius: 12,
        distance: 220,
        texture: jupiterTexture,
        bumpTexture: jupiterBumpmap,
        revolutionSpeed: 0.0000223,
        eccentricity: 0.3,
    },
    { // 5
        name: 'saturn',
        radius: 10,
        distance: 330,
        texture: saturnTexture,
        bumpTexture: saturnBumpmap,
        revolutionSpeed: 0.0000091,
        eccentricity: 0.3,
        ring: {
            texture: saturnRingTexture,
            innerRadius: 10,
            outerRadius: 20,
        }
    },
    { // 6
        name: 'uranus',
        radius: 7,
        distance: 490,
        texture: uranusTexture,
        bumpTexture: uranusBumpmap,
        revolutionSpeed: 0.0000032,
        eccentricity: 0.3,
        ring: {
            texture: uranusRingTexture,
            innerRadius: 7,
            outerRadius: 12,
        }
    },
    { // 7
        name: 'neptune',
        radius: 7,
        distance: 670,
        texture: neptuneTexture,
        bumpTexture: neptuneBumpmap,
        revolutionSpeed: 0.0000016,
        eccentricity: 0.3,
    },
    { // 8
        name: 'pluto',
        radius: 2.8,
        distance: 900,
        texture: plutoTexture,
        bumpTexture: plutoBumpmap,
        revolutionSpeed: 0.0000010,
        eccentricity: 0.3,
    }
];
const orbitLines = [];

// Create a random color for each asteroid
const asteroidColors = ['#5a554c', '#767676', '#93928c', '#362d01', '#9fd344'];

// Create a mesh for each planet and moon
planetData.forEach(data => {
    const planetGeometry = new THREE.SphereGeometry(data.radius, 30, 30); // Radius, widthSegments, heightSegments
    const planetMaterial = new THREE.MeshStandardMaterial({ 
        map: textureLoader.load(data.texture),
        bumpMap: textureLoader.load(data.bumpTexture),
        bumpScale: 0.5,
        roughness: 0.5
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);

    // Adding shadows to the planets
    planet.castShadow = true;
    planet.receiveShadow = true;

    if(data.ring){
        const ringGeometry = new THREE.RingGeometry(
            data.ring.innerRadius, 
            data.ring.outerRadius, 
            128   // Increase the number of segments for smoother ring
        );

        if (data.name == 'saturn'){
            const asteroidRingMaterial = new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.7
            });

            const asteroidRingMesh = new THREE.Mesh(ringGeometry, asteroidRingMaterial);

            const numberOfAsteroids = 500;   // Adjust the number of asteroids as needed

            // Create a random number of asteroids
            for (let i = 0; i < numberOfAsteroids; i++) {
                const angle = Math.random() * Math.PI * 2;   // Random angle
                const distance = data.ring.outerRadius + Math.random() * 2; // Outer radius + random offset

                const asteroidGeometry = new THREE.SphereGeometry(0.1, 8, 8); // Radius, widthSegments, heightSegments
                const asteroidMaterial = new THREE.MeshStandardMaterial({ 
                    roughness: 0.5,
                });

                const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

                // Position the asteroid within the ring
                asteroid.position.set(distance * Math.cos(angle), distance * Math.sin(angle), 0); // x, y, z

                // Random rotation to make asteroids look more varied
                asteroid.rotation.x = Math.random() * Math.PI;
                asteroid.rotation.y = Math.random() * Math.PI;

                // Assign a random color to the asteroid
                const randomColor = asteroidColors[Math.floor(Math.random() * asteroidColors.length)];
                asteroid.material.color.set(randomColor);

                // Add the asteroid to the ring
                asteroidRingMesh.add(asteroid);
            }
        
            // Rotate the asteroid ring to be horizontal (around the X-axis)
            asteroidRingMesh.rotation.x = Math.PI / 3;   
            // Position the asteroid ring at the same location as the planet
            asteroidRingMesh.position.copy(planet.position);

            // Add the asteroid ring to the planet
            planet.add(asteroidRingMesh);
        }

        // Create a ring mesh
        const ringMaterial = new THREE.MeshStandardMaterial({
            map: textureLoader.load(data.ring.texture),
            roughness: 0.5, // Adjust this value for shininess
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9
        });

        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);

        // Adding shadows to the rings
        ringMesh.castShadow = true;
        ringMesh.receiveShadow = true;

        // Rotate the ring to be horizontal (around the X-axis)
        ringMesh.rotation.x = Math.PI / 3;
        // Position the ring at the same location as the planet
        ringMesh.position.copy(planet.position);

        // Add the ring to the planet
        planet.add(ringMesh);
    }
    // Set the planet's name
    planets.push(planet);

    //============================== Create orbit line
    
    const orbitLineGeometry = new THREE.BufferGeometry();

    // Create points along a circle
    const orbitPoints = [];

    // Increase the number of points for smoother lines
    for (let i = 0; i <= 360; i++) {
        const angle = (i * Math.PI) / 180;              // Convert degrees to radians
        const x = data.distance * Math.cos(angle);      // Calculate the x position
        const z = data.distance * Math.sin(angle) * (1 - data.eccentricity);      // Calculate the z position
        // Add the point to the array of points
        orbitPoints.push(x, 0, z);
    }

    // Add the points to the orbit line geometry
    orbitLineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));

    const orbitLineMaterial = new THREE.LineBasicMaterial({ 
        color: 0xffffff, 
        opacity: 0.1, 
        transparent: true 
    });
    const orbitLine = new THREE.Line(orbitLineGeometry, orbitLineMaterial);

    // Add the orbit line to the scene
    orbitLines.push(orbitLine);

    // Add the planet to the scene
    scene.add(planet, orbitLine);
});

// Index of Saturn in the planets array
const saturn = planets[5];

//================================================= Create moons

// Create a mesh for each moon
const moonData = [
    { // 0
        name: 'mimas',
        radius: 0.5,
        distance: 30,
        texture: mimasTexture,
        bumpTexture: mimasBumpmap,
        revolutionSpeed: 0.000002,
    },
    { // 1
        name: 'enceladus',
        radius: 0.5,
        distance: 50,
        texture: enceladusTexture,
        bumpTexture: encledusBumpmap,
        revolutionSpeed: 0.000182,
    },
    { // 2
        name: 'titan',
        radius: 0.5,
        distance: 60,
        texture: titanTexture,
        bumpTexture: titanBumpmap,
        revolutionSpeed: 0.000000001,
    },
];

// Array to store moon meshes
const moonMeshes = []; 

moonData.forEach(data => {

    // Create moons orbiting around Saturn
    const moonGeometry = new THREE.SphereGeometry(data.radius, 30, 30); // Radius, widthSegments, heightSegments
    const moonMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(data.texture),
        bumpMap: textureLoader.load(data.bumpTexture),
        bumpScale: 0.5,
        roughness: 0.5, // Adjust this value for shininess
    });

    const moon = new THREE.Mesh(moonGeometry, moonMaterial);

    // Add shadows to the moon
    moon.castShadow = true;
    moon.receiveShadow = true;

    // Position the moon at the same location as Saturn
    moon.position.set(data.distance, 0, 0);

    // Add the moon to Saturn
    saturn.add(moon);
    // Add moon mesh to the array
    moonMeshes.push(moon); 
});


// Animation loop to update positions and lighting
const animate = () => {

    // Call animate recursively
    requestAnimationFrame(animate);

    // Update sun light position
    sunLight.position.copy(sun.position);

    // Update planet positions, rotations, and emissive lighting
    planets.forEach((planet, index) => {

        // Calculate angle based on revolution speed
        const angle = Date.now() * planetData[index].revolutionSpeed;
        // Calculate x and z position based on distance and angle
        const x = planetData[index].distance * Math.cos(angle);
        const z = planetData[index].distance * Math.sin(angle) * (1 - planetData[index].eccentricity);

        // Set the position of the planet
        planet.position.set(x, 0, z);
        // Rotate planet around its own axis
        planet.rotation.y += 0.01; 

        // Calculate distance between planet and sun for intensity
        const distanceToSun = planet.position.distanceTo(sun.position);
        // Adjust this factor for desired intensity
        const intensity = 1 / (distanceToSun * distanceToSun); 

        // Update emissive lighting
        planet.material.emissiveIntensity = intensity;
    });

    // Update moon positions, rotations, and emissive lighting
    moonMeshes.forEach((moon, index) => {
        const angle = Date.now() * moonData[index].revolutionSpeed;
        const x = moonData[index].distance * Math.cos(angle);
        const z = moonData[index].distance * Math.sin(angle);
        moon.position.set(x, 0, z);
        moon.rotation.y += 0.01; // Rotate moon around its own axis

        // Calculate distance between moon and planet for intensity
        const distanceToPlanet = moon.position.distanceTo(saturn.position); // Update to respective planet
        const intensity = 1 / (distanceToPlanet * distanceToPlanet); // Adjust this factor for desired intensity

        moon.material.emissiveIntensity = intensity;
    });


    // Update camera position
    renderer.render(scene, camera);
};

// Call animate for the first time
animate();
