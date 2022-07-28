import React, { useContext, useEffect, useState } from 'react'
import { layoutContext } from '../layout/Layout'
import { mainContext } from '../layout/Main/Main'
import "./style.css"


export default function FileReq() {
    const [currrentFile, setCurrrentFile] = useState()
    const daContext = useContext(mainContext)




    async function readFile(e) {
        // let navigate=useNavigate();
        // console.dir(e.target);
        // console.log(daContext.path);
        await fetch(
            `http://localhost:3010/file/${e.target.innerHTML}`,
            {
                method: "GET",
                // headers: { "Content-Type": "application/json" }
                // ,        body: JSON.stringify({fileName:e.target.value}),

            }
        ).then((response) => response.json())
            .then((result) =>
                console.log('file is: ', result))
        // setCurrrentFile(result))
        console.log("currrentFile: " + currrentFile);



    }


    function ChangeName() {
        console.log("double clicked");
    }

    return (
        <>
            <div className='fileReqContainer'>
                <div className='fileTitle'> files:
                    <div className='fileReq'>

                        {daContext?.data?.files?.map(i => {
                            return (
                                <div key={i + 2} className='fileList'>
                                    <div className='file' onClick={(e) => readFile(e)} onDoubleClick={(e) => ChangeName(e)}>{i}</div>
                                </div>
                            )
                        })}</div>
                </div>

            </div>
          
        </>
    )
}
