//MiiladyViewer
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import MiiladyModel from '../components/utils3D/MiiladyModel';
import Controls from '../components/utils3D/MiiladyControls';

const MiiladyViewer = ({
  fov = 1,
  models = [],
  cameraPosition = [0, 0, 5],
  targetPosition = [0, 1.2, 0],
}) => (
  <Canvas style={{ width: '100vw', height: '75vh' }}>
    <ambientLight intensity={0.75} />
    <Controls fov={fov} cameraPosition={cameraPosition} targetPosition={targetPosition} />
    <Suspense fallback={null}>
      {models.map((model, index) => (
        <MiiladyModel key={index} url={model.url} position={model.position} rotation={model.rotation} />
      ))}
    </Suspense>
  </Canvas>
);

export default MiiladyViewer;
