import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';
import styles from './NavBar.module.css';

import { Context } from '../../context/UserContext';
import { useContext } from 'react';
export default function NavBar(props) {
    const { authenticated } = useContext(Context);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Get-A-Pet" />
                <h2>Get A Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to="/"> Adotar</Link>
                </li>
                {authenticated ? (
                    <>
                        <p>Logado</p>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login"> Entrar</Link>
                        </li>
                        <li>
                            <Link to="/register"> Cadastrar</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
