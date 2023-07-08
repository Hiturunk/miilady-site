import { Suspense, useRef } from 'react';
import { Canvas, useThree, extend, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const Model = ({ url, position, rotation }) => {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} position={position} rotation={rotation} />;
};


const Controls = ({ cameraPosition, targetPosition }) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  camera.position.set(...cameraPosition);

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(...targetPosition);
      controlsRef.current.update();
    }
  });

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      autoRotate={false}
      enableZoom={false}
      enablePan={true}
      enableRotate={true}
      enableDamping={true} // Enable dampening
      dampingFactor={0.02} // Dampening factor	  
      maxPolarAngle={Math.PI / 2} // Adjust to allow wider range
      minPolarAngle={Math.PI / 4} // Adjust to allow wider range
    />
  );
};


const MiiladyViewer = ({ fov = 1, modelPosition = [0, 0, 0], modelRotation = [0, 0, 0], cameraPosition = [0, 0, 5], targetPosition = [0, 1.2, 0] }) => (
  <Canvas style={{ width: '80vw', height: '60vh' }}>
    <ambientLight intensity={0.75} />
    <Controls cameraPosition={cameraPosition} targetPosition={targetPosition} />
    <Suspense fallback={null}>
      <Model url="/3D/miilady_demo.gltf" position={modelPosition} rotation={modelRotation} />
    </Suspense>
  </Canvas>
);

export default MiiladyViewer;
