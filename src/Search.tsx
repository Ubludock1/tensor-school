import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory ,useLocation  } from 'react-router-dom';
import sound from './Sound';
import Error from './Erorr';

const Search = (props:any) =>{
    const [item,setItem] = useState('');
    const [items,setItems] = useState([]);

    const hend = (event:any) => {
        setItem(event.target.value)
    }

    useEffect(()=>{
        if(item!=""){
            fetch('https://api.spotify.com/v1/search?q=track:+'+item+'++&type=track',{
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
        }).then((data)=>{
            setItems(data.tracks.items);
        }).catch(function(error){
            Error(error);
        });
        }
    },[item])

    const res = ()=>{
        if(item==""){
            return(
                <div className="hidden search_container">
                </div>
            )
        }
        else {
            return(
                <div className="search_container">
                    {items.map((el:any)=>
                            <div>
                                <Link to={{pathname: "/album:"+el.album.id}} className='search_container_content'>
                                    <img className='search_container_img' src={el.album.images[0].url}></img>
                                    <h4 className='search_container_name'>{el.name}</h4>
                                </Link>
                            </div>
                    )}
            </div>
            )
        }
    }

    const location = useLocation()
    if(location.pathname!="/search"){
        return(<div></div>);
    }
    else {
        return (
            <li key={234} value="" className="main__pag-search">
              <input defaultValue="" className="search" type="text" placeholder="Исполнитель,трек или подкаст" onKeyUp={hend}></input>
              {res()}
            </li>
      )
    }
}

export default Search;