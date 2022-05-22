import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router,Switch,Route,Link, useHistory} from 'react-router-dom';
import Main from './Main';
import Categories from './Categories';
import Play from './Play';
import Svg from './Svg';
import Search from './Search';
import Track from './Tracks';
import Album from './Album';
import Error  from './Erorr';
import Pag from './Pag';

const TheContext = React.createContext(null);

function App() {
  //Error
  const er = React.createRef<any>();

  //Audio
  const av = React.createRef<any>();
  const playBtn = React.createRef<any>();
  const playTime = React.createRef<any>();
  const curTime = React.createRef<any>();
  const volPlus = React.createRef<any>();
  const volMinus = React.createRef<any>();
  const audioVisible = React.createRef<any>();

  //Token
  const client_id = '7b8513be5c214d578cc12c924900f46e'; // Your client id
  const client_secret = '3400d157503c41b0a67fa2e04ef5bbfd'; // Your secret
  const redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri
    

  const [token,setToken] = useState('');
  const [album,setAlbum] = useState([]);
  const [categories,setCategories] = useState([]);

  useEffect(()=>{
          fetch('https://accounts.spotify.com/api/token', {
              method: 'POST',
              headers: {
                  'Content-Type' : 'application/x-www-form-urlencoded', 
                  'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
              },
              body: 'grant_type=client_credentials'
          }).then((res)=>res.json()).then((data)=>{
                setToken(data.access_token);
                  fetch('https://api.spotify.com/v1/albums?ids=6aSk2vxoY3xtz7cXKuY9EL,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',{
                      headers:{
                          'Content-Type': 'application/json',
                          'Authorization' : 'Bearer '+ data.access_token
                      }
                  }).then((res)=>{
                    if(!res.ok){
                        return Promise.reject(res.status);
                    }
                    else{
                        return res.json()
                    }
                  }).then((data)=>{
                          setAlbum(data.albums);
                  }).catch(function(error){
                    Error(error);
                  })

                  fetch('https://api.spotify.com/v1/browse/categories',{
                      headers:{
                          'Content-Type': 'application/json',
                          'Authorization' : 'Bearer '+ data.access_token
                      }
                  }).then((res)=>{
                    if(!res.ok){
                      return Promise.reject(res.status);
                    }
                    else{
                        return res.json()
                    }
                  }).then((data)=>{
                          setCategories(data.categories.items);
                  }).catch(function(error){
                    Error(error);
                  })
          })

  },[client_id,client_secret])

  return (
    <>
      <Router >
        <div ref={er} className="error__container">
          <h3 className="error__head">Ошибка!</h3>
          <p className="error__message">Тут написана какая-то ошибка</p>
          <button 
            onClick={function(){
              er.current.classList.toggle("display__flex");
            }} 
            className="error__button buttonClear">
            OK
            </button>
        </div>
        <header className="header">
          <nav className="header__nav">
            <a href="#"><img src="img/Spotifi.svg" className="logo" alt="logo"></img></a>
            <ul className="header__list">
              <li key="/" className="header__item">
                <Link to="/" className="header__link-current"><img className="header__img" src="img/home.svg"></img>Главная</Link>
              </li>
              <li key="/search" className="header__item">
                <Link to="/search" className="header__link"><Svg id="search"/>Поиск</Link>
              </li>
              <li key="/media" className="header__item">
                <Link to="/media" className="header__link"><Svg id="media"/>Моя медиатека</Link>
              </li>
            </ul>
            <div className="header__creat">
              <button className="button-play buttonClear"><div className="creat-icon "><Svg id="plus"/></div>Создать плейлист</button>
              <button className="button-play buttonClear"><div className="creat-icon heart"><Svg id="heart"/></div>Любимые треки</button>
            </div>
            <div className="header__docs">
              <a className="header__docs-link" href="#">Файлы cooki</a>
              <a className="header__docs-link" href="#">Конфиденциальность</a>
              <a className="header__docs-link" href="#">Форма для Ваших обращений</a>
            </div>
          </nav>
        </header>
        <main className="main">
            <nav className="main__nav">
              <ul className="main__pag-list">
                  <Pag></Pag>
                  <Search options={token}/>
              </ul>
              <div className="main_autho">
                  <button className="main__button login buttonClear">ВОЙТИ</button>
              </div>
            </nav>
            <Switch>
              
              <Route path='/album:tracks'>
                <Album options={token}/>
              </Route>

              <Route path="/track:tracks">
                <Track options={token}/>
              </Route>

              <Route path="/a:item">
                <Play options={token}/>
              </Route>

              <Route path="/media">
              </Route>

              <Route path="/search">
                <div className="main__content">
                  <div className="main_playlist">
                    <h2 className="main__head">Все остальное</h2>
                    <Categories options={categories} />
                  </div>
                </div>
              </Route>

              <Route path="/">
                <div className="main__content">
                    <Main options={album}  />
                </div>
              </Route>
              
            </Switch>
        </main>

        <audio ref={av} 
          onLoadedMetadata={function(){
            curTime.current.max=av.current.duration;
          }}
          onTimeUpdate={function(){
            var sec_num = av.current.currentTime;
            var hours:any = Math.floor(sec_num / 3600);
            var minutes:any = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds:any = sec_num - (hours * 3600) - (minutes * 60);
            seconds=Math.round(seconds);
            if (hours < 10) {
              hours = "0"+hours;
            }
            if (minutes < 10) {
              minutes = "0"+minutes;
            }
            if (seconds < 10) { seconds = "0"+seconds; }{
              playTime.current.innerHTML = minutes+':'+seconds
            }; 
            if(audioVisible.current.getAttribute("data-playing") == "true"){
              curTime.current.value=av.current.currentTime
            }; 
          }} 
          className="hidden audio" controls>
        </audio>

        <div ref={audioVisible} data-playing="false"  className="audio__visible"> 
          <button ref={playBtn}
            onClick={function(){
              if(audioVisible.current.getAttribute("data-playing") == "true")
              {
                av.current.pause();
                audioVisible.current.setAttribute("data-playing","false");
                playBtn.current.innerHTML="►";
              }
              else
              {
                av.current.play();
                audioVisible.current.setAttribute("data-playing","true");
                playBtn.current.innerHTML="❚❚";
              }
            }} 
            className="buttonClear play-btn">
            ►
          </button>
          <div  className="play-name"></div>
          <input ref={curTime} 
            onChange={function(){
              av.current.play();
              audioVisible.current.setAttribute("data-playing","true");
              playBtn.current.innerHTML="❚❚";
              av.current.currentTime=curTime.current.value;
            }}
            className="cur-time" 
            type="range" 
            min="0" 
            max="10" 
            defaultValue="0" 
            step="0">
          </input>
          <div ref={playTime} className="play-time">00:00</div>
          <button ref={volPlus}
            onClick={function(){
              if(av.current.volume<1){
                av.current.volume+=0.1;
              }
            }} 
            className="buttonClear vol-button vol-plus">
              +
          </button>
          <button ref={volMinus}
            onClick={function(){
              if(av.current.volume>0.1){
                av.current.volume-=0.1;
              }
            }} 
            className="buttonClear vol-button vol-minus">
            -
          </button>
        </div>
      </Router>
    </>
  );
}

 export default App;