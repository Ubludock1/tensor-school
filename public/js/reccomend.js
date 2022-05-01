import {getToken} from "./getToken.js";
fetch('https://api.spotify.com/v1/albums?ids=6aSk2vxoY3xtz7cXKuY9EL,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',{
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
        data.albums.forEach(el => {
            const container = document.querySelector(".main__content");

            const new_content = document.createElement("div");
            new_content.classList.add("main__playlist");

            const new_a = document.createElement("a");
            new_a.classList.add("main__playlist-link");
            const new_h2 = document.createElement("h2");
            new_h2.classList.add("main__head"); 
            new_h2.textContent = el.name;
            new_a.setAttribute("href","album.html"+"#"+el.href);
            new_a.appendChild(new_h2);

            const new_list = document.createElement("ul");
            new_list.classList.add("main__content-list");


            el.tracks.items.forEach(element => {
                const new_item = document.createElement("li");
                new_item.classList.add("main__content-item");
                
                const new_link = document.createElement("a");
                new_link.classList.add("main__content-item-link");
                new_link.setAttribute("href","album.html"+"#"+el.href);
                new_link.addEventListener("click",function(e){
                    e.preventDefault();
                })
                
                const new_img = document.createElement("img"); 
                new_img.classList.add("main__content-img");
                new_img.setAttribute("src",el.images[0].url);
                
                const new_h3 = document.createElement("h3");
                new_h3.classList.add("main__content-head");
                new_h3.textContent = element.name;
                
                const new_p = document.createElement("p");
                new_p.classList.add("main__content-desc");
                new_p.textContent = element.description;

                new_link.appendChild(new_img);
                new_link.appendChild(new_h3);
                new_link.appendChild(new_p);
                new_item.appendChild(new_link);
                new_item.setAttribute("track",element.preview_url);
                new_item.addEventListener("click",function(){
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
                new_list.appendChild(new_item);
            });

            new_content.appendChild(new_a);
            new_content.appendChild(new_list);
            container.appendChild(new_content);
        })
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