import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import MiiladyModel from '../components/utils3D/MiiladyModel';
import Controls from '../components/utils3D/MiiladyControls';

const MiiladyViewer = ({
  fov = 2,
  models = [],
  cameraPosition = [0, 0, 5],
  targetPosition = [0, 1.2, 0],
}) => {
  const [dpr, setDpr] = useState([1, 1]);

  useEffect(() => {
    setDpr([0.5, 0.5]);
    return () => {
        console.log("MiiladyViewer is being unmounted.");
    };
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 2, width: '100vw', height: '75vh' }}>
      <Canvas 
        style={{ width: '100%', height: '100%' }}
        dpr={dpr}
      >
        <ambientLight intensity={3} color={'#8498ad'} />
        <directionalLight position={[5, 10, 20]} intensity={1} color={'#ffe4b5'} />
        <pointLight position={[20, 0, 20]} intensity={0.5} color={'#ffc3b5'} />
        <Controls fov={fov} cameraPosition={cameraPosition} targetPosition={targetPosition} />
        <Suspense fallback={null}>
          {models.map((model, index) => (
            <MiiladyModel key={index} url={model.url} position={model.position} rotation={model.rotation} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MiiladyViewer;
