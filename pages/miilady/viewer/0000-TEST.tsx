import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import styles from '/styles/ModelViewer.module.css'; // adjust the path as necessary

function Model() {
  const model = useGLTF('/NFT/0000-TEST/0000.gltf');
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      const xRotation = 0; // e.g., Math.PI / 2 for 90 degrees
      const yRotation = 1.6; // e.g., Math.PI for 180 degrees
      const zRotation = 0; // e.g., Math.PI / 4 for 45 degrees
  
      modelRef.current.rotation.set(xRotation, yRotation, zRotation);
    }
  }, [model]);

  return <primitive object={model.scene} ref={modelRef} />;
}

export default function Viewer() {
  const cameraRef = useRef();
  const controlsRef = useRef();
  
  // Adjust these values as needed for your model
  const cameraPosition = [0, 1, 2]; // This sets the distance of the camera from the model
  const fov = 50; // Field of view

  return (
    <div className={styles.viewerContainer}>
      <Canvas 
        className={styles.canvas} 
        camera={{ 
          fov: fov,
          position: cameraPosition, 
          ref: cameraRef 
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
          maxPolarAngle={Math.PI / 1.5} // Limit the vertical rotation to the upper hemisphere
          minPolarAngle={1}            // Prevent the camera from going below the horizon
          target={[0, 0.8, 0]} 
        />
      </Canvas>
    </div>
  );
}
