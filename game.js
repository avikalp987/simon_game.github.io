var buttonColors = ["red","blue","green","yellow"]; //array of the colors

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).on("keypress",function()
{
    if(!started)
    {
        $("level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});
$(".btn").on("click",function()
{
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }
    else
    {
       playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);
        startOver();
        $("#level-title").text("Game over,Press any key to restart");
        
    }
}

function startOver()
{
    gamePattern = [];
    //userClickedPattern = [];
    level = 0;
    started = false;
}

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4); //generating a random number between 0 to 3
    var randomChosenColor = buttonColors[randomNumber]; //choosing a color according to the random number chosen
    gamePattern.push(randomChosenColor); //random chosen color is put into the game pattern array
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}
function playSound(identity)
{
    var audio = new Audio(identity + ".mp3");
    audio.play();
}
function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");//adding pressed class
    setTimeout(function()
    {
        $("#"+currentColor).removeClass("pressed");
    },100);
}