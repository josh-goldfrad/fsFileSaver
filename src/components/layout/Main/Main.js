import React, { useState } from 'react'
import FileReq from '../../FileReq'
import InputButton from '../../InputButton'


export default function Main() {
  const [data, setData] = useState()
  const[defaultFolder,setDefaultFolder]=useState("uploads")
  return (<>
    <div>Main</div>
    <InputButton/>
    <h2>+++++++++++++++++++++++++++</h2>
    <FileReq data={data} setData={setData} defaultFolder={defaultFolder}  setDefaultFolder={setDefaultFolder}/>
  </>
  )
}
