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
let hitBtn = document.getElementById('hit-btn')
let stayBtn = document.getElementById('stay-btn')
let betBtn = document.getElementById('bet-btn')
let dealerCards = document.getElementById('dealer-cards')
let playerCards = document.getElementById('player-cards')
let dealerScore = document.getElementById('dealer-score')
let playerScore = document.getElementById('player-score')



/*----------------------------- Event Listeners -----------------------------*/




/*-------------------------------- Functions --------------------------------*/
