const quizData = [
    {
        question: 'Do you often feel sad or hopeless?',
        a: 'Yes',
        b: 'No',
        correct: 'a'
    },{
        question: 'Do you have trouble concentrating?',
        a: 'Yes',
        b: 'No',
        correct: 'a'
    },{
        question: 'Have you experienced a loss of interest in things you once enjoyed?',
        a: 'Yes',
        b: 'No',
        correct: 'a'
    },{
        question: 'Do you have trouble sleeping, either sleeping too much or too little?',
        a: 'Yes',
        b: 'No',
        correct: 'a'
    },{
        question: 'Have you had thoughts of self-harm or suicide?',
        a: 'Yes',
        b: 'No',
        correct: 'a'
    }
];

const quiz = document.getElementById("quiz");
const answersEls = document.querySelectorAll(".answer");
const questionE1 = document.getElementById('question');

const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');

const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz(){
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionE1.innerText = currentQuizData.question;

    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;

}

function getSelected(){

    let answer = undefined;

    answersEls.forEach((answerEl)=>{
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers(){
    answersEls.forEach((answerEl)=>{
        answerEl.checked = false;
    });

}

submitBtn.addEventListener("click",()=>{
    //check to see the answer
    const answer = getSelected();

    if(answer){
        if(answer === quizData[currentQuiz].correct){
            score++;
        }

        currentQuiz++;

        if(currentQuiz< quizData.length){
            loadQuiz();
        }else {
            quiz.innerHTML = `
                <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
                
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});

