var $ = require('jquery');
var data = require('./questions');
/**
 * Represents a question object.
 * @constructor
 */
var Question = function (name, text, mystery, actual, choices, answer,
    feedback) {
    this.name = name || "";
    this.text = text || "";
    this.mysteryImg = mystery || "";
    this.actualImg = actual || "";
    this.choices = choices || [];
    this.answer = answer || null;
    this.feedback = feedback || "";
};

/**
 * Instantiates the questions and returns an array.
 * @param  {array} data Array of questions as JSON objects.
 * @return {array} qList Array of question object instances.
 */
function createQuestion(data) {
    var qList = [],
        count = 0;
    $.each(data, function (i, question) {
        count += 1;
        var name = "question" + count;
        var q = new Question(name, question.text, question.mystery_img,
            question.actual_img, question.choices, question.answer,
            question.feedback);
        qList.push(q);
    });
    return qList;
};

// Store the question instances in a variable as an array.
// var questions = createQuestion(data);

/**
 * Represents the data.
 * @param {Array} questions Array of question instances.
 */
var Model = function () {
    this.questions = createQuestion(data);
    this.qIndex = 0;
    this.score = 0;
    this.totalQuestions = this.questions.length;
};

// Method to increment the question number as the user progresses in the quiz.
Model.prototype.increment = function () {
    this.qIndex += 1;
}

// Method to retrieve a question from the data storage (array in this case).
Model.prototype.getCurrentQuestion = function () {
    return this.questions[this.qIndex];
}

// Reset some of the properties if the user wants to retake the quiz.
Model.prototype.reset = function () {
    this.score = 0;
    this.qIndex = 0;
}

/**
 * Method that compares the user's answer to the correct answer
 * @param  {number} choice The index number of the answer selected
 * @return {object}        The data to be displayed by the view.
 */
Model.prototype.checkResponse = function (choice) {
    var correctAnswer = +this.question.answer;
    var eval, correct;
    if (choice == correctAnswer) {
        eval = "That's correct! ";
        this.score += 1;
        correct = true;
    } else {
        eval = "Nice try! ";
        correct = false;
    }

    return {
        feedback: eval + this.question.feedback,
        image: this.question.actualImg,
        correct: correct,
        qIndex: this.qIndex
    }
}
module.exports = Model;