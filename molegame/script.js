const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('button');
const highScore = document.querySelector('.scores')
let lastHole;
let timeUp = false;
let score=0;
let scorearr = JSON.parse(localStorage.getItem('score')) || [];
//let namearr = JSON.parse(localStorage.getItem('names')) || [];

highScore.innerHTML = scorearr.map(score => {
    return `<li>${score}</li>`
}).join('');

function randomTime(min,max){
    return Math.round(Math.random()*(max-min) + min);
}

function randomHole(holes){
    const index = Math.floor(Math.random()*holes.length);
    const hole = holes[index];
    if(hole === lastHole){
        return randomHole(holes);
    }
    lastHole=hole;
    return hole;
}

function peep(){
    const time = randomTime(200,1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep();
    },time)
}

function startGame(){
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0 ;
    //const name = prompt("Enter you name")
    button.setAttribute('disabled', 'true');
    peep();
    setTimeout(()=> {
        timeUp = true;
        scorearr.push(score);
        localStorage.setItem('score', JSON.stringify(scorearr.slice(0,4)));
        //localStorage.setItem('names', JSON.stringify(namearr.slice(0,4)));
        button.removeAttribute('disabled', 'false')
        alert('Times Up!!!');
        highScore.innerHTML = scorearr.map(score => {
            return `<li>${score}</li>`
        }).join('');
    }, 10000);
}

function bonkOnHead(e){
    !e.isTrusted ?. return;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonkOnHead))