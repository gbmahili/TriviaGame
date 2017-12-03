$(document).ready(function () {

    

    var gbmTrivia = {
        secondsRemaining : 10,
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
        },
        startSecondCounter : function () {
            //Set counter to 30:
            //this.secondsRemaining = 30;
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
                        //Set the remaining seconds back to 30
                        gbmTrivia.secondsRemaining = 10;
                        //Reduce the remaining number of questions
                        gbmTrivia.questionsRemaining--;
                        //Show the Wining or losing message
                        $("#questionsRemaining").text(gbmTrivia.questionsRemaining);
                    }, 6000);
                    
                }
                
                 
                
            }, 1000);
                   
        }
    }

    //When a user clicks on 'Start Game':
    $("#startGame").click(gbmTrivia.startGame);
    //When a user clicks on 'Start Game':
    $('#show-instructions').click(gbmTrivia.showHideInstructions);
});