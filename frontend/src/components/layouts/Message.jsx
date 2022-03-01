import { useEffect } from 'react';
import { useState } from 'react';
import bus from '../../utils/bus';
import styles from './Message.module.css';

export default function Message(props) {
    const [message, setMessage] = useState('');
    const [visibility, setVisibility] = useState(false);
    const [type, setType] = useState('');

    useEffect(() => {
        bus.addListener('flash', ({ message, type }) => {
            setVisibility(true);
            setMessage(message);
            setType(type);

            setTimeout(() => {
                setVisibility(false);
            }, 3000);
        });
    }, []);

    return (
        visibility && (
            <div className={`${styles.message} ${styles[type]}`}>{message}</div>
        )
    );
}
