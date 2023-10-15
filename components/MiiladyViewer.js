import React, { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import MiiladyModel from '../components/utils3D/MiiladyModel';
import Controls from '../components/utils3D/MiiladyControls';

import { MeshPhysicalMaterial, BoxGeometry, Mesh, Color, EquirectangularReflectionMapping } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { useThree } from '@react-three/fiber';
import { NormalBlending } from 'three';
import { EffectComposer, ScreenSpaceReflection } from '@react-three/postprocessing';

const useEnvironmentMap = (hdrPath) => {
  const { scene } = useThree();
  const [envMap, setEnvMap] = useState(null);

  useEffect(() => {
    new RGBELoader().load(hdrPath, (texture) => {
      texture.mapping = EquirectangularReflectionMapping;
      setEnvMap(texture);
     // scene.background = texture; // Optional: Set it as the scene's background too.
    });
  }, [hdrPath, scene]);

  return envMap;
};

const Effects = () => {
  const { gl, scene, camera, size } = useThree();
  
  return (
    <EffectComposer>
      <ScreenSpaceReflection
        blendFunction={NormalBlending} // blend mode without THREE prefix
        // adjust these parameters based on your needs
        resolutionScale={0.5}
        distanceThreshold={0.01}
        distanceFade={0.01}
        metalness={0.5}
        roughness={0.5}
        metalnessScale={0.5}
        roughnessScale={0.5}
      />
    </EffectComposer>
  );
}



const ReflectivePlane = () => {
  const envMap = useEnvironmentMap('/HDR/empty_warehouse_01_2k.hdr'); // Adjust the path to point to your HDR file.
  
  const reflectiveMaterial = new MeshPhysicalMaterial({
    color: new Color(0xffffff),
    roughness: 0.25,
    metalness: 0.5,
    envMapIntensity: 1.5,
    envMap: envMap // Add this line
  });

  const planeGeometry = new BoxGeometry(2, 0.1, 2);

  return <mesh material={reflectiveMaterial} geometry={planeGeometry} position-y={0.20} />;
};

const MiiladyViewer = ({
  fov = 1,
  models = [],
  cameraPosition = [0, 0, 5],
  targetPosition = [0, 1.2, 0],
}) => (
  <div style={{ position: 'relative', zIndex: 2, width: '100vw', height: '75vh' }}>
    <Canvas style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={1} color={'#8498ad'} />
      <directionalLight position={[5, 10, 20]} intensity={1} color={'#ffe4b5'} />
      <pointLight position={[20, 0, 20]} intensity={0.5} color={'#ffc3b5'} />
      <Controls fov={fov} cameraPosition={cameraPosition} targetPosition={targetPosition} />
      <Suspense fallback={null}>
        {models.map((model, index) => (
          <MiiladyModel key={index} url={model.url} position={model.position} rotation={model.rotation} />
        ))}
      </Suspense>
      <ReflectivePlane />
      <Effects />
    </Canvas>
  </div>
);

export default MiiladyViewer;
