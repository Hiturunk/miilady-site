// CharacterGenerator.js 

import { useEffect, useState } from 'react';
import Description from '../components/Description';
import MiiladyViewer from '../components/MiiladyViewer';
import styles from '../styles/Home.module.css';

function CharacterGenerator() {
  const [traits, setTraits] = useState([]);

  const generateCharacter = async () => {
    const response = await fetch('/api/traits');
    const newTraits = await response.json();
    setTraits(newTraits);
  };

  useEffect(() => {
    generateCharacter();
  }, []);

  return (
    <div>
	  <MiiladyViewer fov={18} modelPosition={[0, 0.25, 0]} modelRotation={[Math.PI / 0.5, 1.5708, 0]} cameraPosition={[0, 0, 6]} targetPosition={[0, 1.1, 0]} />
      <Description traits={traits} />
      <button onClick={generateCharacter}>Regenerate Character</button>
    </div>
  );
}

export default CharacterGenerator;