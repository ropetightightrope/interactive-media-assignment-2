const button1 = document.getElementById('button1');
let audio1 = new Audio();
audio1.src = 'ghost pad.wav';


button1.addEventListener('click', function(){

    audio1.play();
    audio1.addEventListener('playing')




})