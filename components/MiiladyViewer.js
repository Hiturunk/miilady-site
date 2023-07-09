import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import MiiladyModel from '../components/utils3D/MiiladyModel';
import Controls from '../components/utils3D/MiiladyControls';

const MiiladyViewer = ({
  fov = 1,
  modelPosition = [0, 0, 0],
  modelRotation = [0, 0, 0],
  cameraPosition = [0, 0, 5],
  targetPosition = [0, 1.2, 0],
}) => (
  <Canvas style={{ width: '100vw', height: '75vh' }}>
    <ambientLight intensity={0.75} />
    <Controls fov={fov} cameraPosition={cameraPosition} targetPosition={targetPosition} />
    <Suspense fallback={null}>
      <MiiladyModel url="/3D/miilady_demo.gltf" position={modelPosition} rotation={modelRotation} />
    </Suspense>
  </Canvas>
);

export default MiiladyViewer;