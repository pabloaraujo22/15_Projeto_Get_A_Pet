import api from "../utils/api";
import useFlashMessage from '../hooks/useFlashMessage'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false)
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user) {
        let msgText = 'Cadastro Realizado com Sucesso!'
        let msgType = 'success'
        try {
            const data = await api.post('/users/register', user).then(response=>{
                return response.data
            })
            await authUser(data)
        } catch (e) {
            msgText = e.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    async function authUser(data) {
        setAuthenticated(true)

        localStorage.setItem('token', JSON.stringify(data.token))

        navigate('/')
    }
    
    async function login(user) {
        let msgText = 'Login realizado com Sucesso!'
        let msgType = 'success'

        try {
            const data = await api.post('/users/login', user).then(response=>response.data)
            await authUser(data)
        } catch (e) {
            msgText = e.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText,msgType)
    }

    async function logout() {
        const msgText = 'Logout realizado com Sucesso!'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        setFlashMessage(msgText,msgType)
    }

    return {authenticated,register, login, logout}
}