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
        feedback: 'John Isner defeated Nicolaus Mahut in 11 hours and 5 minutes. The match was played over a three day period since there are no court lights at Wimbledon.'
    }

];

module.exports = data;