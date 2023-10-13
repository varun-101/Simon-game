
var buttonColors = ["red", "blue","green","yellow"];
var randomnumber;
var randomChoosenColor;
var gamePattern=[];
var userClickedPattern = [];
//var i = 0;
var level = 0;
var started = true;


$(document).keypress(function(){
    if(started){
        nextSequence();
        started = false;
    }
})


$(".btn").click(function(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    console.log(userClickedPattern);
    playSound(userChoosenColor);   
    animatePress(userChoosenColor); 
    checkAnswer((userClickedPattern.length)-1);
})


// function handler(){
//     var userChoosenColor = $(this).attr("id");
//     console.log(userClickedPattern.push(userChoosenColor));

// }


function nextSequence(){
    userClickedPattern = [];
    randomnumber = Math.floor(Math.random()*4);
   // console.log(randomnumber);
    randomChoosenColor = buttonColors[randomnumber];
    gamePattern.push(randomChoosenColor);
    console.log(gamePattern);
    $("#"+randomChoosenColor).fadeOut(100);
    $("#"+randomChoosenColor).fadeIn(100);
    playSound(randomChoosenColor);
    level++;
    $("h1").text("Level "+level);
}

// while(i<10)
// {
//     nextSequence();
//     $("button").on("click",handler());
//     handler();
//    // i++;
// }


//now we gotta play 
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

//ANIMATION
function animatePress(currentColor){
    $('#'+currentColor).addClass("pressed");
    setTimeout(() => {
        $('#'+currentColor).removeClass("pressed");
    }, 100);
}

//validation
function checkAnswer(index){
    
    if(gamePattern[index]!==userClickedPattern[index])
    {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press any key to Restart");
        startOver();
    }
       
    if(gamePattern.length == userClickedPattern.length)
    {
        if(gamePattern[index]==userClickedPattern[index]){
        
            setTimeout(() => {
                nextSequence();
            }, 1000);  
        }
        
    } 
}

function startOver(){
    level = 0;
    gamePattern = [];
   
    started = true;
}




