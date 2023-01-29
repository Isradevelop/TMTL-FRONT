
import { useState } from 'react'
import { ClientContext } from './ClientContext'

export const ClientProvider = ({children}) => {
    const [contextClient, setClient] = useState();

    const setContextClient = (client) => {
        setClient(client);
        sessionStorage.setItem('tmtl-user', JSON.stringify( client ));
    } 

  return (
    <ClientContext.Provider value={{contextClient, setContextClient}}>
        {children}
    </ClientContext.Provider>
  )
}
