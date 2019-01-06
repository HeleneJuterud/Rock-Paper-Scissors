
function getScoreboard(){
  /*
    Call database get top 10 scores.
  */
}
function checkIfHighscore(score){
  /*
    gethighscorelist.
    if score higher than score on top 10,
      -> If yes,  prompt save score
      -> If no,  prompt message saying score not high enough.

  */
}

function saveScore(){
  /*
    Open modal with input name and show score
    if cancel
      -> Close modal and startGame(true)

    If save
      -> Call database and insert score and delete the lowest score
  */
}



var vm = function() {
  var self = this;
  self.playerScore = ko.observable(0);
  self.winner = ko.observable("");
  self.cleaverSpeech = ko.observable("I challenge you to a match of <strong>Rock Paper Scissors!</strong>");
  self.previousResult = ko.observable("");

  // Start game, and show alternative btns
  self.startGame = function(newgame){
      $.ajax({
        url:"script/functions.php",
        type: "post",
        dataType: 'json',
        data: {action: "newgame"},
     }).done(function() {
       self.cleaverSpeech("Choose your weapon!");
       $("#Play").hide();
       $("#Rock").show();
       $("#OptionPlanks").show();
     });
  }

  self.resetGame = function(){
    $("#Rock").hide();
    $("#OptionPlanks").hide();
    $("#Play").show();
  }
  self.playRound = function(weapon){
    $.ajax({
            url:"script/functions.php",
            type: "post",
            dataType: 'json',
            data: {action: "crownWinner", weapon: weapon},
            success:function(data){
                self.playerScore(data.score);
                switch(data.winner){
                    case "win":
                    self.previousResult("win");
                    self.cleaverSpeech("<span> " + weapon + "! Oh.. <strong>You win</strong>, let's go again!</span>");
                    break;

                    case "loss":
                    /*Check if on scoreboard, show modal based on what result*/
                    self.previousResult("loss");
                    self.cleaverSpeech("<span>" + data.cleaver + "! Haha!<strong> I win!</strong></span> Want to challenge me again?");
                    self.resetGame();
                    break;

                    case "tie":
                    if(self.previousResult() == "tie"){
                      self.cleaverSpeech("<span><strong>Tied again!?</strong> You reading my mind?</span>");
                    }
                    else {
                      self.previousResult("tie");
                      self.cleaverSpeech("<span><strong>Copy cat!</strong> I also picked " + weapon + "</span>");
                    }
                    break;
                }
           }
         });
  }

} // End VM function

var viewmodel = new vm(vm);
ko.applyBindings(vm);

$("#Play").click(function(){
  viewmodel.startGame("newgame");
});

$("#Rock").click(function(){
  viewmodel.playRound("Rock");
});

$("#Paper").click(function(){
  viewmodel.playRound("Paper");
});

$("#Scissor").click(function(){
  viewmodel.playRound("Scissors");
});
