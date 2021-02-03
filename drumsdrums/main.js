function playSound(e){                
    const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!audio) return;
    audio.currentTime= 0;
    audio.play()
    key.classList.add("playing")
}
 function playmobileSound( e){
    console.log(e)
    const audiomobile = document.querySelector(`audio[data-key='${e.path[0].parentNode.dataset.key}']`);
    const keymobile = document.querySelector(`.key[data-key="${e.path[0].parentNode.dataset.key}"]`);
    if(!audiomobile) return;
    audiomobile.currentTime = 0;
     audiomobile.play();
    keymobile.classList.add("playing");
}

function removeTransition(e){
    if(e.propertyName !== 'transform') return; // skip the key if it is not transform
    this.classList.remove("playing");
}

const keys = document.querySelectorAll('.key')
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
// keys.forEach(key => key.addEventListener('touchend', removeTransition));
window.addEventListener("keydown", playSound);
window.addEventListener("click", playmobileSound);