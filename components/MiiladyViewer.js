import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import MiiladyModel from '../components/utils3D/MiiladyModel';
import Controls from '../components/utils3D/MiiladyControls';
import { Reflector } from '@react-three/drei';  // Import the Reflector

const MiiladyViewer = ({
  fov = 1,
  models = [],
  cameraPosition = [0, 0, 5],
  targetPosition = [0, 1.2, 0],
}) => (
  <div style={{ position: 'relative', zIndex: 2, width: '100vw', height: '75vh' }}>
    <Canvas style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={3} color={'#8498ad'} />
      <directionalLight position={[5, 10, 20]} intensity={1} color={'#ffe4b5'} />
      <pointLight position={[20, 0, 20]} intensity={0.5} color={'#ffc3b5'} />
      <Controls fov={fov} cameraPosition={cameraPosition} targetPosition={targetPosition} />
      <Suspense fallback={null}>
        {models.map((model, index) => (
          <MiiladyModel key={index} url={model.url} position={model.position} rotation={model.rotation} />
        ))}

        {/* Add the mirror (Reflector) below the character */}
        <Reflector position={[0, 0.265, 0]} rotation={[-Math.PI / 2, 0, 0]} args={[10, 10]} resolution={512} >
          {(Material, props) => <Material color="#ffffff" metalness={1} roughness={0.5} {...props} />}
        </Reflector>
      </Suspense>
    </Canvas>
  </div>
);

export default MiiladyViewer;
