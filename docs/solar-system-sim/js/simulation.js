
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

let sunGeometry = new THREE.SphereGeometry(2, 32, 32);
let sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
let sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

let planets = [];
let planetData = [
  { name: 'Mercury', color: 0xaaaaaa, dist: 4, size: 0.2, speed: 0.04 },
  { name: 'Venus', color: 0xffaa00, dist: 6, size: 0.3, speed: 0.015 },
  { name: 'Earth', color: 0x00aaff, dist: 8, size: 0.35, speed: 0.01 },
  { name: 'Mars', color: 0xff3300, dist: 10, size: 0.25, speed: 0.008 },
  { name: 'Jupiter', color: 0xffcc99, dist: 14, size: 0.9, speed: 0.002 },
  { name: 'Saturn', color: 0xffffcc, dist: 18, size: 0.7, speed: 0.0015 },
  { name: 'Uranus', color: 0x99ccff, dist: 22, size: 0.5, speed: 0.001 },
  { name: 'Neptune', color: 0x3366ff, dist: 26, size: 0.5, speed: 0.0009 }
];

planetData.forEach((data) => {
  let geometry = new THREE.SphereGeometry(data.size, 32, 32);
  let material = new THREE.MeshBasicMaterial({ color: data.color });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = data.dist;
  mesh.userData = data;
  scene.add(mesh);
  planets.push({ mesh, angle: Math.random() * Math.PI * 2, speed: data.speed, dist: data.dist });
});

camera.position.z = 35;

function animate() {
  requestAnimationFrame(animate);
  planets.forEach(p => {
    p.angle += p.speed;
    p.mesh.position.x = Math.cos(p.angle) * p.dist;
    p.mesh.position.z = Math.sin(p.angle) * p.dist;
  });
  renderer.render(scene, camera);
}
animate();
