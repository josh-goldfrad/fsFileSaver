import React, { useContext, useEffect, useState } from 'react'
import { layoutContext } from '../layout/Layout'
import { mainContext } from '../layout/Main/Main'
import "./style.css"

export default function FolderReq() {
    const daContext = useContext(mainContext)

    function openFolder(e) {
        daContext.setDefaultFolder(e.target.innerHTML)
        fetch(
            'http://localhost:3010/getFromServer',
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ folderName: `uploads/${daContext.defaultFolder} ` }),
            }
        )
            .then((response) => response.json())
            .then((result) => {

                console.log(result);
                daContext.setData(result)
                console.log("success:", result);

            })
            .catch((error) => {
                console.log(error || "error");
            })

    }

    return (<>
        <div className='folderReqContainer'>
            <div className='folderTitle'>folders:
                <div className='folderReq'>

                    {daContext?.data?.folders?.map(i => {
                        return (
                            <div key={i + 1} className='folderList'>
                                <div className='folder' onClick={(e) => openFolder(e)}>{i}</div>
                            </div>
                        )
                    })}</div>
                <div className='marginBottom'></div>
            </div>
        </div>
    </>
    )
}
