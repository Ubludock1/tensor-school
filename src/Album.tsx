import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Error from './Erorr';
import { TheContext, ErrorContext, Audio } from './App';
import Head from './Head';
import MainTrack from './MainTrack';

const Album = () => {
    const token = useContext(TheContext);
    const er = useContext(ErrorContext);
    const audio = useContext(Audio);
    const [play, setPlay] = useState([{ added_at:'',track: { duration_ms: 1, album: { name: '' }, preview_url: '', name: '', artists: [{ name: '' }] },name: '',preview_url: '',artists: [{ name: '' }],duration_ms: 1 }]);
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [data, setData] = useState('');


    let { tracks } = useParams<{ tracks: string }>();

    useEffect(() => {
        if (token != '' && tracks != null) {
            fetch("https://api.spotify.com/v1/albums/" + tracks.slice(1), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                }
                else {
                    return res.json()
                }
            }).then((data) => {
                setName(data.name);
                setData(data.release_date)
                setImg(data.images[0].url);
                setPlay(data.tracks.items);
            }).catch(function (error) {
                Error(error, er)
            });
        }
    }, [token, er, tracks])

    return (
        <div>
            <Head img={img} name={name}/>
            <MainTrack play={play} name={name} img ={img} data={data}/>
        </div>
    )
}

export default Album;