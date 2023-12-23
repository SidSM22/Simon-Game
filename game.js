var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$("body").on("keypress",function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});
// for user choosing colors
$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    animatepress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


//computer choosing colors
function  nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColours=buttonColours[randomNumber];
    gamePattern.push(randomChosenColours);  
    $("#"+randomChosenColours).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColours);
    $("#level-title").text("Level "+level);
    level++;
}

//sound playing
function playSound(name){
    var sounds=new Audio("sounds/"+name+".mp3");
    sounds.play();
}

//press animation
function animatepress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
         //currentlevel is passed as userclickedpattern-1 means last index ,so if last index is same as userclicked last index then success
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length){  
            //if length of both patterns will be same then automatically they are equal.
            //nextsequence will call after the delay of 1sec 
            setTimeout(function(){
                nextSequence();
            },1000)
            userClickedPattern=[];
        }
    }
    else{
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        playSound("wrong");
        console.log("Fail");
        restart();
    }
}

function restart(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
}