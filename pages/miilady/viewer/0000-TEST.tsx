import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import styles from '/styles/ModelViewer.module.css'; // adjust the path as necessary
import * as THREE from 'three';

function Model() {
  const model = useGLTF('/NFT/0000-TEST/0000-ANIMATED.gltf');
  const modelRef = useRef<THREE.Object3D>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null); // Correct type for mixer

  useEffect(() => {
    if (modelRef.current) {
      // Set initial rotation
      const xRotation = 0; 
      const yRotation = 1.6;
      const zRotation = 0;
      modelRef.current.rotation.set(xRotation, yRotation, zRotation);

      // Animation setup
      mixer.current = new THREE.AnimationMixer(modelRef.current);
      if (model.animations.length > 0) {
        const action = mixer.current.clipAction(model.animations[0]);
        action.play();
      }
    }
  }, [model]);

  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={model.scene} ref={modelRef} />;
}

export default function Viewer() {
  // Using React.ComponentProps to get the correct type for OrbitControls ref
  const controlsRef = useRef<React.ComponentProps<typeof OrbitControls>>(null);

  const cameraPosition: [number, number, number] = [0, 1, 2]; // Camera position as a tuple
  const fov = 50; // Field of view

  return (
    <div className={styles.viewerContainer}>
      <Canvas 
        className={styles.canvas} 
        camera={{ 
          fov: fov,
          position: cameraPosition
        }}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls 
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={1}
          target={[0, 1, 0]} 
        />
      </Canvas>
    </div>
  );
}