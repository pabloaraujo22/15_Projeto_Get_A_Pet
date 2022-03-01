import React from 'react';
import styles from './Footer.module.css';
export default function Footer(props) {
    return (
        <footer className={styles.footer}>
            <p>
                <span className="bold">Get A Pet</span> &copy; 2022
            </p>
        </footer>
    );
}
