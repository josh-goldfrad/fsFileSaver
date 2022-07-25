import React, { createContext, useState } from 'react'
import Main from './Main/Main'
import Header from './Header/Header'


export const pathContext = createContext()

export default function Layout() {
    const pathState = useState()
    return (<>
        <pathContext.Provider value={pathState}>
            <Header />
            <h2>+++++++++++++++++++++++++++</h2>
            <Main />
        </pathContext.Provider>
    </>
    )
}
