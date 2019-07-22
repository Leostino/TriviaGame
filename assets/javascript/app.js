$(document).ready(function () {

    $("h3").hide();

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
    question: "what year was Arsenal founded?",
    options: ["1960","1913","1876","1926"],
    correct: "1"
  }, {
    question: "who is Arsenal's all time leading goal scorer?",
    options: ["Dennis Bergkamp","Kanu Nwankwo","Ian Wright","Thierry Henry"],
    correct: "3"
  }, {
    question: "how many premier league titles does Arsenal have?",
    options: ["10","6","14","20"],
    correct: "2"
  }, {
    question: "who was the longest serving coach of Arsenal?",
    options: ["Arsene Wenger","George Graham","Jose Mourinho","Alex Ferguson"],
    correct: "0"
  }, {
    question: "who is the owner of Arsenal FC?",
    options: ["Aliko Dangote","Donald Trump","Oleg Usmanov","Stan Kroenke"],
    correct: "3"
  }, {
    question: "Arsenal recently appointed who as their technical director?",
    options: ["Patrick Vieira","Ricardo Edu","Gilberto Silva","Sol Campbell"],
    correct: "1"
  }, {
    question: "what was Arsenal's position in the league last season?",
    options: ["1st","4th","5th","7th"],
    correct: "2"
  }, {
    question: "what was the last trophy Arsenal won?",
    options: ["Champions League","Premier League","FA Cup","Carling Cup"],
    correct: "2"
  }, {
    question: "who is the current coach of Arsenal FC?",
    options: ["Arsene Wenger","Unai Emery","Jurgen Klopp","David Moyes"],
    correct: "1"
  }, {
    question: "who is the current captain of Arsenal FC?",
    options: ["Mesut Ozil","Granit Zhaka","Laurent Kosielny","Nacho Monreal"],
    correct: "2"
  }];

    startGame();
    function startGame () {
    $("#start").on("click", function() {
        $("#start").hide();
        $("h3").show();
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
        $("#question").append("<button class= answersAll id=" + i + ">" + showOptions + "</button>");
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
            $("#question").append("<div>THE CORRECT ANSWER IS: " + triviaGame[indexQandA].options[correct]+"</div>");
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
        $("#remaining-time").append("<h3>YOU HAVE ANSWERED CORRECTLY!</h3>").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $("#remaining-time").append("<h3>YOU HAVE ANSWERED INCORRECTLY!</h3>").css({
            "color": "#3D414F"
        });
        resetRound();

    }

    function unAnswered() {
       unansweredQuestions++;
       $("#remaining-time").append("<h3>YOU FAILED TO CHOOSE AN ANSWER</h3>").css({
            "color": "#3D414F"
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

