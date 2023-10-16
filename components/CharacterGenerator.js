// CharacterGenerator.js 

import { useEffect, useState } from 'react';
import Description from '../components/Description';
import MiiladyViewer from '../components/MiiladyViewer';
import styles from '../styles/Home.module.css';
import Image from 'next/image';


const mintCharacter = () => {
  alert("Mint button has been pressed");
};

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
        <MiiladyViewer fov={10} models={models} cameraPosition={[0, 0, 10]} targetPosition={[0, 1.1, 0]} />
        <Description traits={traits} />
        <div className={styles.buttonContainer}>
            <button onClick={generateCharacter} className={styles.footerRollButton}>🎲</button>
            <button onClick={mintCharacter} className={styles.footerMintButton}>✓</button>
        </div>
        <footer className={styles.footer}>
            {/* Miilady Logo added to the footer */}
            <div className={styles.logoWrapper}>
              <Image src="/SVG/miilady_logo.svg" alt="Miilady Logo" className={styles.logo} width={100} height={100} />
            </div>
            
            {/* Other footer content, if any, can be placed here */}
        </footer>
    </div>
);
}

export default CharacterGenerator;
