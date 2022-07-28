import React, { createContext, useEffect, useState } from 'react'
import FileReq from '../../FileReq'
import FolderReq from '../../FolderReq'
import InputButton from '../../InputButton'

export const mainContext = createContext()

export default function Main() {
  const [data, setData] = useState()
  // const folderState = useState()
  const [defaultFolder, setDefaultFolder] = useState("uploads")
  //  folderState,

  useEffect(() => {
    fetch(
      'http://localhost:3010/getFromServer',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderName: defaultFolder }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result)
        console.log("success:", result);

      })
      .catch((error) => {
        console.log(error || "error");
      })




  }, [])

  return (<>
    <mainContext.Provider value={{ defaultFolder, setDefaultFolder, data, setData }}>
      <InputButton />
      <FolderReq />
      <FileReq />
    </mainContext.Provider>
  </>
  )
}
