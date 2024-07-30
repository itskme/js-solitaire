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
}