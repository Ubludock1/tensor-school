import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TheContext} from './App';
import Head from './Head';
import MainTrack from './MainTrack';
import useFetch from './useFetch';

const Album = () => {
    const token = useContext(TheContext);

    let { tracks } = useParams<{ tracks: string }>();
    let data = useFetch("https://api.spotify.com/v1/albums/" + tracks?.slice(1),token);

    if(data===null){
        return(<div></div>)
    }
    else{
        return (
            <div>
                <Head img={data.images[0].url} name={data.name}/>
                <MainTrack play={data.tracks.items} name={data.name} img ={data.images[0].url} data={data.release_date}/>
            </div>
        )
    }
}

export default Album;