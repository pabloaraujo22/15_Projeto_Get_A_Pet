import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './MyPets.module.css';
export default function MyPets(props) {
    const [pets, setPets] = useState([]);
    useEffect(() => {}, []);
    return (
        <section>
            <div>
                <h1>Meus Pets</h1>
                <Link to="/pet/add">Cadastrar Pet</Link>
            </div>
            {pets.length > 0 ? (
                <p>Meus Pets Cadastrados</p>
            ) : (
                <p>Não há pets Cadastrados</p>
            )}
        </section>
    );
}
