var $ = require('jquery');
var model = require('./model');
var view = require('./view');

/**
 * Handles the connection between the view and the model.
 * @param {Object} model Stores and manipulates the data.
 * @param {Object} view  Presents the data and listens for events.
 */
var Controller = function (model, view) {
    this.model = model;
    this.view = view;
    this.totalQuestions = '';

    // bindings
    view.onSubmit = model.checkResponse.bind(model);
    view.onNext = this.nextQuestion.bind(this);

};

// Take the data from the model and render it in the view.
Controller.prototype.updateQuestion = function () {
    // Store the current question object in the model to use later
    // when checking the response and providing feedback.
    this.model.question = this.model.getCurrentQuestion();
    this.view.scrollToTop();
    this.view.displayQuestion(this.model.question, this.model.qIndex);
    return;
}

/**
 * Reset the model and view properties necessary to start the quiz.
 * @param  {number} totalQuestions The number of questions in the model.
 */
Controller.prototype.setupQuiz = function (totalQuestions) {
    this.model.reset();
    this.view.reset(totalQuestions);
    return;
}

/**
 * Method to advance the quiz questions and notify the view when no more questions exist.
 */
Controller.prototype.nextQuestion = function () {
    this.model.increment();
    this.model.totalQuestions -= 1;
    if (this.model.totalQuestions > 0) {
        this.updateQuestion();
    } else {
        this.view.wrapUp(this.model.score);
    }
    return;
}
module.exports = Controller;