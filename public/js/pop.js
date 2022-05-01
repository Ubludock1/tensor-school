import {getToken} from "./getToken.js";
if(window.location.hash){
    fetch(window.location.hash.slice(1),{
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ await getToken()
        }
    }).then((res)=>{
        if(!res.ok){
            return Promise.reject(res.status);
        }
        else{
            return res.json()
        }
    }).then((data) => {
        const head = document.querySelector(".playlist-head");
        head.textContent = data.name;
    }).catch(function(error){
        switch(error){
            case 403:
                document.querySelector(".error__message").textContent = "Недоступен в этой стране";
                break;
            case 401:
                document.querySelector(".error__message").textContent = "Ошибка сервера";
                break;
        }
        document.querySelector(".error__container").style.display="flex";
    })
    
    fetch(window.location.hash.slice(1)+"/playlists",{
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ await getToken()
        }
    }).then((res)=>{
        if(!res.ok){
            return Promise.reject("В вашей стране запрещен спотифай");
        }
        else{
            return res.json()
        }
    }).then((data) => {
        const main_content = document.querySelector(".main__content-list");
        data.playlists.items.forEach(element => {
            const new_li = document.createElement("li");
            const new_a = document.createElement("a");
            new_a.setAttribute("href","playlist.html"+"#"+element.href);
            const new_img = document.createElement("img");
            const url = element.images[0].url;
            const new_h3 = document.createElement("h3");
            new_h3.classList.add("main__content-head");
            new_h3.textContent = element.name;
            new_img.classList.add("main__content-img");
            new_img.setAttribute("src",url)
            new_li.classList.add("main__content-item");
            new_a.appendChild(new_img);
            new_a.appendChild(new_h3);
            new_li.appendChild(new_a);
            main_content.appendChild(new_li);
        });
    }).catch(function(error){
        switch(error){
            case 403:
                document.querySelector(".error__message").textContent = "Недоступен в этой стране";
                break;
            case 401:
                document.querySelector(".error__message").textContent = "Ошибка сервера";
                break;
        }
        document.querySelector(".error__container").style.display="flex";
    })
}