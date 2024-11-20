import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css'; // Importing the CSS module

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Finance Tracker</h2>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>Dashboard</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/transactions" className={styles.navLink}>Transactions</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/budgets" className={styles.navLink}>Budgets</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/reports" className={styles.navLink}>Reports</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/settings" className={styles.navLink}>Settings</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/ai-chatbot" className={styles.navLink}>AI Chatbot</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
