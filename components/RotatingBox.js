import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { useRef } from 'react';
import { useGesture } from 'react-use-gesture';
import * as THREE from 'three';

function RotatingBox() {
  const boxRef = useRef();
  const rotation = useRef([0, 0]);

  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      rotation.current = [y / 50, x / 50];
    },
  });

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x = THREE.MathUtils.lerp(boxRef.current.rotation.x, rotation.current[0], 0.1);
      boxRef.current.rotation.y = THREE.MathUtils.lerp(boxRef.current.rotation.y, rotation.current[1], 0.1);
    }
  });

  return (
    <Box ref={boxRef} {...bind()}>
      <meshStandardMaterial color={'orange'} />
    </Box>
  );
}

export default function ThreejsPage() {
  return (
    <div style={{ width: '80vw', height: '80vh' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <RotatingBox />
      </Canvas>
    </div>
  );
}
