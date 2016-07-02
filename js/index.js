/*
Start by designing the model. The data is static and stored in an array of objects (hash).
Some things to consider:
1. The data does not change so no methods are needed to add or edit the model.
2. The question needs to be sent to the view - maybe I need a model method?
3. The user's response needs to be compared to the correct answer - model or controller method?
4. The feedback will be sent to the view - by which component?
5. The score has to be updated depending on the user's answer.
6. The correct button must be selected and added to the page based on the state of the app.
7. The next question must be accessed and sent to the view upon which the entire process starts over again.
 */

/*
TODO List
 */

// DONE: The view has a list of radio inputs
// DONE: The view has a submit button associated with the radio inputs
// DONE: When the submit button is clicked, the user's selection is compared to the correct answer.
// DONE: The choices are removed and the feedback is presented.
// DONE: The mystery image is replaced with the actual image.
// DONE: The score ball is updated to the color based on whether or not the answer was correct.
// DONE: The submit button is replaced by a next button.
// DONE: When the next button is clicked, the next question, choices, and mystery image are presented.
// DONE: The process continues until the results from the last question are rendered.
// DONE: The retake button is presented.
// DONE: If the retake button is clicked, the quiz is reset.
//
// Considerations: The id, value and name attributes of the button (input) need
// to change based on the state of the app.


// Array of question objects. Once I get this working I'll import these
// from a separate file.
var data = [{
        text: 'Which player on the ATP Tour has won the most Grand Slam titles?',
        mystery_img: 'images/mystery-federer.png',
        actual_img: 'images/federer.png',
        choices: ['Pete Sampras', 'Rafael Nadal',
            'Roger Federer', 'John McEnroe'
        ],
        answer: 2,
        feedback: 'Roger Federer has won 17 grand slam titles including 7 Wimbledon, 5 US Open, 1 French Open, and 4 Australian Open titles.'
    },

    {
        text: 'This player has won the French Open a whopping nine times over a ten year period!',
        mystery_img: 'images/mystery-nadal.png',
        actual_img: 'images/nadal.png',
        choices: ['Roger Federer', 'Rafael Nadal',
            'Novak Djokovic', 'John Isner'
        ],
        answer: 1,
        feedback: 'Rafael Nadal is considered to be "the King of Clay" and one of the greatest players ever.'
    },

    {
        text: 'Which of these players won the men\'s singles championship at the 2012 Olympic Games?',
        mystery_img: 'images/mystery-murray.png',
        actual_img: 'images/murray.png',
        choices: ['Andy Murray', 'Novak Djokovic',
            'Pete Sampras', 'Andy Roddick'
        ],
        answer: 0,
        feedback: 'Andy Murray is the first British singles champion in over 100 years.'
    },

    {
        text: 'Who is the only player to have beaten both Roger Federer and Rafael Nadal in all four Grand Slam events?',
        mystery_img: 'images/mystery-djokovic.png',
        actual_img: 'images/djokovic.png',
        choices: ['Andre Agassi', 'Andy Roddick',
            'Novak Djokovic', 'Pete Sampras'
        ],
        answer: 2,
        feedback: 'Novak Djokovic is currently ranked number 1 in the world on the ATP Tour.'
    },

    {
        text: 'This player won the longest men\'s singles match ever to be played at Wimbledon.',
        mystery_img: 'images/mystery-isner.png',
        actual_img: 'images/isner.png',
        choices: ['Rafael Nadal', 'John McEnroe',
            'Pete Sampras', 'John Isner'
        ],
        answer: 3,
        feedback: 'John Isner defeated Nicolaus Mahut in 11 hours and 5 minutes. the match was played over a three day period since there are no court lights at Wimbledon.'
    }

];

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
var questions = createQuestion(data);

/**
 * Represents the data.
 * @param {Array} questions Array of question instances.
 */
var Model = function (questions) {
    this.questions = questions;
    this.qIndex = 0;
    this.score = 0;
    this.totalQuestions = questions.length;
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
View.prototype.checkButtonValue = function () {
    if (this.button.val() === 'Submit') {
        var choice = $("input[type='radio'][name='selection']:checked").val();
        var feedback = this.onSubmit(choice);
        this.renderAnswer(feedback);
    } else if (this.button.val() === 'Next') {
        this.onNext();

    } else if (this.button.val() === 'Try Again')
        startQuiz();
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
    qNumber = number + 1;
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
    // Display the mystery image
    this.playerImage.attr('src', question.mysteryImg);
    return;
}

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

$(document).ready(startQuiz);

/**
 * Function that instantiates the objects and starts the quiz.
 */
function startQuiz() {
    var model = new Model(questions);
    var view = new View();
    var controller = new Controller(model, view);

    // Get the quiz started.
    // controller.totalQuestions = model.questions.length;
    // console.log(this.totalQuestions);
    controller.setupQuiz(model.totalQuestions);
    controller.updateQuestion();
}
