//dont go here
dontGoHere = false;
let circle_up, circle_left, circle_down, circle_right, circle_center
let movedUp = false, movedLeft = false, movedDown = false, movedRight = false, movedCenter = false;
let current_circle;
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let life = 3

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  dontGoHere = false
})

function startGame() {
    startButton.classList.add('hide')
    const Game = new Phaser.Game(800, 600, Phaser.AUTO, 'GameCanvas', { preload, create, update })
  // objects
    circle_scale = 0.15;
    pi_scale = 0.1;
    // starting positions
    circle_starting_x = Game.width/2
    circle_starting_y = Game.height/2
    pi_starting_x = Game.width/2+5
    pi_starting_y = Game.height/2-20
    question_x = Game.width/2
    question_y = Game.height/2-170
    answer_x = question_x
    answer_y = question_y+30
    // other
    space = 90;

  function preload() {
    Game.load.image('circle', 'circle.png')
    Game.load.image('circle_red', 'circle_red.png')
    Game.load.image('circle_green','circle_green.png')
    Game.load.image('pi','pi.png')
}

function create() {
    Game.stage.backgroundColor='#ffffff'
    // circles
    circle_up =  Game.add.sprite(circle_starting_x, circle_starting_y-space, "circle")
    circle_up.scale.setTo(circle_scale)
    circle_center =  Game.add.sprite(circle_starting_x, circle_starting_y, "circle")
    circle_center.scale.setTo(circle_scale)
    circle_right =  Game.add.sprite(circle_starting_x+space, circle_starting_y, "circle")
    circle_right.scale.setTo(circle_scale)
    circle_left =  Game.add.sprite(circle_starting_x-space, circle_starting_y, "circle")
    circle_left.scale.setTo(circle_scale)
    circle_down =  Game.add.sprite(circle_starting_x, circle_starting_y+space, "circle")
    circle_down.scale.setTo(circle_scale)
    // pi
    pi = Game.add.sprite(pi_starting_x, pi_starting_y, 'pi')
    pi.scale.setTo(pi_scale)
    // movement
    keyUp = Game.input.keyboard.addKey(Phaser.Keyboard.UP)
    keyLeft = Game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    keyRight = Game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    keyDown = Game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    // answering
    keyA = Game.input.keyboard.addKey(Phaser.Keyboard.A)
    current_circle = circle_center
}

function update() {
    if (keyUp.isDown) {
      if (!dontGoHere) {
        let toSetNextQuestion = false
        let toMove = false
        console.log("so far so good")
        if(current_circle == circle_center) {
          console.log("im here")
          current_circle = circle_up;
          toMove = true
          if(!movedUp) {
            movedUp = true
            toSetNextQuestion = true
          }
        } else if (current_circle == circle_down) {
          current_circle = circle_center;
          toMove = true
          console.log("blablabla")
          if(!movedCenter) {
            movedCenter = true
            toSetNextQuestion = true
          }
        } 
        
        if(toMove) {
          pi.y -= space
          if(toSetNextQuestion) {
            setUpSetNextQuestion()
          }
        }
      }
    }
    if (keyDown.isDown) {
        if (!dontGoHere) {
          let toSetNextQuestion = false
          let toMove = false
          if(current_circle== circle_center) {
            current_circle = circle_down
            toMove = true
            if(!movedDown) {
              movedDown = true
              toSetNextQuestion = true
            }
          }
          else if (current_circle == circle_up) {
            current_circle = circle_center
            toMove = true
            if(!movedCenter) {
              movedCenter = true
              toSetNextQuestion = true
            }
          }
          if(toMove) {
            pi.y += space
            if(toSetNextQuestion) {
              setUpSetNextQuestion()
            }
          }
        }
    }
    if (keyLeft.isDown) {
        if (!dontGoHere) {
          let toSetNextQuestion = false
          let toMove = false
          if(current_circle == circle_center) {
            current_circle = circle_left
            toMove = true
            if(!movedLeft) {
              movedLeft = true
              toSetNextQuestion = true
            }
          }
          else if (current_circle == circle_right) {
            current_circle = circle_center
            toMove = true
            if(!movedCenter) {
              movedCenter = true
              toSetNextQuestion = true
            }
          }
          if(toMove) {
            pi.x -= space
            if(toSetNextQuestion) {
              setUpSetNextQuestion()
            }
          }
        }
    }
    if (keyRight.isDown) {
        if (!dontGoHere) {
          let toSetNextQuestion = false
          let toMove = false
          if(current_circle== circle_center) {
            current_circle = circle_right
            toMove = true
            if(!movedRight) {
              movedRight = true
              toSetNextQuestion = true
            }
          }
          else if (current_circle == circle_left) {
            current_circle = circle_center
            toMove = true
            if(!movedCenter) {
              movedCenter = true
              toSetNextQuestion = true
            }            
          }
          if(toMove) {
            pi.x += space
            if(toSetNextQuestion) {
              setUpSetNextQuestion()
            }
          }
        }
    }
}

function setUpSetNextQuestion() {
    dontGoHere = true;
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClassForEach(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    current_circle.visible = 0
    pi.visible = 0
    green_circle = Game.add.sprite(current_circle.x, current_circle.y, "circle_green")
    green_circle.scale.setTo(circle_scale)
    pi = Game.add.sprite(pi.x, pi.y, 'pi')
    pi.scale.setTo(pi_scale)
  } else {
    element.classList.add('wrong')
    red_circle = Game.add.sprite(current_circle.x, current_circle.y, "circle_red")
    red_circle.scale.setTo(circle_scale)
    pi = Game.add.sprite(pi.x, pi.y, 'pi')
    pi.scale.setTo(pi_scale)
  }
}

function setStatusClassForEach(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

}
const questions = [
  {
    question: 'На кой ден се празнува числото пи?',
    answers: [
      { text: '14/3', correct: true },
      { text: '22/5', correct: false },
      { text: '7/1', correct: false},
      { text: '9/11', correct: false}
    ]
  },
  {
    question: 'Каква е формулата за обема на сфера',
    answers: [
      { text: 'π³r³', correct: false },
      { text: 'πr³', correct: false },
      { text: '3/4 πr³', correct: false },
      { text: '4/3 πr³', correct: true }
    ]
  },
  {
    question: 'Кои открили първи стойността на пи?',
    answers: [
      { text: 'гърците', correct: false },
      { text: 'египтяните', correct: false },
      { text: 'вавилонците', correct: true },
      { text: 'китайците', correct: false }
    ]
  },
  {
    question: 'Как се пише най-близко пи в обикновена дроб?',
    answers: [
      { text: '21/8', correct: false },
      { text: '5/3', correct: false },
      { text: '45/16', correct: false },
      { text: '22/7', correct: true }
    ]
  },
  {
    question: 'Лу Чао от Китай постави световен рекорд, като запомни най-много цифри от пи. Колко цифри е запомнил?Лу Чао от Китай постави световен рекорд, като запомни най-много цифри от пи. Колко цифри бе запомнил?',
    answers: [
      { text: '67,890', correct: true },
      { text: '68,980', correct: false },
      { text: '60,967', correct: false},
      { text: '69/760', correct: false}
    ]
  },
  {
    question: 'Каква е формулата за площта на окръжност??',
    answers: [
      { text: '2πr', correct: false },
      { text: 'πr²', correct: true },
      { text: 'πr²/2', correct: false },
      { text: 'πr/2', correct: false }
    ]
  },
  {
    question: 'Пи е буква от кой език?',
    answers: [
      { text: 'Римски', correct: false },
      { text: 'Гръцки', correct: true },
      { text: 'Испански', correct: false },
      { text: 'Хинди', correct: false }
    ]
  }
]