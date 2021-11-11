buttonColors = ["red","blue","green","yellow"];
gamePattern =[];
userClickedPattern = [];

var started = false;
var level = 0;



$(document).keypress(function() {
  if (!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function()
{
  var userChosenColour = ($(this).attr("id"));
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour+".mp3");


  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
  {
    console.log("Success");
    if(userClickedPattern.length == gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    console.log("failure");
    (new Audio("wrong.mp3")).play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game over!! Press any Key to restart.");
    startOver();
  }

}


function nextSequence()
{
  userClickedPattern = [];
  level=level+1;
  $("#level-title").text("Level "+level);

  var randomnumber=(Math.floor(4*Math.random()));
  var randomColor = buttonColors[randomnumber];
  gamePattern.push(randomColor);

  $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor+".mp3");

}



function playSound(name)
{
  (new Audio(name)).play();
}

function animatePress(currentcolor)
{

  $("#"+currentcolor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentcolor).removeClass("pressed");
  },100);
}
function startOver()
{
  started = false;
  level=0;
  gamePattern=[];
}
