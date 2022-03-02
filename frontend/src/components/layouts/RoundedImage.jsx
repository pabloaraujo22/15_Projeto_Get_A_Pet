import React from 'react';
import styles from './RoundedImage.module.css';

export default function RoundedImage(props) {
    const { src, alt, width } = props;
    return (
        <img
            src={src}
            alt={alt}
            className={`${styles.rounded_image} ${styles[width]}`}
        />
    );
}
