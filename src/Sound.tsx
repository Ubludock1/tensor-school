import React from "react";

function sound(element: { preview_url: string, name: string }, audio: React.RefObject<HTMLDivElement>, er: React.RefObject<HTMLDivElement>) {
    if (element.preview_url == null) {
        if (er.current != null) {
            er.current.classList.add("display__flex");
            er.current.children[1].textContent = "Этот трек нельзя прослушать";
        }
    }
    else {
        if (audio.current != null) {
            audio.current.children[6].setAttribute("src", element.preview_url);
            audio.current.classList.add("display__flex");
            audio.current.children[1].textContent = element.name;
            audio.current.setAttribute("playing", "false");
            audio.current.children[0].innerHTML = "►";
        }
    }
}

export default sound;