import React from 'react';
import { Link } from 'react-router-dom';

import styles from './home.module.css';

const Home = () => {
  return (
    <div id={styles.pageHome}>
      <div className={styles.content}>
        <main>
          <h1><strong>Pop Bank</strong></h1>
          <p>Your decentralized bank. Earn <br/> up to 10% APY on POP with your <br/> ETH.</p>
          <Link to="/dashboard">
            <strong>Start Now</strong>
          </Link>
        </main>
      </div>
    </div>
  );
}

export default Home;