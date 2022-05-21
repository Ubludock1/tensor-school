function Head(data,flag){
    if(flag){
        const head_img = document.querySelector(".playlist-img");
        const opis = document.querySelector(".playlist-opis");
        const type = document.querySelector(".palylist-name");
        type.textContent = data.type.toUpperCase();
        opis.textContent = data.label;
        head_img.setAttribute("src",data.images[0].url);
    }
    const head = document.querySelector(".playlist-head");
    head.textContent = data.name;
}
export {Head};