// components/InformationWindow.tsx
import React from 'react';
import Draggable from 'react-draggable';
import styles from '/styles/Home.module.css'; // Make sure to create this CSS module

type InformationWindowProps = {
  text: string;
  onClose: () => void;
}

const InformationWindow: React.FC<InformationWindowProps> = ({ text, onClose }) => (
  <Draggable handle={`.${styles.handle}`}>
    <div className={styles.window}>
      <div className={styles.handle}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
      </div>
      <div className={styles.content}>
        {text}
      </div>
    </div>
  </Draggable>
);

export default InformationWindow;
