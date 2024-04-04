/*-------------------------------- Constants --------------------------------*/
const cards = ["dA","dK","dQ","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hK","hQ","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cK","cQ","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sK","sQ","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]


/*-------------------------------- Variables --------------------------------*/
let cash = 100
let bet = 0
let deck = []
let playerHand = []
let dealerHand = []
let gamePlaying = false

/*------------------------ Cached Element References ------------------------*/
const messageEl = document.getElementById('message');
const playerHandEl = document.getElementById('player-hand')
const dealerHandEl = document.getElementById('dealer-hand')
const cashBalanceEl = document.getElementById('cash-balance')
const currentBetEl = document.getElementById('current-bet')
const hitBtn = document.getElementById('hit-button')
const stayBtn = document.getElementById('stay-button')
const dealBtn = document.getElementById('deal-button')




/*----------------------------- Event Listeners -----------------------------*/

hitBtn.addEventListener('click', hit)
standBtn.addEventListener('click', stand)
dealBtn.addEventListener('click', deal)




/*-------------------------------- Functions --------------------------------*/

  function init () {
    cash = 100
    bet = 0
    cards = 0
    playerHand = []
    dealerHand = []
    gamePlaying = false
  }