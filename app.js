const questions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "Delhi", correct: true },
      { text: "Mumbai", correct: false },
      { text: "London", correct: false },
      { text: "Goa", correct: false }
    ]
  },
   {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Jupiter", correct: false },
      { text: "Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Saturn", correct: false }
    ]
  },
 {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "WO", correct: false },
      { text: "HO", correct: false },
      { text: "H2O", correct: true },
      { text: "OH2", correct: false }
    ]
  },
   {
    question: "What is the largest mammal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Great White Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false }
    ]
  },
   {
    question: "What is the smallest prime number?",
    answers: [
      { text: "0", correct: false },
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false }
    ]
  },
  {
    question: "What is the national animal of India?",
    answers: [
      { text: "Bengal Tiger", correct: true },
      { text: "Indian Elephant", correct: false },
      { text: "Peacock", correct: false },
      { text: "Lion", correct: false }
    ]
  },
  {
    question: "Which Indian city is famous as the 'Pink City'?",
    answers: [
      { text: "Jaipur", correct: true },
      { text: "Bhopal", correct: false },
      { text: "Udaipur", correct: false },
      { text: "Jodhpur", correct: false }
    ]
  }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('time');
const timerContainer = document.getElementById('timer');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const totalElement = document.getElementById('total');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let time = 20;
let timerId;

startQuiz();

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.classList.add('hide');
  questionContainer.classList.remove('hide');
  nextButton.disabled = true;
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = answer.text;
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearInterval(timerId);
  nextButton.disabled = true;
  time = 20;
  timerElement.textContent = time;
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  clearInterval(timerId);
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  setStatusClass(selectedButton, correct);

  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === 'true');
    button.disabled = true;
  });

  if (correct) score++;
  nextButton.disabled = false;
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function startTimer() {
  timerElement.textContent = time;
  timerId = setInterval(() => {
    time--;
    timerElement.textContent = time;
    if (time <= 0) {
      clearInterval(timerId);
      disableAnswers();
      nextButton.disabled = false;
    }
  }, 1000);
}

function disableAnswers() {
  Array.from(answerButtonsElement.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === 'true') {
      setStatusClass(button, true);
    }
  });
}

function showResult() {
  questionContainer.classList.add('hide');
  timerContainer.classList.add('hide');
  resultContainer.classList.remove('hide');
  scoreElement.textContent = score;
  totalElement.textContent = questions.length;
}

restartButton.addEventListener('click', () => {
  timerContainer.classList.remove('hide');
  startQuiz();
});
