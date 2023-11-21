import React from 'react';
import styles from '../styles/MintConfirmation.module.css';

// Define the types for your component's props
interface MintConfirmationProps {
  onClose: () => void; // Assuming it's a function that returns nothing
  onCreate: () => void; // Same assumption
}

const MintConfirmation = ({ onClose, onCreate }: MintConfirmationProps) => {
  return (
    <div className={styles.mintConfirmationContainer}>
      <div className={styles.mintConfirmationContent}>
        <h2>Mint Confirmation</h2>
        {/* Additional content */}
        <div className={styles.buttonContainer}>
          <button onClick={onCreate} className={styles.createButton}>Create 3D Files</button>
          <button onClick={onClose} className={styles.closeButton}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default MintConfirmation;
