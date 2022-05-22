import React from 'react';
import ReactDOM from 'react-dom';
import sound from './Sound';


const Main  = (props:any) =>{

    return (
        <div>
            {props.options.map((item:any)=>
                <div className='main__playlist'>
                    <a className='main__playlist-link'>
                        <h2 className='main__head'>{item.name}
                        </h2>
                    </a>
                    <ul className='main__content-list'>
                                {item.tracks.items.map((track:any,id:any)=>
                                    <li key={track.id} className='main__content-item'>
                                        <a className='main__content-item-link' onClick={sound.bind(track)}>
                                            <img src={item.images[0].url} className='main__content-img'></img>
                                            <h3 className='main__content-head'>{track.name}</h3>
                                        </a>
                                    </li>
                                )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Main;