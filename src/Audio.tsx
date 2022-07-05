import { useContext, useEffect, useMemo, useRef, useState} from "react";
import { CurrentTrack } from "./App";

const MyAudio = () => {
    const [audio] = useState(() => new Audio())
    const {src,setSrc} = useContext(CurrentTrack);
    const playing = useRef(false);
    
    if(src===null){
        return (
            <div  className="audio__visible"></div>
        )
    }
    else{
        audio.src=src.preview_url
        return (
            <div className="audio__visible display__flex">
                <button className="buttonClear play-btn" onClick={()=>{if(!playing.current){playing.current=true;audio.play()}else{playing.current=false;audio.pause()}}}>{playing.current && "❚❚"}{!playing.current && "►"}</button>
                <div className="play-name">{src.name}</div>
                <button onClick={()=>{if(audio.volume<1){audio.volume+=0.1}}} className="buttonClear vol-button vol-plus">+</button>
                <button onClick={()=>{if(audio.volume>0.1){audio.volume-=0.1}}} className="buttonClear vol-button vol-minus">-</button>
            </div>
        )
    }
}

export default MyAudio;