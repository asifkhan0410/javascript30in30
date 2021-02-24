let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const startTime = document.querySelector('.timer__start');

function timer(seconds){

    //clear existing coutdowns
    clearInterval(countdown);
    timerDisplay.removeAttribute('contenteditable','false');
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    startTime.setAttribute('disabled','true');
    countdown = setInterval(() =>{
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check to stop it.
        if(secondsLeft <0){
            clearInterval(countdown);
            startTime.removeAttribute('disabled','false');
            timerDisplay.setAttribute('contenteditable','true');
            return;
        }
        //display time;
        displayTimeLeft(secondsLeft);
        
    },1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds/60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds<10? '0': ''}${remainderSeconds}`
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes} ${hour>12? "PM": "AM"}`;
  }

  function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
  }

  startTime.addEventListener('click', ()=>{
    const time = timerDisplay.innerHTML;
    const splittime = time.split(':');
    const seconds = splittime[0]*60 + Number(splittime[1]);  
    timer(seconds);  
});


buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
  });
  