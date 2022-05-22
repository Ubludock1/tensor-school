import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import sound from './Sound';
import Error from './Erorr';
import millisToMinutesAndSeconds  from './millisToMinutesAndSeconds';

const Album  = (props:any) =>{
    const [play,setPlay] = useState([]);
    const [name,setName] = useState('');
    const [img,setImg] = useState('');


    let { tracks } = useParams<{tracks:any}>();

    useEffect(()=>{
        if(props.options!=''){
            fetch("https://api.spotify.com/v1/albums/"+tracks.slice(1),{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+ props.options
                }
            }).then((res)=>{
                if(!res.ok){
                    return Promise.reject(res.status);
                }
                else{
                    return res.json()
                }
            }).then((data) => {
                setName(data.name);
                setImg(data.images[0].url);
                setPlay(data.tracks.items);
            }).catch(function(error){
                Error(error);
            });
        }
    },[props.options])

    return (
        <div>
            <div className="main__content main__playlist-descr">
                <img className="playlist-img" src={img} alt="cat"></img>
                <div className="playlist-content">
                    <span className="palylist-name">ПЛЕЙЛИСТ</span>
                    <h2 className="playlist-head">{name}</h2>
                    <p className="playlist-opis">Peaceful instrumentals to help you keep calm.</p>
                    <div className="playlist-footer">
                        <a className="playlist-spotify" href="#">Spotify</a>
                        &nbsp;
                        <span className="playlist-like">792 222 лайка</span>
                        &nbsp;
                        <span className="playlist-trek">270 треков,</span>
                        &nbsp;
                        <span className="playlist-hours">примерно 13 ч.</span>
                    </div>
                </div>
            </div>
            <div className="main__content main__trek">
            <div className="main__button-container">
                <button className="play"><svg height="28" role="img" width="28" viewBox="0 0 24 24" aria-hidden="true"><polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon></svg></button>
                <button className="like buttonClear"><svg role="img" height="32" width="32" viewBox="0 0 32 32" className="Svg-sc-1bi12j5-0 hDgDGI"><path fill="currentColor" d="M27.672 5.573a7.904 7.904 0 00-10.697-.489c-.004.003-.425.35-.975.35-.564 0-.965-.341-.979-.354a7.904 7.904 0 00-10.693.493A7.896 7.896 0 002 11.192c0 2.123.827 4.118 2.301 5.59l9.266 10.848a3.196 3.196 0 004.866 0l9.239-10.819A7.892 7.892 0 0030 11.192a7.896 7.896 0 00-2.328-5.619zm-.734 10.56l-9.266 10.848c-.837.979-2.508.979-3.346 0L5.035 16.104A6.9 6.9 0 013 11.192 6.9 6.9 0 015.035 6.28a6.935 6.935 0 014.913-2.048 6.89 6.89 0 014.419 1.605A2.58 2.58 0 0016 6.434c.914 0 1.555-.53 1.619-.585a6.908 6.908 0 019.346.431C28.277 7.593 29 9.337 29 11.192s-.723 3.6-2.062 4.941z"></path></svg></button>
                <button className="more buttonClear"><svg role="img" height="32" width="32" viewBox="0 0 24 24" className="Svg-sc-1bi12j5-0 hDgDGI"><path fill="currentColor" d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg></button>
            </div>
            <table className="main__table">
              <tr className="table-row">
                <th className="table-head">#</th>
                <th className="table-head">НАЗВАНИЕ</th>
                <th className="table-head">АЛЬБОМ</th>
                <th className="table-head">ДАТА ДОБАВЛЕНИЯ</th>
                <th className="table-head"><svg role="img" height="16" width="16" viewBox="0 0 16 16" className="Svg-sc-1bi12j5-0 hDgDGI"><path fill="currentColor" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path><path fill="currentColor" d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"></path></svg></th>
              </tr>
              {play.map((item:any,index:any)=>
                <tr className='table-row-item' onClick={sound.bind(item)}>
                    <td className='table-item table-number'>
                        {index+1}
                    </td>
                    <td className='table-item'>
                        <div className='table-content'>
                            <img src={img} className='table-img'></img>
                            <div className='table-text'>
                                <h4 className='table-text-head'>{item.name}</h4>
                                <p className='table-author'>{item.artists[0].name}</p>
                            </div>
                        </div>
                    </td>
                    <td className='table-albom'>
                        {name}
                    </td>
                    <td className='table-data'>
                        {new Date(item.added_at).toLocaleDateString()}
                    </td>
                    <td className='table-time'>
                        {millisToMinutesAndSeconds(item.duration_ms)}
                    </td>
                </tr>
              )}
            </table>
          </div>
        </div>
    )
}

export default Album;