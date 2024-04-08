
/*-------------------------------- Constants --------------------------------*/
const cards = ['A' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9', 'T', 'J' , 'Q' , 'K']
const suits = ['h' , 'd' , 'c' , 's'] 
/*---------------------------- Variables (state) ----------------------------*/
let deck = []
let playerCards = []
let dealerCards = []
let cash = 1000
let bet = 0
let playerWon = false
let dealerWon = false
let playerBj = false
let dealerBj = false
let playerBusted = false
let dealerBusted = false
let dealersTurn = false
/*------------------------ Cached Element References ------------------------*/

let restartBtn = document.getElementById('restart')
let hitBtn = document.getElementById('hit-button')
let dealBtn = document.getElementById('deal-button')
let stayBtn = document.getElementById('stay-button')
let betBtn = document.getElementById('bet-button')
let clearBetBtn = document.getElementById('clear-bet')
let betInput = document.getElementById('bet-input')
let displayDealerCardSum = document.getElementById('dealer-card-sum')
let displayPlayerCardSum = document.getElementById('player-card-sum')
let dealerCardSection = document.getElementById('dealer-card-section')
let playerCardSection = document.getElementById('player-card-section')
let statusMessage = document.getElementById('game-status')
let cashValue = document.getElementById('cash-value')
let currentBet = document.getElementById('current-bet')

/*----------------------------- Event Listeners -----------------------------*/

restartBtn.addEventListener('click',function(){
  location.reload()
})

dealBtn.addEventListener('click', startRound)
hitBtn.addEventListener('click', hit)
stayBtn.addEventListener('click', dealerTurn)
betBtn.addEventListener('click',updateBet)
clearBetBtn.addEventListener('click', clearBet)


/*-------------------------------- Functions --------------------------------*/

function startRound(){

  deck = []
  playerCards = []
  dealerCards = []
  dealerWon = false
  playerWon = false
  playerBj = false
  dealerBj = false
  playerBusted = false
  dealerBusted = false
  dealersTurn = false

  createDeck()
  shuffleDeck()
  dealCards()
  blackjack()  
  render()
}

function render(){
  cardDisplay()
  displayCardSums()
  message()
}

function hit(){
  playerCards.push(deck.splice(0,1)[0])
  if (cardSum(playerCards) >= 22) {
    playerBusted = true
    dealerTurn()
  } 
  render()
}

function dealerTurn(){
  dealersTurn = true
  if (cardSum(playerCards) <= 21){
    while (cardSum(dealerCards) < 17) {
        dealerCards.push(deck.splice(0,1)[0])
        render()
      } 
      if (cardSum(dealerCards) > 21){
        dealerBusted = true
        playerWon = true
        gameOver()
      }
  } else {
    dealerWon = true
    gameOver()
  }
  if(!playerBusted && !dealerBusted){
    bothStay()
  }
  render()
}

function bothStay(){
  if (cardSum(dealerCards) > cardSum(playerCards)){
    dealerWon = true
    gameOver()
  } else if (cardSum(dealerCards) < cardSum(playerCards)){
    playerWon = true
    gameOver()
  } else if (cardSum(dealerCards) === cardSum(playerCards)){
    playerWon = true
    dealerWon = true
    gameOver()
  }
}

function blackjack(){
  if(cardSum(playerCards) === 21 & cardSum(dealerCards) === 21) {
    playerWon = true
    dealerWon = true
    dealerBj = true
    playerBj = true
    gameOver()
  } else if (cardSum(dealerCards) === 21) {
    dealerWon = true
    dealerBj = true
    gameOver()
  } else if (cardSum(playerCards) === 21) {
    playerWon = true
    playerBj = true
    
    gameOver()
  }
  render()
}

function message(){
  if(dealerWon && playerWon && dealerBj && playerBj){
    statusMessage.textContent = 'PUSH!'
  } else if(dealerWon && playerWon){
    statusMessage.textContent = 'Player pushes.'
  } else if (dealerWon && dealerBj){
    statusMessage.textContent = 'Dealer has Blackjack. YOU LOSE!'
  } else if (dealerWon) {
    statusMessage.textContent = 'DEALER WINS! YOU LOSE! BET AGAIN'
  } else if (playerWon && playerBj){
    statusMessage.textContent = 'BLACKJACK! YOU WIN'
  } else if (playerWon) {
    statusMessage.textContent = 'YOU WIN!'
  } else {
    statusMessage.textContent = 'BETTING IS CLOSED'
  }
}


function gameOver() {
  if(playerWon && dealerWon){
    purse
  } else if(dealerWon){
    bet = 0
    currentBet.innerHTML = `Current bet: </br>$${bet}`
  } else if(playerWon && playerBj){
    cash = parseInt(cash) + (parseInt(bet))*1.5
  } else if(playerWon){
    cash = parseInt(cash) + parseInt(bet)

  }
  updateCash()
}

function updateCash(){
  cashValue.innerHTML = `cash: </br>$${parseInt(cash)}`
}

function clearBet(){
  cash = parseInt(cash) + parseInt(bet)
  bet = 0
  currentBet.innerHTML = `Current bet: </br>$${bet}`
  updateCash()
}

function updateBet(){

  bet = betInput.value
  currentBet.innerHTML = `Current bet: </br>$${bet}`
  cash = parseInt(cash) - parseInt(bet)
  betInput.value = ''
  updateCash()
}

function cardDisplay() {
  dealerCardSection.innerHTML = '';
  dealerCards.forEach((card, index) => {
    let cardEl = document.createElement('div');
    if (index === 0 && (dealersTurn || dealerBj === true)) {
      cardEl.classList.add('card', 'large', `${card}`);
    } else if (index === 0) {
      cardEl.classList.add('card', 'large', 'back-red');
    } else {
      cardEl.classList.add('card', 'large', `${card}`);
    }
    dealerCardSection.appendChild(cardEl);
  });

  playerCardSection.innerHTML = '';
  playerCards.forEach(card => {
    let cardEl = document.createElement('div');
    cardEl.classList.add('card', 'large', `${card}`);
    playerCardSection.appendChild(cardEl);
  });
}



function displayCardSums(){
  if (dealersTurn || dealerBj === true){
    displayDealerCardSum.innerHTML = `${cardSum(dealerCards)} `
  }else {  
    let firstCard = dealerCards[0]
    let firstCardNumber = firstCard.split('')
    let cardValue = cardToPoints(firstCardNumber[1])
    displayDealerCardSum.innerHTML = `${cardSum(dealerCards) - cardValue}`
  }
  displayPlayerCardSum.innerHTML = `${cardSum(playerCards)}`
}

function cardSum(hand){
  let isoNum = hand.map(string => string.substring(1,2));
  let aceCheck = isoNum.some(ace => ace === 'A')
  let cardValues = isoNum.map(cardToPoints)
  let cardSum = cardValues.reduce((prev, point) => (prev + point), 0)
  if(aceCheck && cardSum > 21){
    return cardSum - 10
  }else{
    return cardSum
  }
}

function cardToPoints(card){
  if(card === 'A') {
    return 11
  } else if (card === 'T' ||
card === 'J' ||
card === 'Q' ||
card === 'K' ){  
    return 10
  } else  {
    return parseInt(card)
  }
}

function createDeck(){
  for (let i = 0 ; i < cards.length ; i++){
    for (let v = 0 ; v < suits.length ; v++){
    deck.push(suits[v] + cards[i])
    }
  }
}

function shuffleDeck(){
  for (let i = 0 ; i < deck.length ; i++){
    let tempCard = deck[i]
    let randomIndex = Math.floor(Math.random() * 52)
    deck[i] = deck[randomIndex]
    deck[randomIndex] = tempCard
  }
}

function dealCards(){
  playerCards.push(deck.splice(0,1)[0])
  dealerCards.push(deck.splice(0,1)[0]) 
  playerCards.push(deck.splice(0,1)[0])
  dealerCards.push(deck.splice(0,1)[0]) 
}

