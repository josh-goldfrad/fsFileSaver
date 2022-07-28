import React, { createContext, useState } from 'react'
import Main from './Main/Main'
import Header from './Header/Header'
import Directory from './Directory/Directory'


export const layoutContext = createContext()

export default function Layout() {
    const [path, setPath] = useState()
    const dataState = useState()
    return (<>
        <layoutContext.Provider value={{
            path,
            setPath,
            // dataState
        }}>
            <Header />
            <Directory />
            <Main />
        </layoutContext.Provider>
    </>
    )
}
