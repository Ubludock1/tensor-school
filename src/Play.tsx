import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import Error from './Erorr';

const Play  = (props:any) =>{
    const [play,setPlay] = useState([]);
    const [name,setName] = useState('');

    let { item } = useParams<{item:any}>();
    useEffect(()=>{
        if(props.options!=''){
            fetch("https://api.spotify.com/v1/browse/categories/"+item.slice(1),{
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
            }).catch(function(error){
                Error(error);
            });

            fetch("https://api.spotify.com/v1/browse/categories/"+item.slice(1)+"/playlists",{
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
                    setPlay(data.playlists.items);

                }).catch(function(error){
                    Error(error);
                });
            }
    },[props.options])
    return (
        <div>
            <div className="main__content main__playlist-descr">
                <div className="playlist-content">
                    <h2 className="playlist-head">{name}</h2>
                </div>
            </div>
            <div className="main__content main__trek">
              <div className="main__playlist">
                <ul className="main__content-list">
                    {play.map((Item:any)=>
                        <li className='main__content-item'>
                            <Link to={{pathname: "/track:"+Item.id}}>
                            <img className='main__content-img' src={Item.images[0].url} ></img>
                                <h3 className='main__content-head'>
                                    {Item.name}
                                </h3>
                            </Link>
                        </li>
                    )}
                </ul>
              </div>
            </div>
        </div>
    )
}

export default Play;