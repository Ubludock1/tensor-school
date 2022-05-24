import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import sound from './Sound';
import Error from './Erorr';
import { TheContext, ErrorContext } from './App';

const Search = () => {
    const token = useContext(TheContext);
    const er = useContext(ErrorContext);
    const [item, setItem] = useState('');
    const [items, setItems] = useState([{ id: Number, name: String, album: { id: Number, images: [{ url: String }] } }]);

    const hend = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.target != null) {
            setItem((event.target as HTMLInputElement).value)
        }
    }

    useEffect(() => {
        if (item != "") {
            fetch('https://api.spotify.com/v1/search?q=track:+' + item + '++&type=track', {
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
                setItems(data.tracks.items);
            }).catch(function (error) {
                Error(error, er);
            });
        }
    }, [token, item])

    const res = () => {
        if (item == "") {
            return (
                <div className="hidden search_container">
                </div>
            )
        }
        else {
            return (
                <ul className="search_container">
                    {items.map((el) =>
                        <li key={el.id.toString()}>
                            <Link to={{ pathname: "/album:" + el.album.id }} className='search_container_content'>
                                <img className='search_container_img' src={el.album.images[0].url.toString()}></img>
                                <h4 className='search_container_name'>{el.name}</h4>
                            </Link>
                        </li>
                    )}
                </ul>
            )
        }
    }

    const location = useLocation()
    if (location.pathname != "/search") {
        return (<div></div>);
    }
    else {
        return (
            <li key="search" value="" className="main__pag-search">
                <input defaultValue="" className="search" type="text" placeholder="Исполнитель,трек или подкаст" onKeyUp={hend}></input>
                {res()}
            </li>
        )
    }
}

export default Search;