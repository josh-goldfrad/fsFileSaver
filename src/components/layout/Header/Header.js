import React, { useContext, useEffect } from 'react'
import { pathContext } from '../Layout'

export default function Header() {
  const [path,setPath]=useContext(pathContext)
  useEffect(() => {
    setPath("uploads")
  }, [])
  
  return (<>
    <div>Header</div>
    <div>current folder:{path}</div>
  </>
  )
}
