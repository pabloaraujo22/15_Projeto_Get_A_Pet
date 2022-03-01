import React from 'react';
import styles from './Inpute.module.css';

export default function Input(props) {
    const { type, text, name, placeholder, handleOnChange, value, multiple } =
        props;
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                name={name}
                id={name}
                {...(multiple ? { multiple } : '')}
            />
        </div>
    );
}
