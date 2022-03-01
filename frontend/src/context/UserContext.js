import {createContext} from 'react'

import useAuth from '../hooks/useAuth'

export const Context = createContext()

export function UserProvider(props) {
    const {children} = props
    const {authenticated, register, login, logout} = useAuth()
    return <Context.Provider value={{authenticated,register,login,logout}}>{children}</Context.Provider>
}