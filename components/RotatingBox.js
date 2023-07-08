import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { useRef } from 'react';

function RotatingBox() {
  const boxRef = useRef();

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.01;
      boxRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Box ref={boxRef}>
      <meshStandardMaterial color={'orange'} />
    </Box>
  );
}

export default function ThreejsPage() {
  return (
    <div style={{ width: '80vw', height: '80vh' }}>
      <Canvas>
        <ambientLight />
        <RotatingBox />
      </Canvas>
    </div>
  );
}
