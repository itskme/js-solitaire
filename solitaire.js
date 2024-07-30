class Solitaire {
    constructor() {
      this.deck = this.createDeck();
      this.tableau = [];
      this.foundation = [];
      this.stock = [];
    }
  
    createDeck() {
      const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
      const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
      const deck = [];
  
      for (const suit of suits) {
        for (const rank of ranks) {
          deck.push({ suit, rank });
        }
      }
  
      return deck;
    }
  
    shuffleDeck() {
      for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }
    }
  
    dealCards() {
      for (let i = 0; i < 7; i++) {
        this.tableau.push([]);
        for (let j = 0; j <= i; j++) {
          this.tableau[i].push(this.deck.pop());
        }
      }
    }
  
    drawCard() {
      if (this.deck.length === 0) {
        this.stock = this.stock.concat(this.tableau);
        this.tableau = [];
        this.dealCards();
      }
      return this.deck.pop();
    }
  
    playCard(card) {
      if (this.foundation.length === 0 || this.foundation[0].rank === card.rank + 1) {
        this.foundation.push(card);
        return true;
      }
      return false;
    }
  
    moveCard(card, pile) {
      if (pile === 'foundation') {
        return this.playCard(card);
      } else if (pile === 'tableau') {
      }
    }
  }
  
  
  const game = new Solitaire();
  game.shuffleDeck();
  game.dealCards();
  
 
  const gameBoard = document.getElementById('game-board');
  const tableau = document.getElementById('tableau');
  const foundationPile = document.getElementById('foundation-pile');
  const drawButton = document.getElementById('draw-button');
  const playButton = document.getElementById('play-button');
  

  drawButton.addEventListener('click', () => {
    const card = game.drawCard();
    const cardElement = document.createElement('div');
    cardElement.textContent = `${card.rank} of ${card.suit}`;
    const tableauPile = document.createElement('div');
    tableauPile.className = 'tableau-pile';
    tableauPile.appendChild(cardElement);
    tableau.appendChild(tableauPile);
  });
  

  playButton.addEventListener('click', () => {
    const selectedCard = getSelectedCard();
    if (selectedCard) {
      game.moveCard(selectedCard, 'foundation');
      const cardElement = document.createElement('div');
      cardElement.textContent = `${selectedCard.rank} of ${selectedCard.suit}`;
      foundationPile.appendChild(cardElement);
      removeSelectedCard();
    }
  });
  

  function getSelectedCard() {
    const selectedCardElement = document.querySelector('.tableau-pile .selected');
    if (selectedCardElement) {
      const cardText = selectedCardElement.textContent;
      const cardRank = cardText.split(' of ')[0];
      const cardSuit = cardText.split(' of ')[1];
      return { rank: cardRank, suit: cardSuit };
    }
    return null;
  }
  
  
  function removeSelectedCard() {
    const selectedCardElement = document.querySelector('.tableau-pile .selected');
    if (selectedCardElement) {
      selectedCardElement.parentNode.removeChild(selectedCardElement);
    }
  }
  
  
  tableau.addEventListener('click', (event) => {
    if (event.target.classList.contains('tableau-pile')) {
      const cardElement = event.target.querySelector('div');
      cardElement.classList.add('selected');
    } else if (event.target.tagName === 'DIV') {
      event.target.classList.add('selected');
    }
  });
  

  function initGameBoard() {
    for (let i = 0; i < 7; i++) {
      const tableauPile = document.createElement('div');
      tableauPile.className = 'tableau-pile';
      for (let j = 0; j <= i; j++) {
        const card = game.tableau[i][j];
        const cardElement = document.createElement('div');
        cardElement.textContent = `${card.rank} of ${card.suit}`;
        tableauPile.appendChild(cardElement);
      }
      tableau.appendChild(tableauPile);
    }
  }
  
  initGameBoard();