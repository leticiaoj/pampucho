window.addEventListener("resize", function(){
    const video = document.querySelector(".video1");
    const section = document.querySelector(".section");
    const overlay = document.querySelector(".overlay");   
    
    section.style.height = video.offsetHeight + "px";
    overlay.style.height = video.offsetHeight + "px";

}, true)