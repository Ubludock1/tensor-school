import { useContext } from "react";
import { CurrentTrack } from './App';
import millisToMinutesAndSeconds from "./millisToMinutesAndSeconds";
import PlaySvg from "./PlaySvg";
import LikeSvg from "./LikeSvg";
import MoreSvg from "./MoreSvg";
import TimeSvg from "./TimeSvg";
import MyType from "./Type";
import { useNavigate } from "react-router-dom";

const MainTrack = (props:{play:MyType[],img:string,name:string,data:string}) =>{
    const {src,setSrc} = useContext(CurrentTrack);
    const navigate = useNavigate();

    return(
        <div className="main__content main__trek">
                <div className="main__button-container">
                    <button className="play"><PlaySvg></PlaySvg></button>
                    <button className="like buttonClear"><LikeSvg></LikeSvg></button>
                    <button className="more buttonClear"><MoreSvg></MoreSvg></button>
                </div>
                <table className="main__table">
                    <tbody>
                        <tr className="table-row">
                            <th className="table-head">#</th>
                            <th className="table-head">НАЗВАНИЕ</th>
                            <th className="table-head">АЛЬБОМ</th>
                            <th className="table-head">ДАТА ДОБАВЛЕНИЯ</th>
                            <th className="table-head"><TimeSvg></TimeSvg></th>
                        </tr>
                        {props.play.map((item, index) =>
                            <tr key={index} className='table-row-item' onClick={() => {
                                if(item.track===undefined){
                                    if(item.preview_url!==null)
                                    {setSrc(item)}
                                    else{navigate("/eroor:"+"track")}
                                }
                                else{
                                    if(item.track.preview_url!==null)
                                    {setSrc(item.track)}
                                    else{navigate("/eroor:"+"track")}
                                }
                            }}>
                                <td className='table-item table-number'>
                                    {index + 1}
                                </td>
                                <td className='table-item'>
                                    <div className='table-content'>
                                        <img src={props.img} className='table-img'></img>
                                        <div className='table-text'>
                                            {item.artists!==undefined &&
                                                <h4 className='table-text-head'>{item.name}</h4>
                                            }
                                            {item.artists!==undefined &&
                                                <p className='table-author'>{item.artists[0].name}</p>
                                            }
                                            {item.track!==undefined &&
                                                <h4 className='table-text-head'>{item.track.name}</h4>
                                            }
                                            {item.track!==undefined &&
                                                <p className='table-author'>{item.track.artists[0].name}</p>
                                            }

                                        </div>
                                    </div>
                                </td>
                                <td className='table-albom'>
                                    {props.name}
                                </td>
                                <td className='table-data'>
                                    {props.data!=="No" &&
                                        new Date(props.data).toLocaleDateString()
                                    }
                                    {props.data==="No" &&
                                        new Date(item.added_at).toLocaleDateString()
                                    }
                                </td>
                                <td className='table-time'>
                                    {item.track===undefined &&
                                        millisToMinutesAndSeconds(item.duration_ms)
                                    }
                                    {item.track!==undefined &&
                                        millisToMinutesAndSeconds(item.track.duration_ms)
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
    )
}
export default MainTrack;