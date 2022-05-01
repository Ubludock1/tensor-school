import {getToken} from "./getToken.js";

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

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
        const head_img = document.querySelector(".playlist-img");
        const opis = document.querySelector(".playlist-opis");
        const type = document.querySelector(".palylist-name");
        type.textContent = data.type.toUpperCase();
        opis.textContent = data.label;
        head_img.setAttribute("src",data.images[0].url);
        head.textContent = data.name;

        const tabel = document.querySelector(".main__table");

        var count = 0;

        data.tracks.items.forEach(element => {
            count++;
            const new_tr = document.createElement("tr");
            new_tr.setAttribute("track",element.preview_url);
            new_tr.addEventListener("click",function(){
                if(element.preview_url==null){
                    document.querySelector(".error__container").style.display="flex";   
                        document.querySelector(".error__message").textContent = "Этот трек нельзя прослушать";                 
                }
                else{
                    if(this.getAttribute("track")!=null){
                        document.querySelector(".audio").setAttribute("src",this.getAttribute("track"));
                        document.querySelector(".audio__visible").style.display="flex";
                        document.querySelector(".play-name").textContent = element.name;
                        document.querySelector(".audio__visible").setAttribute("playing","false");
                        document.querySelector(".play-btn").innerHTML="►";
                    }
                }
            })
            new_tr.classList.add("table-row-item");

            const new_td_number = document.createElement("td");
            new_td_number.classList.add("table-item");
            new_td_number.classList.add("table-number");
            new_td_number.textContent = count;

            const new_td_item = document.createElement("td");
            new_td_item.classList.add("table-item");

            const new_content = document.createElement("div");
            new_content.classList.add("table-content");

            const new_img = document.createElement("img");
            new_img.classList.add("table-img");
            new_img.setAttribute("src",data.images[0].url);

            const new_text = document.createElement("div");
            new_text.classList.add("table-text");

            const new_h4 = document.createElement("h4");
            new_h4.classList.add("table-text-head");

            const new_p = document.createElement("p");
            new_p.classList.add("table-author");

            const new_td_album = document.createElement("td");
            new_td_album.classList.add("table-albom");

            const new_td_time = document.createElement("td");
            new_td_time.classList.add("table-time");
            new_h4.textContent = element.name;
            new_p.textContent = element.artists[0].name;
            new_td_album.textContent = data.name;
            new_td_time.textContent = millisToMinutesAndSeconds(element.duration_ms);


            new_content.appendChild(new_img);
            new_text.appendChild(new_h4);
            new_text.appendChild(new_p);
            new_content.appendChild(new_text);
            new_td_item.appendChild(new_content);

            new_tr.appendChild(new_td_number);
            new_tr.appendChild(new_td_item);
            new_tr.appendChild(new_td_album);
            new_tr.appendChild(new_td_time);

            tabel.appendChild(new_tr);
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