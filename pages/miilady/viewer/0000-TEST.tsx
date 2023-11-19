import React, { Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import styles from '/styles/ModelViewer.module.css';
import * as THREE from 'three';

function Model() {
  const model = useGLTF('/NFT/0000-TEST/0000-ANIMATED.gltf');
  const modelRef = useRef<THREE.Object3D>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);

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

function CameraController() {
  const { camera } = useThree(); // Now used within the Canvas scope

  const cameraPosition = useMemo(() => [0, 1, 2], []);
  const fov = 50;

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fov;
      camera.position.set(...cameraPosition);
      camera.updateProjectionMatrix();
    }
  }, [camera, fov, cameraPosition]);

  return <OrbitControls 
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={1}
            target={[0, 1, 0]}
         />;
}

export default function Viewer() {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className={styles.viewerContainer}>
      {loading && <div className={styles.loadingText}>Loading...</div>}
      <Canvas className={styles.canvas} onCreated={() => setLoading(false)}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <CameraController />
      </Canvas>
    </div>
  );
}
