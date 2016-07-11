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

var $ = require('jquery');
var data = require('./questions');
var model = require('./model');
var view = require('./view');
var controller = require('./controller');
var app = require('./app');
