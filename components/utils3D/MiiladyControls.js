//MiiladyControls.js
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as OC } from '@react-three/drei';

const MiiladyControls = ({ cameraPosition, targetPosition, fov = 20 }) => {
  const controlsRef = useRef();
  const { camera, gl } = useThree();

  camera.position.set(...cameraPosition);

  useEffect(() => {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [fov, camera]);

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(...targetPosition);
      controlsRef.current.update();
    }
  });

  return (
    <OC
      ref={controlsRef}
      args={[camera, gl.domElement]}
      autoRotate={false}
      enableZoom={false}
      enablePan={true}
      enableRotate={true}
      enableDamping={true}
      dampingFactor={0.04}
      maxPolarAngle={Math.PI / 2.1}
      minPolarAngle={Math.PI / 4}
    />
  );
};

export default MiiladyControls;