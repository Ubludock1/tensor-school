
   const av = document.querySelector(".audio");
   const playBtn=document.querySelector(".play-btn");
   const playTime = document.querySelector(".play-time");
   const curTime=document.querySelector(".cur-time");
   const volPlus = document.querySelector(".vol-plus");
   const volMinus = document.querySelector(".vol-minus");
   const speaker=document.querySelector(".speaker");
      
   
   av.addEventListener("loadedmetadata",function(){
      curTime.max=av.duration;
   })

   av.addEventListener("timeupdate",function(){
      var sec_num = av.currentTime;
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);
      seconds=Math.round(seconds);
   
      if (hours < 10) {
         hours = "0"+hours;
      }
      if (minutes < 10) {
         minutes = "0"+minutes;
      }
      if (seconds < 10) { seconds = "0"+seconds; }{
         playTime.innerHTML = minutes+':'+seconds
      }; 
      if(document.querySelector(".audio__visible").getAttribute("playing") == "true"){
         curTime.value=av.currentTime
      };
   })
   
   volPlus.addEventListener("click",function(){
      if(av.volume<1){
          av.volume+=0.1;
      }
   });
   
   volMinus.addEventListener("click",function(){
      if(av.volume>0.1){
          av.volume-=0.1;
      }
   });
   
   curTime.addEventListener("change",function(){
      av.play();
      document.querySelector(".audio__visible").setAttribute("playing","true");
      playBtn.innerHTML="❚❚";
      av.currentTime=curTime.value;
   })
   
   playBtn.addEventListener("click", (a)=> {
      if(document.querySelector(".audio__visible").getAttribute("playing") == "true")
      {
         av.pause();
         document.querySelector(".audio__visible").setAttribute("playing","false");
         playBtn.innerHTML="►";
      }
      else
      {
         av.play();
         document.querySelector(".audio__visible").setAttribute("playing","true");
         playBtn.innerHTML="❚❚";
      }
   });    