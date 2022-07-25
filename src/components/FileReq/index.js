import React, { useContext, useEffect, useState } from 'react'
import { pathContext } from '../layout/Layout'
import "./style.css"


export default function FileReq(props) {
    const [path, setPath] = useContext(pathContext)
    const [currrentFile, setCurrrentFile] = useState()
    useEffect(() => {
        fetch(
            'http://localhost:3010/getFromServer',
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ folderName: props.defaultFolder }),
            }
        )
            .then((response) => response.json())
            .then((result) => {
                props.setData(result)
                console.log("success:", result);

            })
            .catch((error) => {
                console.log(error || "error");
            })




    }, [])
    async function readFile(e) {
        // let navigate=useNavigate();
        // console.dir(e.target);
        // console.dir(e.target.innerHTML);

        console.log(path);
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
                // ()=> setCurrrentFile(result))
        console.log("currrentFile: "+currrentFile);



    }
    function openFolder(e) {
        props.setDefaultFolder(e.target.innerHTML)
        fetch(
            'http://localhost:3010/getFromServer',
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ folderName: `uploads/${props.defaultFolder} ` }),
            }
        )
            .then((response) => response.json())
            .then((result) => {

                console.log(result);
                props.setData(result)
                console.log("success:", result);

            })
            .catch((error) => {
                console.log(error || "error");
            })

    }

    return (
        <>
            <div>folders:<br />
                {props.data?.folders?.map(i => {
                    return (
                        <div key={i + 1} className='fileList'>
                            <div className='file' onClick={(e) => openFolder(e)}>{i}</div>
                        </div>
                    )
                })}</div>

            <div>files:<br />
                {props.data?.files?.map(i => {
                    return (
                        <div key={i + 2} className='fileList'>
                            <div className='file' onClick={(e) => readFile(e)}>{i}</div>
                        </div>
                    )
                })}</div>


            <div>+++++++++++++</div>
            <div>currrentFile:</div>
            <div>{currrentFile}</div>


        </>
    )
}
