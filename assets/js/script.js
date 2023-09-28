//Creatign a wrapper element to process all clicks on the page.
var wrapper = document.querySelector(".wrapper");
//start Button
var startBtn = null;
// variable for putting initial message with Start button and then the multiple choice questions dynamically
var initCard = document.querySelector("#init-card");
//Timer display
var timer = document.querySelector("#timerDisp");
//variable to to display result of each question as correct or wrong
var result = document.querySelector("#result");
//variable to store user entered initials
var initials = null;
//Variable to keep track of timer.  Each round get 75 seconds
var timeLeft = 75;
//Variable to keep track of number of questions
var numQues = 0;
//Variable to keep track of the score
var score = 0;
//Array to store (initials, score) pair in Local storage
var scoreList = [];

//array to store all the questions, theirs choices of answers and correct answer

   // {ques:"Commonly used data types do NOT include: ", btn1:"1. strings", btn2:"2. boolean", btn3:"3. alerts", btn4:"4. numbers", ans:"3. alerts"},
    //YOUR CODE

    var questionList = [
        {
            ques: "Commonly used data types do NOT include:",
            btn1: "1. strings",
            btn2: "2. boolean",
            btn3: "3. alerts",
            btn4: "4. numbers",
            ans: "3. alerts"
        },
        {
            ques: "What is the largest unit of data storage?",
            btn1: "1. Megabyte",
            btn2: "2. Gigabyte",
            btn3: "3. Terabyte",
            btn4: "4. Petabyte",
            ans: "4. Petabyte"
        },
        {
            ques: "What does CPU stand for?",
            btn1: "1. Central Processing Unit",
            btn2: "2. Computer Personal Unit",
            btn3: "3. Control Process Unit",
            btn4: "4. Central Pro Unit",
            ans: "1. Central Processing Unit"
        },
        {
            ques: "Which programming language is known for its use in web development?",
            btn1: "1. Java",
            btn2: "2. Python",
            btn3: "3. HTML",
            btn4: "4. C++",
            ans: "3. HTML"
        }
    ];


//Timer function  - it is executed when Start button is pressed
function startTimer() {
    var countdown = setInterval(function () {
        timer.textContent = "Time: " + timeLeft;
        if (timeLeft <= 0 || numQues >= questionList.length) {
            clearInterval(countdown);
            timer.textContent = "sorry! Time's up!";
            // Call the saveResults function to end the game
            saveResults();
        } else {
            timeLeft--;
        }
    }, 1000);

    // Start the quiz
    runQuiz();
}


//Function to run the quiz
function runQuiz() {
    console.log('runquiz function');
    if (numQues < questionList.length) {
        // Display the question and answer choices
        initCard.innerHTML = questionList[numQues].ques +
            "<br><button class=\"btn\">" + questionList[numQues].btn1 + "</button>" +
            "<br><button class=\"btn\">" + questionList[numQues].btn2 + "</button>" +
            "<br><button class=\"btn\">" + questionList[numQues].btn3 + "</button>" +
            "<br><button class=\"btn\">" + questionList[numQues].btn4 + "</button>";
    }
}

// Function to display a question by its index
function displayQuestion(index) {
    if (index < questionList.length) {
        // Display the question and answer choices
        initCard.innerHTML = questionList[index].ques +
            "<br><button class=\"btn\">" + questionList[index].btn1 + "</button>" +
            "<br><button class=\"btn\">" + questionList[index].btn2 + "</button>" +
            "<br><button class=\"btn\">" + questionList[index].btn3 + "</button>" +
            "<br><button class=\"btn\">" + questionList[index].btn4 + "</button>";
    }
}



// Function to save users score and initial - this is called when Timer is done or all the questions are done and timer is set to zero.
function saveResults() {
    // Clear the question and timer
    initCard.innerHTML = "";
    timer.textContent = "";

    // Prompt user for initials
    initials = prompt("Enter your initials:");

    if (initials) {
        // Create a userScore object
        var userScore = {
            initials: initials,
            score: score
        };

        // Add the latest userScore to the ScoreList
        scoreList.push(userScore);

        // Write scoreList to local storage
        localStorage.setItem("scoreList", JSON.stringify(scoreList));

        // Display high scores
        showResults();
    }
}


