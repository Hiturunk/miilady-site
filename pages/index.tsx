import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/Home.module.css';
import CharacterGenerator from '../components/CharacterGenerator'; // Assuming CharacterGenerator is in the same directory

const rollFunction = () => {
   alert('Roll Button is clicked');
}

const mintFunction = () => {
   alert('Mint Button is clicked');
}

const Home: NextPage = () => {
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
    </div>
  );
};

export default Home;
