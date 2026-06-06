const stations =
document.querySelectorAll(".station");

const modal =
document.querySelector(".modal");

const close =
document.querySelector(".close");

stations.forEach(station=>{

station.addEventListener("click",()=>{

modal.style.display="block";

});

});

close.addEventListener("click",()=>{

modal.style.display="none";

});

window.addEventListener("click",(e)=>{

if(e.target===modal){

modal.style.display="none";

}

});

const topBtn =
document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY > 300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});