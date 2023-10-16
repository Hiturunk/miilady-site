// components/ThreeScene.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const ThreeScene: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        containerRef.current.appendChild(renderer.domElement);

        // Add a cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Camera position
        camera.position.z = 5;

        // Orbit Controls (optional)
        const controls = new OrbitControls(camera, renderer.domElement);

        // Window resize handler
        const onWindowResize = () => {
            const newWidth = containerRef.current.clientWidth;
            const newHeight = containerRef.current.clientHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(newWidth, newHeight);
        };

        // Animation
        const animate = () => {
            cube.rotation.x += 0.01;   // Rotate cube
            cube.rotation.y += 0.01;

            cube.position.x += 0.005;  // Move cube
            if (cube.position.x > 5) {
                cube.position.x = -5;
            }

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        animate();

        // Add event listeners
        window.addEventListener('resize', onWindowResize);

        return () => {
            // Cleanup
            window.removeEventListener('resize', onWindowResize);
            scene.remove(cube);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>
    );
}

export default ThreeScene;
