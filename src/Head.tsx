const Head = (props:{name:string,img:string})=>{
    return(
        <div className="main__content main__playlist-descr">
                <img className="playlist-img" src={props.img} alt="cat"></img>
                <div className="playlist-content">
                    <span className="palylist-name">ПЛЕЙЛИСТ</span>
                    <h2 className="playlist-head">{props.name}</h2>
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
    )
}
export default Head;