import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import Description from '../components/Description';
import MiiladyViewer from './utils3D/MiiladyViewer';
import styles from '../styles/Home.module.css';
import { LoadingQueueProvider } from '../components/LoadingQueueContext';
import MintConfirmation from '../components/MintConfirmation'; // Import the new component


const mintCharacter = () => {
  alert("Mint button has been pressed");
};

function CharacterGenerator() {
  const [cameraPosition, setCameraPosition] = useState([4, 0, 8]);
  const targetPosition = [0, 5, 0]; // Set the target position for the camera
  const [traits, setTraits] = useState([]);
  const [currentTraits, setCurrentTraits] = useState([]); // New state to store the current traits
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showMintConfirmation, setShowMintConfirmation] = useState(false);

  const mintCharacter = () => {
    setShowMintConfirmation(true); // Show the mint confirmation window
  };

  const closeMintConfirmation = () => {
    setShowMintConfirmation(false); // Close the mint confirmation window
  };

//HANDLE 3D FILE GENERATIONS WIP
const onCreate = async () => {
  try {
    // Send the current traits to the character creator API
    const createResponse = await fetch('/api/createCharacter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ traits: currentTraits }),
    });

    if (!createResponse.ok) {
      throw new Error('Failed to create character');
    }

    const createData = await createResponse.json();
    console.log(createData.message);
  } catch (error) {
    console.error('Error creating character:', error);
  }
};

  //3D GENERATIONS END

  const generateCharacter = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/traits');
      const newTraits = await response.json();
      setTraits(newTraits);
      setCurrentTraits(newTraits); // Update the currentTraits state
  
      // Log the fetched traits
      console.log("Fetched traits:", newTraits);
  
      setLoading(false);
    } catch (error) {
      console.error("Error fetching traits:", error);
      setLoading(false);
    }
  };
  

  const debouncedGenerateCharacter = debounce(generateCharacter, 100);

  useEffect(() => {
    // Fetch traits on component mount
    generateCharacter();
  }, []);

  useEffect(() => {
    // Update models when traits change
    const defaultPosition = [0, 0, 0];
    const newModels = traits.map(trait => ({
      url: `/3D/${trait.model_name}`,
      position: defaultPosition
    }));
    setModels(newModels);
  }, [traits]); // Only re-run the effect if traits changes

  return (
    <LoadingQueueProvider>
      <div>
        {loading && <span className={styles.loadingIndicator}>Loading...</span>}
        {showMintConfirmation && <MintConfirmation onClose={closeMintConfirmation} onCreate={onCreate} />}

       <MiiladyViewer
        className={styles.MiiladyViewer}
        fov={13}
        models={models}
        cameraPosition={cameraPosition}
        targetPosition={targetPosition} // Use targetPosition instead of cameraRotation
      />

        <Description traits={traits} />

        <div className={styles.buttonContainer}>
          <button 
            onClick={debouncedGenerateCharacter} 
            className={styles.footerRollButton}
            disabled={loading}
          >Roll</button>
          <button 
            onClick={mintCharacter} 
            className={styles.footerMintButton}
          >Mint</button>
        </div>
      </div>
    </LoadingQueueProvider>
  );
}

export default CharacterGenerator;
