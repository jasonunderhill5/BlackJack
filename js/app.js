/*-------------------------------- Constants --------------------------------*/
const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

const suits = ['h', 'd', 'c', 's']


/*-------------------------------- Variables --------------------------------*/
let deck = []
let dealerHand = []
let playerHand = []
let cash = 100
let youWon = false
let dealerWon = false
let dealerBlackjack = false
let playerBlackjack = false
let busted = false
let dealerBusted = false
let dealerTurn = false
let playerTurn = false
let dealerSum = 0
let playerSum = 0

/*------------------------ Cached Element References ------------------------*/
let dealBtn = document.getElementsByClassName('deal-btn')
let hitBtn = document.getElementsByClassName('hit-btn')
let stayBtn = document.getElementsByClassName('stay-btn')
let betBtn = document.getElementsByClassName('bet-btn')
let DisplaydealerCards = document.getElementById('dealer-cards')
let DisplayplayerCards = document.getElementById('player-cards')
let DisplaydealerScore = document.getElementById('dealer-score')
let DisplayplayerScore = document.getElementById('player-score')
let cashValue = document.getElementById('cash')




/*----------------------------- Event Listeners -----------------------------*/

dealBtn.addEventListener('click', startRound)
hitBtn.addEventListener('click', hit)
stayBtn.addEventListener('click', dealerTurn)
betBtn.addEventListener('click', addBet)




/*-------------------------------- Functions --------------------------------*/

function startRound () {
  deck = []

dealerHand = []
playerHand = []
cash = 100
youWon = false
dealerWon = false
dealerBlackjack = false
playerBlackjack = false
busted = false
dealerBusted = false
dealerTurn = false
playerTurn = false
dealerSum = 0
playerSum = 0

}

function rendor () {

}

function hit () {

}

function stay () {
  
}