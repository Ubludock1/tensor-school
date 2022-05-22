import React from "react";
import {useHistory} from 'react-router-dom';
import Svg from "./Svg";

const Pag = (props:any)=>{
    const history = useHistory();
    return (
        <>
            <li onClick={function(){history.goBack()}} className="main__pag-item-container"><button  className="main__pag-item left buttonClear"> </button></li>
            <li onClick={function(){history.go(1)}} className="main__pag-item-container"><button  className="main__pag-item right buttonClear"><svg  id="Layer_2"  version="1.1" viewBox="0 0 128 128" width="128px"  xmlns="http://www.w3.org/2000/svg" ><g><line  x1="40.5" x2="87.5" y1="17" y2="64"/><line  x1="87.5" x2="40.5" y1="64" y2="111"/></g></svg></button></li>
        </>
    )
}

export default Pag;