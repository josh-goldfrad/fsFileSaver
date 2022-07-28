import React, { useRef, useState } from 'react'
import "./inputButton.css"
import FileUpload from '../fileUpload'

export default function InputButton() {
  const [currentFile, setCurrentFile] = useState({})
  const [fileList, setFileList] = useState()
  const [newFolder, setNewFolder] = useState()
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [addFile, setAddFile] = useState(false)
  const [popup, setPopup] = useState(true)
  const [filePopUp, setFilePopUp] = useState(true)
  // const openDaFile = useRef(null)


  function showInfo(e) {
    setFilePopUp(false)
    // console.dir(e.target);
    setFileList(e.target.files[0])
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
    setFilePopUp(true)
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
  function showInput() {
    setPopup(false)

  }

  function closeInput(){
    setPopup(true)
  }

  function addFolder() {
    const formData1 = new FormData();
    formData1.append("folderName", `uploads/${newFolder}`)
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



  function newFileOpen() {
    setShowFileUpload(true)
    setAddFile(true)
    // openDaFile.current = true
    // openDaFile.current.click()



  }

  function newFileClose() {
    setShowFileUpload(false)
    // openDaFile.current = false



  }

  return (
    <>
      <div className='inputButtonContainer'>
        <div className='inputWrapper'>
          <div className='internalWrapper'>
            <div className='fileUpload'>
              <div hidden={showFileUpload} onClick={() => newFileOpen()}>add file 📁➕</div>
              <div hidden={!showFileUpload} onClick={newFileClose}> cancel ❌</div>
            </div>
            <div>
              {showFileUpload && (<>
                <FileUpload
                  // openDaFile={openDaFile}
                  fileList={fileList} setCurrentFile={setCurrentFile} setFileList={setFileList} />
                  </>
              )}
            </div>
            {/* <input onChange={(e) => showInfo(e)} type="file" /> */}
            <div hidden={!showFileUpload}>
              {currentFile && <div>fileName:{currentFile.name}</div>}
              {currentFile && <div>filetype:{currentFile.type}</div>}
              {currentFile && <div>filesize:{Math.round(currentFile.size / 1024) + "kb"}</div>}
            </div>
            <button hidden={!showFileUpload} onClick={() => sendFileToServer()}>upload file</button>
            {/* <button onClick={() => sendMultipleFilesToServer()}>upload multiple files</button> */}
            <br />
            <div>
            <div  hidden={!popup} onClick={() => showInput()}>open new  folder 🗄️➕</div>
            <div hidden={popup} onClick={()=>closeInput()}> cancel ❌</div>
            </div>
            <input placeholder='enter name of folder' onChange={(e) => extractInfo(e)} hidden={popup} />
            <button hidden={popup} onClick={() => addFolder()}>add folder to server</button>
          </div>
        </div>
      </div>
    </>
  )
}
