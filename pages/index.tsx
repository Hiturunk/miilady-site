import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/Home.module.css';
import MiiladyViewer from '../components/MiiladyViewer';




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
        {/* Other content goes here */}
		<MiiladyViewer fov={50} modelPosition={[0, 0.1, 0]} modelRotation={[Math.PI / 0.5, 1.5708, 0]} cameraPosition={[0, 2, 1.2]} targetPosition={[0, 1.1, 0]} />
      </main>
    </div>
  );
};

export default Home;
