import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../form/Input';
import styles from '../../form/Form.module.css';
export default function Login(props) {
    function handleChange(e) {}
    return (
        <section className={styles.form_container}>
            <h1>Entrar:</h1>
            <form>
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu email"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua Senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Entrar" />
                <p>
                    Não tem conta? <Link to="/register">Clique aqui</Link>
                </p>
            </form>
        </section>
    );
}
