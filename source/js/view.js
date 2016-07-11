// var $ = require('jquery');
/**
 * Represents the view.
 */
var View = function () {
    //declare the elements that need to be evaluated or manipulated.
    this.question = $('.question-text');
    this.questionNum = $('.question-number');
    this.button = $('.button input');
    this.responseList = $('.response-list');
    this.answer = $('.answer');
    this.playerImage = $('.player img');
    this.score = $('ul.tennis-balls');

    // Placeholders for the interface functions with the other components.
    this.onSubmit = null;
    this.onNext = null;
    this.onRetake = null;

    // Event handler function.
    // I had to include an intermediate function to evaluate the state of
    // the radio buttons since the 'checked' attribute isn't present when
    // the page loads. This means I couldn't add it to the list of elements
    // in the view.
    this.button.on('click', this.checkButtonValue.bind(this));
}

/**
 * Method that checks the value of the button element and passes to the controller.
 * @return {[type]} [description]
 */
View.prototype.checkButtonValue = function (event) {
    event.preventDefault();
    if (this.button.val() === 'Submit') {
        var choice = $("input[type='radio'][name='selection']:checked").val();
        console.log(choice);
        var feedback = this.onSubmit(choice);
        console.log(choice + ' ' + feedback);
        this.renderAnswer(feedback);
    } else if (this.button.val() === 'Next') {
        this.onNext();
    } else if (this.button.val() === 'Try Again')
        this.onRetake();
    return;
}

/**
 * Method to render page changes based on user's answer
 * @param  {object} element Updated info from the model
 */
View.prototype.renderAnswer = function (element) {
    this.responseList.hide();
    this.answer.text(element.feedback).show();
    this.playerImage.attr('src', element.image);
    this.setButton('next-button', 'Next', 'next');
    console.log('This is the: ' + element);
    var ball = "";
    if (element.correct) {
        ball = 'images/correct-answer-ball.png';
    } else {
        ball = 'images/wrong-answer-ball.png';
    }
    $('.ball-' + element.qIndex + ' img').attr('src', ball);
    return;
}

/**
 * Method to present a message to the user and offer to try again.
 * @return {[type]} [description]
 */
View.prototype.wrapUp = function (score) {
    this.setButton('retake-button', 'Try Again', 'retake');
    this.answer.text(
        'You got ' + score +
        ' correct answers. Press the button to try again.');
}

/**
 * Method that setups the scoring based on the total number of questions
 * @param  {number} totalQuestions The number of questions in the model
 */
View.prototype.reset = function (totalQuestions) {
    this.score.empty();
    var ball = 'images/no-answer-ball.png';
    for (var i = 0; i < totalQuestions; i++) {
        this.score.append(this.scoreBallTemplate(i, ball));
    }
    return;
}

/**
 * Method to set the button attributes based on the state of the app.
 * @param {string} id    The id attribute of the input
 * @param {string} value The value attribute of the input
 * @param {string} name  The name attribute of the input
 */
View.prototype.setButton = function (id, value, name) {

    this.button.attr('id', id);
    this.button.attr('value', value);
    this.button.attr('name', name);
    return;
}

/**
 * Method that holds the html template to render the scoring balls.
 * @param  {number} index The question number
 * @param  {url} ball  The image src for the ball image
 * @return {string}       The html code for the template
 */
View.prototype.scoreBallTemplate = function (index, ball) {
    return '<li class="score-ball ball-' + index +
        '"><img src="' + ball + '" ' +
        'height="57" width="57" alt="Score ball">' +
        '</li>';
}

/**
 * Method to render each item in the list of choices.
 * @param  {number} number The index of the choice in the question object
 * @param  {string} text   The choice associated with the index number
 * @return {string}        The html template code
 */
View.prototype.listOptionTemplate = function (number, text) {
    return '<li class="response">' +
        '<input type="radio" name="selection" value="' +
        number + '"><span>' + text + '</span></li>';
}

/**
 * A helper method to make sure the page loads and the user is at hte top.
 */
View.prototype.scrollToTop = function () {
    $(document).scrollTop(0);
}

/**
 * Method to display a question and the associated elements to the page.
 * @param  {object} question The question object
 */
View.prototype.displayQuestion = function (question, number) {
    console.log(question);
    var qNumber = number + 1;
    this.questionNum.text('Question ' + qNumber + ': ');
    // code to display a question
    this.question.text(question.text);
    // display the choices
    var choices = question.choices;
    // Make sure the list of options is empty before appending the new choices.
    this.answer.empty().hide();
    this.responseList.empty().show();
    // Iterate over the list and add the choice to the list
    for (var i = 0; i < choices.length; i++) {
        this.responseList.append(this.listOptionTemplate(i, choices[i]));
    }
    // Display the submit button
    this.setButton('submit-button', 'Submit', 'submit');
    console.log(question.mysteryImg);
    // Display the mystery image
    this.playerImage.attr('src', question.mysteryImg);
    return;
}
// module.exports = View;