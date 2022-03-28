let roundNumber = 1
let questionNumber = 1
let listQuestionByRound = [questionNumber];
let listCompanies = ["Facebook", "Amazon", "Adobe", "Google", "Netflix", "Paytm", "Microsoft"];

document.getElementById('addRound').addEventListener('click', function () {
    addRound(++roundNumber);
});

document.getElementById('addQuestion').addEventListener('click', function () {
    ++listQuestionByRound[roundNumber - 1];
    addQuestion(roundNumber);
});

const questionHtml = (questionNumber) => `<label for="question_${questionNumber}">Question ${questionNumber}</label>
<textarea class="form-control" id="question_${questionNumber}" rows="3"
    placeholder="Add question description"></textarea><br>`


const roundHtml = (roundNumber) => `<div id="round-${roundNumber}">
<label for="question_1">Round ${roundNumber}</label>
<div class="form-group">
    <label for="question_${listQuestionByRound[roundNumber - 1]}">Question ${listQuestionByRound[roundNumber - 1]}</label>
    <textarea class="form-control" id="question_${listQuestionByRound[roundNumber - 1]}" rows="3"
        placeholder="Add question description"></textarea>
</div>
</div> `

function createQuestion(questionNumber) {
    const div = document.createElement('div')
    div.innerHTML = questionHtml(listQuestionByRound[roundNumber - 1]);
    return div;
}

function addQuestion(roundNumber) {
    const ele = document.getElementById('round-' + roundNumber);
    ele.appendChild(createQuestion(listQuestionByRound[roundNumber - 1]));
}


function createRound(roundNumber) {
    const div = document.createElement('div')
    div.innerHTML = roundHtml(roundNumber);
    return div;
}

function addRound(roundNumber) {
    const ele = document.getElementById('round');
    listQuestionByRound.push(1);
    ele.appendChild(createRound(roundNumber));
}