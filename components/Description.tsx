import React from 'react';
import styles from '../styles/Home.module.css';

type Trait = {
  description: string;
}

type DescriptionProps = {
  traits: Trait[];
}

const Description: React.FC<DescriptionProps> = ({traits}) => {
  const traitList = traits.length > 0 ? traits.map(trait => trait.description).join("") : "No traits received.";

  return (
    <div className={styles.Description}>
      {traitList}
    </div>
  );
};

export default Description;
