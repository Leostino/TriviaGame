$(document).ready(function () {

    $("h3").hide();
    $("#game").hide();
    $("#game-container").hide();

   var correctAnswers = 0;
   var incorrectAnswers = 0;
   var unansweredQuestions = 0;
   var indexQandA = 0;
   var timeRemaining = 15;
   var timerOn = false;
   var answered = false;
   var intervalId;
   var correct;

   var triviaGame = [{
    question: "WHAT YEAR WAS ARSENAL FOUNDED?",
    options: ["1960","1913","1876","1926"],
    correct: "1"
  }, {
    question: "WHO IS ARSENAL'S ALL TIME LEADING GOAL SCORER?",
    options: ["DENNIS BERGKAMP","KANU NWANKWO","IAN WRIGHT","THIERRY HENRY"],
    correct: "3"
  }, {
    question: "HOW MANY PREMIER LEAGUE TITLES DOES ARSENAL HAVE?",
    options: ["10","6","14","20"],
    correct: "2"
  }, {
    question: "WHO WAS THE LONGEST SERVING COACH OF ARSENAL FC?",
    options: ["ARSENE WENGER","GEORGE GRAHAM","JOSE MOURINHO","ALEX FERGUSON"],
    correct: "0"
  }, {
    question: "WHO IS THE OWNER OF ARSENAL FC?",
    options: ["ALIKO DANGOTE","DONALD TRUMP","OLEG USMANOV","STAN KROENKE"],
    correct: "3"
  }, {
    question: "ARSENAL RECENTLY APPOINTED WHO AS THEIR TECHNICAL DIRECTOR?",
    options: ["PATRICK VIEIRA","RICARDO EDU","GILBERTO SILVA","SOL CAMPBELL"],
    correct: "1"
  }, {
    question: "WHAT WAS ARSENAL'S POSITION IN THE LEAGUE LAST SEASON?",
    options: ["1st","4th","5th","7th"],
    correct: "2"
  }, {
    question: "WHAT WAS THE LAST TROPHY WON BY ARSENAL FC?",
    options: ["CHAMPIONS LEAGUE","PREMIER LEAGUE","FA CUP","CARLING CUP"],
    correct: "2"
  }, {
    question: "WHO IS THE CURRENT COACH OF ARSENAL FC?",
    options: ["ARSENE WENGER","UNAI EMERY","JURGEN KLOPP","DAVID MOYES"],
    correct: "1"
  }, {
    question: "WHO IS THE CURRENT CAPTAIN OF ARSENAL FC?",
    options: ["MESUT OZIL","GRANIT ZHAKA","LAURENT KOSIELNY","NACHO MONREAL"],
    correct: "2"
  }];

    startGame();
    function startGame () {
    $("#start").on("click", function() {
      $("#start").hide();
      $("h3").show();
      $("#game").show();
      $("#game-container").show();
      indexQandA = 0;
      correctAnswers = 0;
      incorrectAnswers = 0;
      unansweredQuestions = 0;
      loadQandA();
    });

    }
  

     
    function loadQandA() {
     answered = false;
     timeRemaining = 15;
     intervalId = setInterval(timer, 1000)
     if(answered === false) {
        timer();
     }
     var question = triviaGame[indexQandA].question;
     correct = triviaGame[indexQandA].correct;
     $("#question").html(question);
     for (var i = 0; i < 4; i++) {
        var showOptions = triviaGame[indexQandA].options[i];
        console.log(showOptions);
        $("#question").append("<br><div class= answersAll><button id=" + i + ">" + showOptions + "</button></div>");
      }

      $("button").on("click", function(){
          var clicked = $(this).attr("id");
          if(clicked === correct) {
              answered = true;
              $("#question").append("<div>THE ANSWER IS: " + triviaGame[indexQandA].options[correct]+"</div");
              correctAnswer();
          }else{
            answered = true; //stops the timer
            $("#question").append("<div>YOU CHOSE: " + triviaGame[indexQandA].options[clicked] + ".....HOWEVER THE ANSWER IS: " + triviaGame[indexQandA].options[correct]+"</div>");
            incorrectAnswer();
          }

         });

    }

       function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalId);
            $("#remaining-time").append("<div>THE CORRECT ANSWER IS: " + triviaGame[indexQandA].options[correct]+"</div>");
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalId);
        } else {
            timeRemaining--;
            $("#remaining-time").html(timeRemaining);
        }
    }


    function correctAnswer() {
        correctAnswers++;
        $("#remaining-time").append("<h6>YOU HAVE ANSWERED CORRECTLY!</h6>").css({
            "color": "#ffffff"
        });
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $("#remaining-time").append("<h6>YOU HAVE ANSWERED INCORRECTLY!</h6>").css({
            "color": "#ffffff"
        });
        resetRound();

    }

    function unAnswered() {
       unansweredQuestions++;
       $("#remaining-time").append("<h6>YOU FAILED TO CHOOSE AN ANSWER</h6>").css({
            "color": "#ffffff"
        });
        resetRound();
    }

    function resetRound() {;
        indexQandA++; // increments index which will load next question when loadQandA() is called again
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
            }, 5000); // removes answer image from previous round
        } else {
            setTimeout(function () {
                $("#question").remove();
                $("#remaining-time").remove();
                $("h3").remove();
                $("#game").append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
                $("#game").append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
                $("#game").append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 7000);
            }, 5000);
        }
    };

});

