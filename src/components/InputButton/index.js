import React, { Fragment, useState } from 'react'

export default function InputButton() {
  const [currentFile, setCurrentFile] = useState({})
  const [newFolder, setNewFolder] = useState()
  const [popup, setPopup] = useState(true)

  function showInfo(e) {
    // console.dir(e.target);
    const fileList = e.target.files[0]
    // console.log(fileList);
    setCurrentFile(fileList)

  }

  function sendFileToServer() {
    const formData = new FormData();
    formData.append("myFile", currentFile)
    fetch(
      'http://localhost:3010/upload',
      {
        method: "POST",
        body: formData
        
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error || "error");
      })
    console.log("uploaded to db");
  }

  // function sendMultipleFilesToServer() {
  //   const formData = new FormData();
  //   formData.append("manyFiles", currentFile)
  //   fetch(
  //     'http://localhost:3010/multiple',
  //     {
  //       method: "POST",
  //       body: formData
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("success");
  //     })
  //     .catch((error) => {
  //       console.log(error || "error");
  //     })
  //   console.log("uploaded to db");
  // }

  function addFolder() {
    setPopup(false)
    // setTimeout(() => {setPopup(false); console.log("nameOfFolder input open") }, 10)
    // setTimeout(() => {setPopup(false); console.log(" input button popup ;it will now close off") }, 5000)

    const formData1 = new FormData();
    formData1.append("folderName", `uploads/${newFolder}`)
    // console.log(formData1.getAll())
    fetch(
      'http://localhost:3010/uploadFolder',
      {
        method: "POST",
        body: formData1
      }
    )
      .then((response) => { response.json(); })
      // .then((response) => response.json())
      .then((result) => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error || "error");
      })
    console.log("uploaded to db");
    setPopup(true)
  }

  function extractInfo(e) {
    setNewFolder(e.target.value)
  }

  return (
    <>
      <input onChange={(e) => showInfo(e)} type="file"></input>



      {currentFile && <div>fileName:{currentFile.name}</div>}
      {currentFile && <div>filetype:{currentFile.type}</div>}
      {currentFile && <div>filesize:{currentFile.size / 1024 + "kb"}</div>}




      <button onClick={() => sendFileToServer()}>upload file</button>
      {/* <button onClick={() => sendMultipleFilesToServer()}>upload multiple files</button> */}
      <br />
      <br />
      <button onClick={() => addFolder()}>open new  folder</button>
      <input placeholder='enter name of folder' onChange={(e) => extractInfo(e)}
      // hidden={popup}
      />
    </>
  )
}
