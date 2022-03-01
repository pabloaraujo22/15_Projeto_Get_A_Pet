import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../form/Input';
import styles from '../../form/Form.module.css';
import { useState } from 'react';
import { Context } from '../../../context/UserContext';

export default function Register(props) {
    const [user, setUser] = useState({});
    const { register } = useContext(Context);
    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        //enviar o usuario para o Banco
        register(user);
    }
    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu Nome"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu Telefone"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Email:"
                    type="email"
                    name="email"
                    placeholder="Digite o seu Email"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="pasword"
                    placeholder="Digite a sua Senha"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme a sua Senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Cadastrar" />
                <p>
                    Ja tem conta? <Link to="/login">Clique aki</Link>{' '}
                </p>
            </form>
        </section>
    );
}
