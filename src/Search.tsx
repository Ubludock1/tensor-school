import React, { useContext,useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TheContext} from './App';
import useFetch from './useFetch';

const Search = () => {
    const token = useContext(TheContext);
    const [item, setItem] = useState('');

    const hend = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.target !== null) {
            setItem((event.target as HTMLInputElement).value)
        }
    }

    const data = useFetch('https://api.spotify.com/v1/search?q=track:+' + item + '++&type=track',token);

    const res = () => {
        if (item === "" || data===null) {
            return (
                <div className="hidden search_container">
                </div>
            )
        }
        else {
            return (
                <ul className="search_container">
                    {data.tracks.items.map((el) =>
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
    if (location.pathname !== "/search") {
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