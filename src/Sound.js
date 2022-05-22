function sound  (){
    const element = this;
    if(element.preview_url==null){
        document.querySelector(".error__container").classList.add("display__flex");   
        document.querySelector(".error__message").textContent = "Этот трек нельзя прослушать";            
    }
    else{
        document.querySelector(".audio").setAttribute("src",element.preview_url);
        document.querySelector(".audio__visible").classList.add("display__flex");
        document.querySelector(".play-name").textContent = element.name;
        document.querySelector(".audio__visible").setAttribute("playing","false");
        document.querySelector(".play-btn").innerHTML="►";
            
        
    }
}

export default sound;