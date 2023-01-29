import { useState } from 'react'
import { WeigthContext } from './WeigthContext'

export const WeigthProvider = ({children}) => {
    const [contextWeigth, setWeigth] = useState();

    const setContextWeigth = (weigth) => {
        setWeigth(weigth)
    } 

  return (
    <WeigthContext.Provider value={{contextWeigth, setContextWeigth}}>
        {children}
    </WeigthContext.Provider>
  )
}
