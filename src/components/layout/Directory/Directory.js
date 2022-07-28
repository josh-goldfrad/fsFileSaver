import React, { useContext,useEffect } from 'react'
import { layoutContext } from '../Layout'
import "./Directory.css"

export default function Directory() {
  const daContext =useContext(layoutContext)
  useEffect(() => {
    daContext?.setPath("uploads")
  }, [])

  return (<>
  <div className='container'>
     <div className='path'>current directory:{daContext?.path}</div>
  </div>
  </>
  )
}
