import { useContext, useEffect, useMemo, useState} from "react";
import { CurrentTrack } from "./App";

const MyAudio = () => {
    var audio = useMemo(()=> new Audio() ,[])
    const {src,setSrc} = useContext(CurrentTrack);
    const [playing,setPlaying] = useState(false);

    useEffect(()=>{
        
    },[playing])
    
    if(src===null){
        return (
            <div  className="audio__visible"></div>
        )
    }
    else{
        audio.src=src.preview_url
        return (
            <div className="audio__visible display__flex">
                <button className="buttonClear play-btn" onClick={()=>{if(!playing){setPlaying(true)}else{setPlaying(false)}}}>{playing && "❚❚"}{!playing && "►"}</button>
                <div className="play-name">{src.name}</div>
                <button onClick={()=>{if(audio.volume<1){audio.volume+=0.1}}} className="buttonClear vol-button vol-plus">+</button>
                <button onClick={()=>{if(audio.volume>0.1){audio.volume-=0.1}}} className="buttonClear vol-button vol-minus">-</button>
            </div>
        )
    }
}

export default MyAudio;