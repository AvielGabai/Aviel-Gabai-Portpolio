let correctAnswer;
let exercises = [];

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('exercises')) {
        exercises = JSON.parse(localStorage.getItem('exercises'));
        renderExercises();
    }
});

function generateExercise() {
    const operator = document.getElementById('operator').value;
    const range = parseInt(document.getElementById('range').value);
    const num1 = Math.floor(Math.random() * range) + 1;
    const num2 = Math.floor(Math.random() * range) + 1;

    let exercise = '';
    switch (operator) {
        case 'addition':
            exercise = `${num1} + ${num2} = ?`;
            correctAnswer = num1 + num2;
            break;
        case 'subtraction':
            exercise = `${num1} - ${num2} = ?`;
            correctAnswer = num1 - num2;
            break;
        case 'multiplication':
            exercise = `${num1} * ${num2} = ?`;
            correctAnswer = num1 * num2;
            break;
        case 'division':
            exercise = `${num1} / ${num2} = ?`;
            correctAnswer = num1 / num2;
            break;
        default:
            exercise = 'Please select a valid operator.';
    }

    document.getElementById('exercise').innerText = exercise;
    document.getElementById('answerSection').style.display = 'block';
    document.getElementById('result').innerText = '';
}

function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const isCorrect = userAnswer === correctAnswer;
    const result = isCorrect ? 'Correct' : 'Wrong';

    document.getElementById('result').innerText = result;
    saveExercise(document.getElementById('exercise').innerText, correctAnswer, userAnswer, isCorrect);
}

function saveExercise(exercise, correctAnswer, userAnswer, isCorrect) {
    const newExercise = {
        exercise: exercise,
        correctAnswer: correctAnswer,
        userAnswer: userAnswer,
        isCorrect: isCorrect
    };

    exercises.push(newExercise);
    localStorage.setItem('exercises', JSON.stringify(exercises));
    renderExercises();
}

function renderExercises() {
    const tableBody = document.getElementById('exerciseTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    exercises.forEach((exercise, index) => {
        const newRow = tableBody.insertRow();

        const exerciseCell = newRow.insertCell(0);
        const answerCell = newRow.insertCell(1);
        const userAnswerCell = newRow.insertCell(2);
        const resultCell = newRow.insertCell(3);
        const actionCell = newRow.insertCell(4);

        exerciseCell.textContent = exercise.exercise;
        answerCell.textContent = exercise.correctAnswer;
        userAnswerCell.textContent = exercise.userAnswer;
        resultCell.textContent = exercise.isCorrect ? 'Correct' : 'Wrong';
        resultCell.style.color = exercise.isCorrect ? 'green' : 'red';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            exercises.splice(index, 1);
            localStorage.setItem('exercises', JSON.stringify(exercises));
            renderExercises();
        };
        actionCell.appendChild(deleteButton);
    });
}
