const state= {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        panel: document.querySelector(".panel")
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLives: 3
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent= state.values.currentTime;

    if(state.values.currentTime <= 0)
        gameOver();
};

function playSound(audioName){
    let audio= new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume= 0.2;
    audio.play();
};

function randomSquare(){
    state.view.squares.forEach(square =>
        square.classList.remove("enemy")
    );

    const randomNumber= Math.floor(Math.random() * 9);
    const randomSquare= state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition= randomSquare.id;
};

function addListenerHitBox(){
    state.view.squares.forEach(square => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent= state.values.result;
                state.values.hitPosition= null;
                playSound("hit");
            }else{
                state.values.currentLives--;
                state.view.lives.textContent= state.values.currentLives;
                playSound("fail");

                if(state.values.currentLives <= 0)
                    gameOver();
            }
        });
    });
};

function disableHitBox(){
   const disabler= document.createElement("div");
   disabler.classList.add("disabler");
   state.view.panel.appendChild(disabler);
};

function gameOver(){
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert(`Game Over! O seu resultado foi: ${state.values.result}`);
    disableHitBox();
};

function init(){
    addListenerHitBox();
};

init();