//Get the list of Initials and score from Local Storage to display high scores from previous runs
//if link = true, we need to create a display string for alert popup when View High Score lin is clicked
//If link = false, we need to createa string to display high score on the card in the apge.
function getScoreListString(link) {
    //get stored initial/score pair from local storage
    var storedList = JSON.parse(localStorage.getItem("scoreList"));
    var values = "";

    for (var i = 0; i < storedList.length; i++) {
        var y = i+1;
        if(!link)
         values += "<span>" + y + ". " + storedList[i].initials + " - " + storedList[i].score + "</span><br>";
        else
        values +=  y + ". " + storedList[i].initials + " - " + storedList[i].score + "<br>";

    }

    return values;
}

//Function to calculate if the user selected correct response
function getResults(btnValue) {
    if (btnValue == questionList[numQues].ans) {
        result.textContent = "Correct";
        score++;
        return true;
} else {
        result.textContent = "Wrong";
        timeLeft -= 5;
    }
    numQues++;
    displayQuestion(numQues);
    if (numQues === questionList.length) {
        saveResults();
    }
}


//Function to show results list in the card on the page
function showResults() {
    result.textContent = "";

    var highScores =  getScoreListString(false);

 //YOUR CODE
    initCard.innerHTML = "<b>High Scores:</b><br>" + highScores +
        "<button id=\"goBack\" class=\"btn\">Go Back</button>" +
        "<button id=\"clearScores\" class=\"btn\">Clear High Scores</button>";

}

//main Event listener for warpper element - it will parse all the clicks for links and various buttons on the page
wrapper.addEventListener("click", function (event) {
    var element = event.target;
    var answer = false;
    console.log(element);
    event.preventDefault();

    if (element.innerHTML === "View High Scores") {  //View High Scores
        console.log("View high score clicked");

        alert(newValues);

    } else if (element.innerHTML === "Start") { //Start Button
        console.log("Start button clicked");

        //start the timer when start button is clicked
        startTimer();

    } else if (element.innerHTML === "Submit") { //Submit Button
        console.log("Submit clicked");

        //userScore object to store scores in local storage
        var userScore = {
            initials: initials.value.trim(),
            score: score
        };

        //add the latest userScore to the ScoreList
        scoreList[scoreList.length] = userScore;

        //weite scoreList to local storage
        localStorage.setItem("scoreList", JSON.stringify(scoreList));

        //show all the scores stored in local storage so far
        showResults();

    } else if (element.innerHTML === "Go Back") { //Go back
        console.log("Go Back clicked");

        //This will go back to the beginning and sets all the variables to their initial value before reloading the page
       location.reload();

    } else if (element.innerHTML === "Clear high Scores") {  //Clear High Score Button
        console.log("Clear High Score clicked");

       //empty out the scoreList
        scoreList.splice(0, scoreList.length);
        //store in local storage
        localStorage.setItem("scoreList", JSON.stringify(scoreList));
        //clear out the display on page
        initCard.innerHTML = "<b>High Scores:</b><br><span></span>\n <button id=\"goBack\" class=\"btn\">Go Back</button><button id=\"clearScores\" class=\"btn\">Clear High Scores</button>";

    } else if (element.innerHTML !== "Start") {       //Any of the Answer Button 
        console.log("One of the answer button clicked");

        //Return if all questions are done
        if(numQues === 5)
            return;
        
        //check if answer is correct or wrong
        answer = getResults(element.innerHTML);
        //answer is correct
        if (answer === true) {
            //YOUR CODE
            result.textContent = "correct";

        } else { //answer is wrong
            //YOUR CODE
            result.textContent = "wrong";
        }

    } else {
        console.log("Ignore redundant clicks.");
    }
})


//Main fucntion
//It setups up the start message
//Also initialize the scoreList for the session with any initial/scores pairs stored in local storage from previous sessions
function init() {
    initCard.innerHTML = "Click Start button to start the timed quiz. Remember a wrong answer will detect time from the timer.<br><button id=\"start\" class\=\"btn\">Start</button>";
    startBtn = document.querySelector("#start");

    //get stored scores
    var storedList = JSON.parse(localStorage.getItem("scoreList"));
    if (storedList !== null) {
        scoreList = storedList;
    }
}

//Call init
init();

