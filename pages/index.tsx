// pages/index.tsx
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import CharacterGenerator from '../components/CharacterGenerator';
import { LoadingQueueProvider, useLoadingQueue } from '../components/LoadingQueueContext'; // Adjust the path based on your project structure


// Console log the imported components/functions
console.log("CharacterGenerator:", CharacterGenerator);

const Home: NextPage = () => {
  const [traits, setTraits] = useState([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true); // New state for music control

  const mintFunction = () => {
    alert('Mint Button is clicked');
  };

  useEffect(() => {
    const audioElement = document.getElementById("background-music") as HTMLAudioElement;

    if (isMusicPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [isMusicPlaying]);  

  return (
    <div className={`${styles.container} ${styles.gradientBackground}`}>
      <Head>
        <title>Miilady Site</title>
        <meta content="Miilady NFT Minting Site" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

        {/* Music button */}
        <button 
        className={styles.musicButton} 
        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        style={{ position: 'absolute', top: '10px', right: '10px' }}>
        {isMusicPlaying ? 'Mute' : 'Play'}
      </button>

      {/* Background music */}
      <audio id="background-music" src="/sounds/00000000000.ogg" loop autoPlay></audio>    
	  
      <main className={styles.main}>
      <LoadingQueueProvider> 
      <CharacterGenerator />
      </LoadingQueueProvider> 
      </main>
	
    </div>
  );
};

export default Home;
