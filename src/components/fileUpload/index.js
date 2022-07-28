import React from 'react'

export default function FileUpload(props) {
  function showInfo(e) {
    props?.setFilePopUp(false)
    props?.setFileList( e.target.files[0])
    props?.setCurrentFile(props?.fileList)

  }
  return (
    <div>
        <input 
        // ref={props?.openDaFile}
         onClick={()=>showInfo()} type="file"></input>
    </div>
  )
}
