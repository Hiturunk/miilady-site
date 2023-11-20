import React from 'react';
import styles from '../styles/MintConfirmation.module.css'; // Import or define your styles


const MintConfirmation = ({ onClose, onCreate }) => {
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
