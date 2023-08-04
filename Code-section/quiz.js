const questions = [
    {
        question: "What was the first soft drink in space?",
        answers: [
            { text: "7 Up", correct: false },
            { text: " Coca Cola", correct: true },
            { text: "Pepsi", correct: false },
            { text: "Drinko", correct: false }
        ]
    },
    {
        question: "What is the most consumed manufactured drink in the world?",
        answers: [
            { text: "Juice", correct: false },
            { text: "Coca Cola", correct: false },
            { text: "Pepsi", correct: false },
            { text: "Tea", correct: true }
        ]
    },
    {
        question: "Which is the only edible food that never goes bad?",
        answers: [
            { text: "Juice", correct: false },
            { text: "Mango Juice", correct: false },
            { text: "Honey", correct: true },
            { text: "Butter", correct: false }
        ]
    },
    {
        question: "Which country invented ice cream?",
        answers: [
            { text: "Bangladesh", correct: false },
            { text: "India", correct: false },
            { text: "China", correct: true },
            { text: "Japan", correct: false }
        ]
    },
    {
        question: "What color is a ruby?",
        answers: [
            { text: "Black", correct: false },
            { text: "Dark", correct: false },
            { text: "Blue", correct: false },
            { text: "Red", correct: true }
        ]
    },
    {
        question: "What country has the most natural lakes?",
        answers: [
            { text: "Japan", correct: false },
            { text: "Bangladesh", correct: false },
            { text: "Canada", correct: true },
            { text: "India", correct: false }
        ]
    }
]


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button =  document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showscore(){
    resetState();
    questionElement.innerHTML = `Your score is: ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showscore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();