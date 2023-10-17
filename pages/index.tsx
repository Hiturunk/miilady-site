// pages/index.tsx
import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import CharacterGenerator from '../components/CharacterGenerator';

// Console log the imported components/functions
console.log("CharacterGenerator:", CharacterGenerator);

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
      <CharacterGenerator />
      </main>
	
    </div>
  );
};

export default Home;
