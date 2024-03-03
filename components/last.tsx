// components/LastSection.js

import Link from 'next/link';
import styles from '../styles/styles.module.css'; // Import CSS file for the LastSection component

const Last = () => {
  return (
    <div className={styles.lastSection}>
      <h2 className={styles.bigText2}>What are you waiting for?</h2>
      <p className={styles.smallText}>Join the study team!</p>
      <Link href="/login" passHref>
        <button className={styles.getStartedButton}>Get Started</button>
      </Link>
    </div>
  );
}

export default Last;
