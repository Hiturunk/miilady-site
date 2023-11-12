import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CameraControl = ({ cameraPosition, fov, enablePanning, enableZoom }) => {
  const { camera, gl } = useThree();
  const orbitControlsRef = useRef();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    orbitControlsRef.current = controls;

    camera.position.set(...cameraPosition);
    camera.fov = fov;
    camera.updateProjectionMatrix();

    controls.target.set(0, 1, 0);
    controls.enablePan = enablePanning;
    controls.enableZoom = enableZoom;

    // Enable damping
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // Adjust vertical rotation limits for more flexibility
    controls.maxPolarAngle = Math.PI / 1.8; // Adjust as needed
    controls.minPolarAngle = Math.PI / 2.3; // Adjust as needed

    return () => controls.dispose();
  }, [camera, cameraPosition, fov, gl, enablePanning, enableZoom]);

  // Update controls every frame to apply damping
  useFrame(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.update();
    }
  });

  return null;
};

export default CameraControl;
