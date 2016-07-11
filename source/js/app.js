// var $ = require('jquery');
// var Controller = require('./controller');

$(document).ready(init);

/**
 * Function that instantiates the objects and starts the quiz.
 */
function init () {
    var controller = new Controller();
    controller.startQuiz();
}
