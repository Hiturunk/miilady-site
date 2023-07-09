import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const MiiladyModel = ({ url, position, rotation }) => {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} position={position} rotation={rotation} />;
};

export default MiiladyModel;