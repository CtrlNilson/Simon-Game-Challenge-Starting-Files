const buttonColors = ["blue", "red", "green", "yellow"];
let randomNumber = nextSequence();
let randomChosenColor = buttonColors[randomNumber];

function nextSequence(){
    return Math.floor(Math.random() *(buttonColors.length-1));
}

let gameRunningState = true;
let gamePattern = [randomChosenColor];
let inputPattern = [];

let score = 0;
let highscore = 0;

const buttons = [
    {color: "red",
     htmlElement: $("#red"),
     sound: "./red.mp3"
    },
    {color: "yellow",
     htmlElement: $("#yellow"),
     sound: "./yellow.mp3"
    },
    {color: "green",
     htmlElement: $("#green"),
     sound: "./green.mp3"
    },
    {color: "blue",
     htmlElement: $("#blue"),
     sound: "./blue.mp3"
    }
];

buttons.forEach(button => {
    button.htmlElement.click(() => {
        button.htmlElement.addClass("pressed");
        setTimeout(function(){
            button.htmlElement.removeClass("pressed");
        }, 100);

        inputPattern.push(button.color);
        //console.log(inputPattern);
        //console.log(gamePattern);

        if(JSON.stringify(inputPattern) === JSON.stringify(gamePattern)){
            nextRound();
        }else if(inputPattern[inputPattern.length-1] != gamePattern[inputPattern.length-1]){
            gameOver();
        }
    })
});

gameStateHandling(gameRunningState);

function nextRound(){
    gamePattern.push(buttonColors[nextSequence()]);
    executeRound();
    inputPattern = [];
    score++;
}

function executeRound(){
    ($("h1").text(`Level ${gamePattern.length}`));

    setTimeout(() => {
        $(`#${gamePattern.slice(-1)}`).addClass("pressed");
        new Audio(`./sounds/${gamePattern.slice(-1)}.mp3`).play();
        setTimeout(function(){
            $(`#${gamePattern.slice(-1)}`).removeClass("pressed");            
        }, 100);
    }, 500);
}

function gameOver(){
    //console.log("INCORRECT");
    gameRunningState = false;
    gamePattern = [randomChosenColor];
    //console.log(gamePattern[0]);
    inputPattern = [];
    $("body").addClass("game-over");
    new Audio(`./sounds/wrong.mp3`).play();
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 150);
    ($("h1").text("Game Over, Press Any Key to Restart"));
    gameStateHandling(gameRunningState);
    if(score>highscore){
        highscore = score;
        $("#highscore").text(`Highscore: ${highscore}`);
    }
    score = 0;
}

function gameStateHandling(state){
    if(state){
        $(document).off("keypress");
        $(document).on("keypress",(e) => {
            if(e.code == "KeyA"){
                executeRound();
            }
        });
    }else{
        $(document).off("keypress");
        $(document).on("keypress",() => {
            executeRound();
        });
    }
};

