// pages/three.tsx
import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import CharacterGenerator from '../components/CharacterGenerator';
import ThreeScene from '../components/ThreeScene'; // Import the new component

const Home: NextPage = () => {
  const [traits, setTraits] = useState([]);

  const mintFunction = () => {
    alert('Mint Button is clicked');
  };

  return (
    <div className={`${styles.container} ${styles.gradientBackground}`}>
      <Head>
        <title>Miilady Site</title>
        <meta content="Miilady NFT Minting Site" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ThreeScene /> {/* Add the component to your main content */}
      </main>
      
    </div>
  );
};

export default Home;
