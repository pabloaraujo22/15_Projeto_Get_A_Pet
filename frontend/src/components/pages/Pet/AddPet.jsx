import React from 'react';
import styles from './AddPet.module.css';

import api from '../../../utils/api';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage';
import PetForm from '../../form/PetForm';

export default function AddPet(props) {
    return (
        <section className={styles.addpet_header}>
            <div>
                <h1>Cadastrar um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm btnText="Cadastrar Pet" />
        </section>
    );
}
