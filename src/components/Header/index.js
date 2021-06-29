import React from 'react';

import logo from '../../assets/logo.svg';

import styles from './header.module.css';


const Header = () => {
  const page = "";
  return (

    <header className={styles.headerContainer}>
      <img src={logo} alt="Pop Bank" />
      {
        (page === '/dashboard')
        &&
        (
          <div id={styles.accountInfo}>
            <p>My Account</p>
            <span>0x7399B278c206c1E8BACF52Dc6033E4D4250E20AE</span>
          </div>
        )
      }
    </header>

  );
}

export default Header;