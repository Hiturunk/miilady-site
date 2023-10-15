// pages/index.tsx
import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import CharacterGenerator from '../components/CharacterGenerator';

const Home: NextPage = () => {
  const [traits, setTraits] = useState([]);

  const generateCharacter = async () => {
    alert('Generating a new character...');
    // Example logic for API call:
    // const response = await fetch('/api/traits');
    // const newTraits = await response.json();
    // setTraits(newTraits);
  };

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
      <CharacterGenerator traits={traits} />
      </main>
	
    </div>
  );
};

export default Home;
