import React from 'react';
import styles from './Profile.module.css';
import formStyles from '../../form/Form.module.css';
import Input from '../../form/Input';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../../utils/api';
import useFlashMessage from '../../../hooks/useFlashMessage';

export default function Profile(props) {
    const [user, setUser] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        api.get('/users/checkUser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => setUser(response.data));
    }, [token]);

    function onFileChange(e) {
        setUser({ ...user, [e.target.name]: e.target.files[0] });
    }

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let msgType = 'success';

        const formData = new FormData();

        await Object.keys(user).forEach((key) => {
            formData.append(key, user[key]);
        });

        const data = await api
            .patch(`/users/edit/${user._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-type': 'multipart/form-data',
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch((e) => {
                msgType = 'error';
                return e.response.data;
            });

        setFlashMessage(data.message, msgType);
    }

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
                    handleOnChange={handleChange}
                    placeholder="Digite o seu email"
                    value={user.email || ''}
                />
                <Input
                    text="Nome"
                    name="name"
                    type="text"
                    handleOnChange={handleChange}
                    placeholder="Digite o seu Nome"
                    value={user.name || ''}
                />
                <Input
                    text="Telefone"
                    name="phone"
                    type="text"
                    handleOnChange={handleChange}
                    placeholder="Digite o seu Telefone"
                    value={user.phone || ''}
                />
                <Input
                    text="Senha"
                    name="password"
                    type="password"
                    handleOnChange={handleChange}
                    placeholder="Digite a sua Senha"
                />
                <Input
                    text="Confirmação de Senha"
                    name="confirmpassword"
                    type="password"
                    handleOnChange={handleChange}
                    placeholder="Digite a Confirmação de Senha!"
                />

                <input type="submit" value="Atualizar" />
            </form>
        </section>
    );
}
