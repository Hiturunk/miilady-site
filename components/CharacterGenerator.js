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
  const [currentDirection, setCurrentDirection] = useState(null); // 'left' or 'right'


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

  const [rotationInterval, setRotationInterval] = useState(null);

  const startRotation = (direction) => {
    if (rotationInterval) clearInterval(rotationInterval);

    setCurrentDirection(direction); // Set the current direction

    const interval = setInterval(() => {
        setModels(prevModels => prevModels.map(model => ({
            ...model,
            rotation: [
                model.rotation[0],
                model.rotation[1] + (direction === 'right' ? 0.02 : -0.02),
                model.rotation[2]
            ]
        })));
    }, 10);

    setRotationInterval(interval);
};

  
const stopRotation = () => {
  if (rotationInterval) {
      clearInterval(rotationInterval);

      let delta = currentDirection === 'right' ? 0.02 : -0.02;
      const decelerationFactor = 0.95;

      const dampeningInterval = setInterval(() => {
          delta *= decelerationFactor;

          setModels(prevModels => prevModels.map(model => ({
              ...model,
              rotation: [
                  model.rotation[0],
                  model.rotation[1] + delta,
                  model.rotation[2]
              ]
          })));

          if (Math.abs(delta) < 0.0001) {
              clearInterval(dampeningInterval);
          }
      }, 10);

      setRotationInterval(null);
      setCurrentDirection(null); // Reset the direction state
  }
};


  

  return (
    <div>
      <MiiladyViewer className={styles.MiiladyViewer} fov={10} models={models} cameraPosition={[0, 0, 10]} targetPosition={[0, 1.1, 0]} />
      <Description traits={traits} />
      <div className={styles.buttonRotateContainer}>
      <button 
    onMouseDown={() => startRotation('left')} 
    onMouseUp={stopRotation} 
    onMouseLeave={stopRotation}
    className={styles.rotateButtonRight} 
>
    <img src="/icons/Icon_RightArrow.png" alt="Rotate Right" className={styles.icon} />
</button>

<button 
    onMouseDown={() => startRotation('right')} 
    onMouseUp={stopRotation} 
    onMouseLeave={stopRotation}
    className={styles.rotateButtonLeft}
>
    <img src="/icons/Icon_LeftArrow.png" alt="Rotate Left" className={styles.icon} />
</button>

</div>

      <div className={styles.buttonContainer}>
        <button onClick={generateCharacter} className={styles.footerRollButton}>🎲</button>
        <button onClick={mintCharacter} className={styles.footerMintButton}>✓</button>
      </div>
      <footer className={styles.footer}>
        <div className={styles.logoWrapper}>
          <Image src="/SVG/miilady_logo.svg" alt="Miilady Logo" className={styles.logo} width={100} height={100} />
        </div>
      </footer>
    </div>
  );
}

export default CharacterGenerator;