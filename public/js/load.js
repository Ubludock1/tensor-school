import {client_id,redirect_uri} from "./getToken.js";

document.querySelector(".login").addEventListener('click',function (){
    let url = 'https://accounts.spotify.com/authorize';
    url += "?client_id=" + client_id;
    url += "&response_type=token";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.replace(url);
})

document.querySelector(".main__pag-item.left").addEventListener("click",function(){
    history.back();
})

document.querySelector(".main__pag-item.right").addEventListener("click",function(){
    history.go(1);
})

document.querySelector(".error__button").addEventListener("click",function(){
    document.querySelector(".error__container").classList.toggle("display__flex");
})

window.onload = function () {
    let code = null;
    const queryString = window.location.hash;
    if ( queryString && window.location.href.includes("callback") ){
        code = queryString.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
        window.sessionStorage.setItem("token",code);
        window.sessionStorage.setItem("autho",true);
        window.history.pushState("", "", redirect_uri);
    }



    if(window.sessionStorage.getItem("autho")){
        document.querySelector(".login").classList.toggle("display__none");
        fetch('https://api.spotify.com/v1/me',{
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ window.sessionStorage.getItem("token")
            }
        }).then((res) =>res.json()).then((data)=>{
            const main = document.querySelector(".main_autho");
            const new_name = document.createElement("h3");
            new_name.classList.add("user__name")
            new_name.textContent = data.display_name;
            const new_exit = document.createElement("button");
            new_exit.textContent = "exit";
            new_exit.classList.add("buttonClear");
            new_exit.classList.add("button__exit");
            new_exit.addEventListener("click",function(){
                window.localStorage.clear();
                location.reload();
            }) 
            main.appendChild(new_name);
            main.appendChild(new_exit);
        })
    }
}

