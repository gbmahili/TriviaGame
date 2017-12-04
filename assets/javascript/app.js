$(document).ready(function () {

    var questionsList= [
        ["Who is the president of D.R.Congo?", "Joseph Kabila", ["Paul Kagame", "Paul Biya", "Yoweri Musevini", "Baraka Mahili"]],
        ["Which month does Winter officially ends in the USA?", "March", ["May", "December", "March", "August"]],
        ["Which popular Disney movie featured the song 'Circle of Life'?", "The Lion King", ["Aladin", "Hercules", "Mulan", "The Lion King"]],
        ["What is the capital of the North-Kivu region in the D.R.Congo?", "Goma", ["Butembo", "Goma", "Kinshasa", "Beni"]]
    ];
    //Create a random number from the list of questions
    var randomNumber = Math.floor(Math.random() * questionsList.length) + 1;
    //Pick random question
    var randomQuestion = questionsList[randomNumber];
    console.log(randomQuestion[0]);

    var gbmTrivia = {
        //Number of seconds remaining
        secondsRemaining : 10,
        //Number of questions in the game
        questionsRemaining: 4,        
        //Show or Hide instruction when the button is clicked
        showHideInstructions : function(){            
            $('#instructions').slideToggle("fast");        
        }, 
        startGame : function () {
            //Show First Trivia question/answer
            $(".questions, #selectAnswer").removeClass("hidden");
            //Hide the Start Game Button
            $("#startGame").hide();

            //Start the second count:
            gbmTrivia.startSecondCounter();
            gbmTrivia.populateQuestion();
        },
        startSecondCounter : function () {
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
                        //Call the NextQuestion function
                        gbmTrivia.goToNextQuestion();
                    }, 6000);                    
                }
                
            }, 1000);
                   
        },
        goToNextQuestion : function(){
            if (gbmTrivia.questionsRemaining > 0){            
                //Set the remaining seconds back to 30
                gbmTrivia.secondsRemaining = 10;
                //Reduce the remaining number of questions
                gbmTrivia.questionsRemaining--;
                //Show the Wining or losing message
                $("#questionsRemaining").text(gbmTrivia.questionsRemaining);
                //Show the Correct Answer
                //$("#correctAnswers").text(gbmTrivia.questionsRemaining);
            }
        },
        populateQuestion : () =>{
            //Set the questions field to a random question
            $(".questions").text(randomQuestion[0]);
            //Loop through a list of avaible answer choices
            for (let i = 0; i < randomQuestion[2].length; i++) {
                //Set the answer from the list questions 3rd element
                const questionChoice = randomQuestion[2][i];
                //Display the answers as a list
                $("#selectAnswer").append("<li>" + questionChoice + "</li>");
                
            }
            
        }
    }

    //Update the question and choices
    

    //When a user clicks on 'Start Game':
    $("#startGame").click(gbmTrivia.startGame);
    //When a user clicks on 'Start Game':
    $('#show-instructions').click(gbmTrivia.showHideInstructions);
    //When a user click on any list item
    $("#selectAnswer > li").click(gbmTrivia.goToNextQuestion);
});