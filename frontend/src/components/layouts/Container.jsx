import React from 'react';
import styles from './Container.module.css';
export default function Container(props) {
    const { children } = props;
    return <main className={styles.container}>{children}</main>;
}
