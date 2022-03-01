import { useState } from 'react';
import styles from './Message.module.css';

export default function Message(props) {
    const [type, setType] = useState('');

    return (
        <div className={`${styles.message} ${styles[type]}`}>
            Minha Mensagem
        </div>
    );
}
