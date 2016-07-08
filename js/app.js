var $ = require('jquery');
var Model = require('./model');
var View = require('./view');
var Controller = require('./controller');

$(document).ready(startQuiz);

/**
 * Function that instantiates the objects and starts the quiz.
 */
function startQuiz() {
    var model = new Model();
    var view = new View();
    var controller = new Controller(model, view);

    // Get the quiz started.
    // controller.totalQuestions = model.questions.length;
    // console.log(this.totalQuestions);
    controller.setupQuiz(model.totalQuestions);
    controller.updateQuestion();
}
