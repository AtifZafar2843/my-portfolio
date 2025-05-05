// Three.js implementation for the animated 3D cube
class Cube {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.cube = null;
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.animationFrameId = null;
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.getElementById('cube-container').appendChild(this.renderer.domElement);

        // Create cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.8,
            shininess: 100,
            wireframe: true
        });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00ff88,
            transparent: true,
            opacity: 0.5
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00ff88, 1);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);

        // Add mouse move event listener
        document.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX - this.windowHalfX);
            this.mouseY = (event.clientY - this.windowHalfY);
        });

        // Start animation
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(() => this.animate());

        // Smooth mouse movement
        this.targetX = this.mouseX * 0.001;
        this.targetY = this.mouseY * 0.001;

        // Rotate cube
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        // Add mouse interaction
        this.cube.rotation.x += (this.targetY - this.cube.rotation.x) * 0.05;
        this.cube.rotation.y += (this.targetX - this.cube.rotation.y) * 0.05;

        // Animate particles
        this.particles.rotation.x += 0.0005;
        this.particles.rotation.y += 0.0005;

        // Render scene
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        // Update window half sizes
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        // Update camera aspect ratio
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        // Update renderer size
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    destroy() {
        // Clean up resources
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.domElement.remove();
        }

        if (this.cube) {
            this.cube.geometry.dispose();
            this.cube.material.dispose();
        }

        if (this.particles) {
            this.particles.geometry.dispose();
            this.particles.material.dispose();
        }

        document.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('resize', () => this.onWindowResize());
    }
}

// Initialize cube when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cube = new Cube();
    cube.init();
}); 