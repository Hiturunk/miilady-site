import React from 'react';
import styles from '../styles/Home.module.css';

type Trait = {
  description: string;
}

type DescriptionProps = {
  traits: Trait[];
}

const Description: React.FC<DescriptionProps> = ({traits}) => {
  if (traits.length === 0) {
    return <div className={styles.Description}>No traits received.</div>;
  }

  return (
    <div className={styles.Description}>
      {traits.map((trait, index) => (
        <div key={index}>
          {trait.description}
        </div>
      ))}
    </div>
  );
};

export default Description;
