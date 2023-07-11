// CharacterGenerator.js 

import { useEffect, useState } from 'react';
import Description from '../components/Description';
import MiiladyViewer from '../components/MiiladyViewer';
import styles from '../styles/Home.module.css';

function CharacterGenerator() {
  const [traits, setTraits] = useState([]);
  const [models, setModels] = useState([]);

  const generateCharacter = async () => {
    const response = await fetch('/api/traits');
    const newTraits = await response.json();
    setTraits(newTraits);
  };

  useEffect(() => {
    generateCharacter();
  }, []);

  // This will run whenever `traits` changes
  useEffect(() => {
    // For now we'll just set every model at the same position and rotation, 
    // you might want to update this to position your models correctly in the scene
    const defaultPosition = [0, 0.25, 0];
    const defaultRotation = [Math.PI / 0.5, 1.5708, 0];

    // Create a new models array by mapping over traits
    const newModels = traits.map(trait => ({
      url: `/3D/${trait.model_name}`,
      position: defaultPosition,
      rotation: defaultRotation,
    }));

    // Update the models state
    setModels(newModels);
  }, [traits]);

  return (
    <div>
      <MiiladyViewer fov={18} models={models} cameraPosition={[0, 0, 6]} targetPosition={[0, 1.1, 0]} />
      <Description traits={traits} />
      <button onClick={generateCharacter}>Regenerate Character</button>
    </div>
  );
}

export default CharacterGenerator;
