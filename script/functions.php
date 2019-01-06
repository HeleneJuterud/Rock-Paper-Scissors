<?php
session_start();


function crownWinner(){
  $userChoice = $_POST['weapon'];
  switch(mt_rand(1,3)){
    case 1:
      $cleaver_choice = "Paper";
      break;
    case 2:
      $cleaver_choice = "Scissors";
      break;
    case 3:
      $cleaver_choice =  "Rock";
      break;
  }

  if($userChoice === $cleaver_choice){
      $winner = "tie";

  }
  else {
    if(($cleaver_choice == "Paper" && $userChoice == "Scissors") || ($cleaver_choice == "Scissors" && $userChoice == "Rock") || ($cleaver_choice == "Rock" && $userChoice == "Paper")){
      $winner = "win";
    }
    else {
      $winner = "loss";
    }
  }

  switch($winner){
    case "win":
        $_SESSION['score']++;
    break;

    case "loss":
        $_SESSION['score'] = 0;
    break;

    case "tie";
    break;
  }


$result = [
    'score' => $_SESSION['score'],
    'winner' => $winner,
    'cleaver' => $cleaver_choice,
];
 echo json_encode($result);
}
    /* Backup if score session not sat*/
    if(!isset($_SESSION['score']))
        $_SESSION['score'] = 0;


    switch($_POST["action"]){
      case "newgame":
      echo $_SESSION['score'] = 0;
      break;

      case "crownWinner":
      crownWinner();
      break;

    }

 ?>
