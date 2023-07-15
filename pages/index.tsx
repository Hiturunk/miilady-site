// pages/index.tsx
import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/Home.module.css';
import CharacterGenerator from '../components/CharacterGenerator';
import InformationWindow from '../components/InformationWindow';

const rollFunction = () => {
  alert('Roll Button is clicked');
}

const mintFunction = () => {
  alert('Mint Button is clicked');
}

const Home: NextPage = () => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfoWindow = () => {
    setShowInfo(!showInfo);
  }

  return (
    <div className={`${styles.container} ${styles.gradientBackground}`}>
      <Head>
        <title>Miilady Site</title>
        <meta content="Miilady NFT Minting Site" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
	  
      <div className={styles.logoWrapper}>
        <Image src="/SVG/miilady_logo.svg" alt="Logo" className={styles.logo} width={800} height={800} />
      </div>

      <div className={styles.buttonWrapper}>
        <ConnectButton />
      </div>

      <main className={styles.main}>
        <CharacterGenerator />
      </main>

      <button className={styles.infoButton} onClick={toggleInfoWindow} aria-label="Information">ℹ️</button>
      {showInfo && <InformationWindow text="Introducing Miilady! Dive into the maximalist metaverse of Miilady, where cel-shaded neochibi are imbued with Netspi energy. Inspired by Harajuku Street Style and crafted by state-of-the-art Neochibi render farms in Shenzhen, China. These lovepilled characters are digitally delivered as VRM, FBX, GLTF formats. Effortlessly merge high-tech with high fashion. Miilady is more than a project—it's a revolution, transforming users into digital pioneers who bring Harajuku's vibrant chaos into the metaverse. PLACEHOLDER" onClose={toggleInfoWindow} />}
    </div>
  );
};

export default Home;
