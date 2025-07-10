import React from 'react'
import EditBanner from '../../components/EditBanner'
const ControlPanel = () => {
  return (
    <>
      <div>
        <EditBanner title= {" h i"} description = {" h i"} listInput ={ [{

                           label: "Tieu ddeef",
                            placeholder: "Mota",
                            contentCurrent: "",
                       
                            isRequire: true

        },
        {

                           label: "Tieu ddeef2",
                            placeholder: "Mota",
                            contentCurrent: "",
                       
                            isRequire: true

        }
        ] } saveButton = {(result)=>{console.log(result)}}/>
      </div>
    </>
  )
}
export default ControlPanel