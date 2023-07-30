//getTraits.js
import { traits } from 'components/traits.json';

export async function getTrait() {
  // Ensure traits is loaded
  if (!traits) {
    throw new Error("Traits not loaded!");
  }

  // Get unique trait types
  const traitTypes = [...new Set(traits.map(item => item.type))];

  let chosenTraits = [];

  for(let type of traitTypes) {
    // Filter traits of current type
    let traitsOfType = traits.filter(trait => trait.type === type);

    // Normalize probabilities: compute sum of all probabilities
    let probSum = traitsOfType.reduce((acc, trait) => acc + trait.probability, 0);

    // Generate a random number between 0 (non-inclusive) and the sum of probabilities (non-inclusive)
    let randNum;
    do {
        randNum = Math.random() * probSum;
    } while(randNum === 0 || randNum === probSum);

    let cumulativeProb = 0;
    for(let i = 0; i < traitsOfType.length; i++) {
        cumulativeProb += traitsOfType[i].probability;
        if(randNum <= cumulativeProb) {
            // We've found our trait
            chosenTraits.push(traitsOfType[i]);
            break;
        }
    }
  }

  // Combine the names of chosen traits into a single string
  const traitNamesString = chosenTraits.map(trait => trait.name).join(", ");
  
  // Log the traits in a single message
  console.log(`Chosen traits: ${traitNamesString}`);

  // Return the chosen traits
  return chosenTraits;
}
