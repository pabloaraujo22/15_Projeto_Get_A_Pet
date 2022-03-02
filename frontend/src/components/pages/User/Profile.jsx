import React from 'react';
import styles from './Profile.module.css';
import formStyles from '../../form/Form.module.css';
import Input from '../../form/Input';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Profile(props) {
    const [user, setUser] = useState({});

    function onFileChange(e) {}

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    useEffect(() => {}, []);

    return (
        <section>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
                <p>Preview de Imagem</p>
            </div>
            <form className={formStyles.form_container} onSubmit={handleSubmit}>
                <Input
                    text="Imagem"
                    name="image"
                    type="file"
                    handleOnChange={onFileChange}
                />
                <Input
                    text="E-mail"
                    name="email"
                    type="email"
                    handleOnChange={onFileChange}
                    placeholder="Digite o seu email"
                    value={user.email || ''}
                />
                <Input
                    text="Nome"
                    name="name"
                    type="text"
                    handleOnChange={onFileChange}
                    placeholder="Digite o seu Nome"
                    value={user.name || ''}
                />
                <Input
                    text="Telefone"
                    name="phone"
                    type="text"
                    handleOnChange={onFileChange}
                    placeholder="Digite o seu Telefone"
                    value={user.phone || ''}
                />
                <Input
                    text="Senha"
                    name="password"
                    type="password"
                    handleOnChange={onFileChange}
                    placeholder="Digite a sua Senha"
                />
                <Input
                    text="Confirmação de Senha"
                    name="confirmpassword"
                    type="password"
                    handleOnChange={onFileChange}
                    placeholder="Digite a Confirmação de Senha!"
                />

                <input type="submit" value="Atualizar" />
            </form>
        </section>
    );
}
