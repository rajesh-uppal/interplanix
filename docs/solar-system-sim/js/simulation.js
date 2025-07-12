let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Info Panel
const infoBox = document.createElement('div');
infoBox.style.position = 'absolute';
infoBox.style.top = '20px';
infoBox.style.left = '20px';
infoBox.style.background = 'rgba(0,0,0,0.7)';
infoBox.style.color = 'white';
infoBox.style.padding = '10px';
infoBox.style.borderRadius = '8px';
infoBox.style.display = 'none';
infoBox.style.zIndex = 1000;
document.body.appendChild(infoBox);

// Sun
const sun = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
scene.add(sun);

// Planet data
const planetData = [
  { name: 'Mercury', color: 0xaaaaaa, dist: 4, size: 0.2, speed: 0.04, orbit: 88, moons: 0 },
  { name: 'Venus', color: 0xffaa00, dist: 6, size: 0.3, speed: 0.015, orbit: 225, moons: 0 },
  { name: 'Earth', color: 0x00aaff, dist: 8, size: 0.35, speed: 0.01, orbit: 365, moons: 1 },
  { name: 'Mars', color: 0xff3300, dist: 10, size: 0.25, speed: 0.008, orbit: 687, moons: 2 },
  { name: 'Jupiter', color: 0xffcc99, dist: 14, size: 0.9, speed: 0.002, orbit: 4333, moons: 95 },
  { name: 'Saturn', color: 0xffffcc, dist: 18, size: 0.7, speed: 0.0015, orbit: 10759, moons: 145 },
  { name: 'Uranus', color: 0x99ccff, dist: 22, size: 0.5, speed: 0.001, orbit: 30687, moons: 27 },
  { name: 'Neptune', color: 0x3366ff, dist: 26, size: 0.5, speed: 0.0009, orbit: 60190, moons: 14 }
];

let planets = [];
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

// Label helper
function createLabel(text, color) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    ctx.fillStyle = '#' + color.toString(16).padStart(6, '0');
    ctx.font = '28px Arial';
    ctx.fillText(text, 10, 40);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(2, 0.5, 1);
    return sprite;
}

// Build planets and labels
planetData.forEach(data => {
    const geometry = new THREE.SphereGeometry(data.size, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: data.color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = data.dist;

    // Label
    const label = createLabel(data.name, data.color);
    label.position.set(data.dist, data.size + 0.5, 0);

    // Group planet + label
    mesh.userData = data;
    label.userData = data;

    scene.add(mesh);
    scene.add(label);

    planets.push({
        mesh,
        label,
        angle: Math.random() * Math.PI * 2,
        speed: data.speed,
        dist: data.dist,
        size: data.size
    });
});

camera.position.z = 35;

// Animation
function animate() {
    requestAnimationFrame(animate);
    planets.forEach(p => {
        p.angle += p.speed;
        const x = Math.cos(p.angle) * p.dist;
        const z = Math.sin(p.angle) * p.dist;
        p.mesh.position.set(x, 0, z);
        p.label.position.set(x, p.size + 0.5, z);
        p.label.lookAt(camera.position);
    });
    renderer.render(scene, camera);
}
animate();

// Handle click
window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(planets.map(p => p.mesh).concat(planets.map(p => p.label)));
    if (intersects.length > 0) {
        const data = intersects[0].object.userData;
        infoBox.innerHTML = `<strong>${data.name}</strong><br>
                             Distance from Sun: ${data.dist} AU<br>
                             Orbital Period: ${data.orbit} days<br>
                             Moons: ${data.moons}`;
        infoBox.style.display = 'block';
    } else {
        infoBox.style.display = 'none';
    }
});
