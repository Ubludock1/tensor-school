import {getToken} from "./getToken.js";

const debounce = (fn,ms) => {
    let timeout;
    return function () {
        const fnCall = () => {fn.apply(this,arguments)}
        clearTimeout(timeout);
        timeout = setTimeout(fnCall,ms)
    }
}

async function search () {
    if(document.querySelector(".search").value!=""){
        document.querySelector(".search_container").classList.remove("hidden");
        fetch('https://api.spotify.com/v1/search?q=track:+'+document.querySelector(".search").value+'++&type=track',{
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
        }).then((data)=>{
            const container = document.querySelector(".search_container");
            container.innerHTML="";
            data.tracks.items.forEach(element => {
                const a = document.createElement("a");
                a.setAttribute("href","album.html"+"#"+element.album.href);
                a.classList.add("search_container_content");
                const div = document.createElement("div");
                const img = document.createElement("img");
                img.classList.add("search_container_img");
                const h4 = document.createElement("h4");
                h4.classList.add("search_container_name");
                h4.textContent = element.name;
                img.setAttribute("src",element.album.images[0].url);
                a.appendChild(img);
                a.appendChild(h4);
                div.appendChild(a);
                container.appendChild(div);
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
        });
    }
    else {
        document.querySelector(".search_container").classList.add("hidden");
    }
};
search = debounce(search,300);
document.querySelector(".search").addEventListener("keyup",async () => {
    await search();
})