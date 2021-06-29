import React from 'react';

import styles from './dashboard.module.css';


const Dashboard = () => {
  return (
    <div id={styles.pageDashboard}>
        <main>
          <section id={styles.totalInvested}>
            <h3>Total Invested</h3>
            <div className={styles.value}>
              <span>31.53</span>
              <p>ETH</p>
            </div>
            <div id={styles.buttons}>
              <button>Withdraw</button>
              <button>Deposit</button>
            </div>
          </section>

          <section id={styles.totalEarned}>
            <h3>Total Earned</h3>
            <span>11.32</span>
            <p>POP</p>
          </section>

          <section id={styles.chart}>
            <p>Colocar gráfico</p>
          </section>

          <section id={styles.transactions}>
            <h3>Transactions</h3>
            <button></button>
            <table></table>
          </section>
        </main>
    </div>
  );
}

export default Dashboard;