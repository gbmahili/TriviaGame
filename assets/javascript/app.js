$(document).ready(function () {

    var questionsList= [
        ["Who is the president of D.R.Congo?", "Joseph Kabila", ["Paul Kagame", "Paul Biya", "Joseph Kabila", "Baraka Mahili"]],
        ["Which month does Winter officially ends in the USA?", "March", ["May", "December", "March", "August"]],
        ["Which popular Disney movie featured the song 'Circle of Life'?", "The Lion King", ["Aladin", "Hercules", "Mulan", "The Lion King"]],
        ["What is the capital of the North-Kivu region in the D.R.Congo?", "Goma", ["Butembo", "Goma", "Kinshasa", "Beni"]]
    ];
    var selectedAnswer;

    var gbmTrivia = {
        //Number of seconds remaining
        secondsRemaining : 5,
        //Number of questions in the game
        questionsRemaining: 4,
        wins: 0,
        losses: 0,        
        //Show or Hide instruction when the button is clicked
        showHideInstructions : function(){            
            $('#instructions').slideToggle("fast");        
        }, 
        startGame: () => {   
            //Show First Trivia question/answer
            $(".questions, #selectAnswer").removeClass("hidden");
            //Hide the Start Game Button
            $("#startGame").hide();
            //Populate the question
            gbmTrivia.populateQuestion();
            //Start the second count:
            gbmTrivia.startSecondCounter();           
        },
        startSecondCounter: () => {   
            //Start the second counter
            var secondsInterval = setInterval(function () {
                //Check if conds are greater than 1
                if(gbmTrivia.secondsRemaining >= 0){
                    //Reduce the seconds remaining:
                    //#Check if the seconds remaining are less that 10
                    if (gbmTrivia.secondsRemaining < 10) {
                        //Add a 0 in front of numbers less than 10
                        $("#secondsRemaining").text("0" + gbmTrivia.secondsRemaining--);
                    } else {
                        $("#secondsRemaining").text(gbmTrivia.secondsRemaining--);
                    }
                }
                //Check if the remaining question is zero
                if (gbmTrivia.secondsRemaining == 0){
                    

                    //Show the winning gif

                    //Show the correct answer

                    //Show other questions

                    //Update the number of questions remaining
                    
                    //Wait for 5 seconds then reset the timer and start over
                    var wait5seconds = setTimeout(function () {
                        //Update wins or loses
                        gbmTrivia.calculateWinsLosses();
                        //Call the NextQuestion function
                        gbmTrivia.goToNextQuestion();
                        if (gbmTrivia.wins + gbmTrivia.losses == 4){
                            $("ul").empty();
                            $("#questionsRemaining").text("0");
                            $("#startOver").removeClass("hidden");
                            $(".questions").text("");
                            gbmTrivia.reset();
                            clearInterval(secondsInterval);
                        }
                    }, 6000);                    
                }
                
            }, 1000);
                   
        },
        goToNextQuestion: () => {            
            //console.log("Clicked");
            if (gbmTrivia.questionsRemaining >= 2){            
                //Set the remaining seconds back to 30
                gbmTrivia.secondsRemaining = 5;
                //Reduce the remaining number of questions
                gbmTrivia.questionsRemaining--;
                //Show the Wining or losing message
                $("#questionsRemaining").text(gbmTrivia.questionsRemaining);
                //Show the Correct Answer
                //Call the next question                
                gbmTrivia.populateQuestion();
            }
        },
        populateQuestion : () =>{            
            //Create the random number
            randomNumber = Math.floor(Math.random() * questionsList.length-1) + 1;
            //Create the random question
            randomQuestion = questionsList[randomNumber];
            //Set the questions field to a random question
            $(".questions").text(randomQuestion[0]);
            //Loop through a list of avaible answer choices
            $("ul").empty();
            for (let i = 0; i < randomQuestion[2].length; i++) {
                //Set the answer from the list questions 3rd element
                const availableAnswers = randomQuestion[2][i];
                //Display the answers as a list                
                $("#selectAnswer").append("<li class='availableAnswers'>" + availableAnswers + "</li>");                
            };
            //When a user click on any list item:
            $(".availableAnswers").click(function () {
                if(gbmTrivia.questionsRemaining != 0){
                    //Store the selected answer in a variable
                    selectedAnswer = $(this).text();
                    //Calculate the wins or loses
                    gbmTrivia.calculateWinsLosses();
                    //Go to the next question
                    gbmTrivia.goToNextQuestion();
                }
                
            });            
        },
        calculateWinsLosses : () => {
            //Check if user selected an answer
            if (selectedAnswer != "") {
                //Update Wins
                if (selectedAnswer == randomQuestion[1]) {
                    gbmTrivia.wins++;
                    // console.log(wins);
                    $("#correctAnswers").text(gbmTrivia.wins);
                    console.log("Yes, it is: " + selectedAnswer + ". Your wins are now: " + gbmTrivia.wins);
                }
                //Update Losses
                else {
                    gbmTrivia.losses++;
                    $("#wrongAnswers").text(gbmTrivia.losses);
                    console.log("Looser - The correct answer is: " + randomQuestion[1] + ". Your Losses are now: " + gbmTrivia.losses);
                }
            }else{
                selectedAnswer = "";
            }
            
        }, 
        reset : () => {
            console.log("reset started");
            gbmTrivia.questionsRemaining = 5;
            $("#questionsRemaining").text("4");
            gbmTrivia.wins = 0;
            $("#correctAnswers").text(gbmTrivia.wins);
            gbmTrivia.losses = 0;
            $("#wrongAnswers").text(gbmTrivia.losses);
        }, 
        startOver : () => {
            console.log("Game Restarted");
            //Hide the Start Game Button
            $("#startOver").addClass("hidden");
            //Put the next question in queue
            gbmTrivia.goToNextQuestion();
            //Start the game
            gbmTrivia.startGame();
        }
    }
    

    //When a user clicks on 'Start Game':
    $("#startGame").click(gbmTrivia.startGame);
    //Start Over:
    $("#startOver").click(gbmTrivia.startOver);
    //When a user clicks on 'Start Game':
    $('#show-instructions').click(gbmTrivia.showHideInstructions);
    
});