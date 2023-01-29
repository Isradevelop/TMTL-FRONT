import { useState } from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({children}) => {
    const [contextAuth, setContextAuth] = useState(null);

    const setAuthContext = (token) => {
        setContextAuth({token, email})
    } 

  return (
    <AuthContext.Provider value={{contextAuth, setAuthContext}}>
        {children}
    </AuthContext.Provider>
  )
}