// CharacterGenerator.js 

import { useEffect, useState } from 'react';
import Description from '../components/Description';

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
      <Description traits={traits} />
      <button onClick={generateCharacter}>Regenerate Character</button>
    </div>
  );
}

export default CharacterGenerator;