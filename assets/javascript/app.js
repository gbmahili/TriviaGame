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
        secondsRemaining : 15,
        //Number of questions in the game
        questionsRemaining: 4,
        wins: 0,
        losses: 0,
        unanswered: 0,        
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
        getGifImages : () => {
            //Instantiate the queryTerm to be used based on wins or losses
            queryTerm;  
            //API Entry point url
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + queryTerm + "&limit=5";
            //Call the ajax method to process the gif then do something with it
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function (response) {
                //Store the array of losers images
                var gifArray = response.data;
                //Loop through the array and pick one image
                imgUrls = [];
                for (let i = 0; i < gifArray.length; i++) {
                    imgUrls.push(gifArray[i].images.original.url);
                }
                //Create a tag to store our image
                singleImage = $("<img>");

                //Create a random number that will get our url from the array
                singleImageUrl = Math.floor(Math.random() * imgUrls.length - 1) + 1;
                console.log(singleImageUrl);
                //Add a source attribute to the singleImage element with a value of the the random number image
                singleImage.attr("src", imgUrls[singleImageUrl]);
                //Add an alternative attribute with the Image Gif text
                singleImage.attr("alt", "Image Gif");
                //Append the umage to the Ul
                $("ul").append(singleImage);

            });

        },
        startSecondCounter: () => {   
            //Start the second counter
            secondsInterval = setInterval(function () {
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

                    setTimeout(() => {
                    //Clear the list of available answer
                    $("ul").empty(); 
                    //Append the answer to the UL                   
                    $("ul").append("<li class='displayCorrentAnswer'>You selected nothing, the correct answer is: " + randomQuestion[1] + "</li>");
                        
                    //Update the queryTerm to loser
                    queryTerm = "loser"; 

                    //Call the getGifImages method
                    gbmTrivia.getGifImages();
                    
                    }, 1000);

                    //Incremeent the answered count if nothing was selected
                    gbmTrivia.unanswered++;

                    //Wait for 5 seconds then reset the timer and start over
                    wait5seconds = setTimeout(function () {                    
                        //Update wins or loses
                        gbmTrivia.calculateWinsLosses();
                        //Call the NextQuestion function
                        gbmTrivia.goToNextQuestion();

                        if (gbmTrivia.wins + gbmTrivia.losses == 4){
                            //Remove question and available answers
                            $("ul").empty();
                            $(".questions").text("");
                            $("#questionsRemaining").text("0");                            
                            
                            $(".waitingNextGame").removeClass("hidden");
                            //Wait for 10 seconds to reset the game
                            gbmTrivia.countDownFromFifteen();
                            
                            setTimeout(() => {
                                $(".waitingNextGame").addClass("hidden");
                                gbmTrivia.reset();
                                clearInterval(secondsInterval);
                                clearInterval(waitFor15Seconds);
                                $("#startOver").removeClass("hidden");
                            }, 16000);                    
                        }
                    }, 5000);                    
                }
                
            }, 1000);
                   
        },
        goToNextQuestion: () => {
            
            if (gbmTrivia.questionsRemaining >= 2){            
                //Set the remaining seconds back to 30
                gbmTrivia.secondsRemaining = 15;
                //Reduce the remaining number of questions
                gbmTrivia.questionsRemaining--;
                //Show the Wining or losing message
                $("#questionsRemaining").text(gbmTrivia.questionsRemaining);
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

                if (gbmTrivia.questionsRemaining != 0 ) {
                    //Store the selected answer in a variable
                    selectedAnswer = $(this).text();
                    //Calculate the wins or loses
                    gbmTrivia.calculateWinsLosses();
                    //wait for 5 seconds then Go to the next question
                    //Clear the UL and show the message:
                    $("ul").empty();
                    $("#secondsRemaining").text("00");
                    clearInterval(secondsInterval);
                    if (selectedAnswer == randomQuestion[1]) {                        
                        $("ul").append("<li class='displayCorrentAnswer'>Yes, it is: " + selectedAnswer + "</li>");
                        queryTerm = "winner";
                        gbmTrivia.getGifImages();                        
                    }
                    //Update Losses
                    else {
                        $("ul").append("<li class='displayCorrentAnswer'>NOPE! The correct answer is: " + randomQuestion[1] + "</li>");
                        queryTerm = "loser"; 
                        gbmTrivia.getGifImages(); 
                    }
                    
                    setTimeout(() => {                        
                        gbmTrivia.goToNextQuestion();
                        gbmTrivia.startSecondCounter();
                        selectedAnswer = "";
                        console.log(selectedAnswer);

                        console.log("Current Total: " + (gbmTrivia.wins + gbmTrivia.losses));

                        if (gbmTrivia.wins + gbmTrivia.losses == 4) {
                            clearInterval(secondsInterval);
                            gbmTrivia.reset();
                            $("ul").empty();                            
                            $(".questions").text("");
                            $(".waitingNextGame").removeClass("hidden");
                            gbmTrivia.countDownFromFifteen();
                            setTimeout(() => {
                                $(".waitingNextGame").addClass("hidden");
                                clearInterval(secondsInterval);
                                clearInterval(waitFor15Seconds);
                                $("#startOver").removeClass("hidden");
                            }, 16000);
                        }                        

                    }, 5000);
                    
                }
            });            
        },
        calculateWinsLosses : () => {
            //Check if user selected an answer
            // if (selectedAnswer != "") {
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
            // }
            
        }, 
        reset : () => {
            console.log("reset started");
            gbmTrivia.questionsRemaining = 5;
            gbmTrivia.unanswered = 0;
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
            $(".waitingNextGame").addClass("hidden");
        }, 
        countDownFromFifteen : () => {
            var waiting = 15;
            waitFor15Seconds = setInterval(function () {
                if(waiting < 10){
                    $(".waitingNextGame").html(`You've reached the end of the game. <br>Your scores are in the top bar. <br> You did not answer ${gbmTrivia.unanswered} question(s) so they reflected as wrong answers. You can start another game in... 0${waiting--}`);
                }else{
                    $(".waitingNextGame").html(`You've reached the end of the game. <br>Your scores are in the top bar. <br> You did not answer ${gbmTrivia.unanswered} question(s) so they reflected as wrong answers. You can start another game in... ${waiting--}`);
                }
                
            }, 1000);
        }
    }    

    //When a user clicks on 'Start Game':
    $("#startGame").click(gbmTrivia.startGame);
    //Start Over:
    $("#startOver").click(gbmTrivia.startOver);
    //When a user clicks on 'Start Game':
    $('#show-instructions').click(gbmTrivia.showHideInstructions);
    
});