import React from 'react';
import styles from './AddPet.module.css';

import api from '../../../utils/api';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage';

export default function AddPet(props) {
    return (
        <section className={styles.addpet_header}>
            <div>
                <h1>Cadastrar um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <p>Formulario</p>
        </section>
    );
}
