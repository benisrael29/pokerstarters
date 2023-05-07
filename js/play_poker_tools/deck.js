
/* Deck  */

export class Deck {
    constructor() {
      this.cards = [];
      this.reset();
      this.shuffle();
    }
  
    reset() {
      this.cards = [];
  
      const suits = ["H", "D", "C", "S"];
      const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  
      for (const suit of suits) {
        for (const rank of ranks) {
          this.cards.push(`${rank}${suit}`);
        }
      }
    }
  
    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  
    deal() {
      return this.cards.pop();
    }
  }

  export function convertHand(hand) {
    console.log(hand)
    const rankMap = {
      "A": "ace",
      "K": "king",
      "Q": "queen",
      "J": "jack",
      "T": "10",
      "9": "9",
      "8": "8",
      "7": "7",
      "6": "6",
      "5": "5",
      "4": "4",
      "3": "3",
      "2": "2"
    };
  
    const suitMap = {
      "H": "hearts",
      "D": "diamonds",
      "C": "clubs",
      "S": "spades"
    };
  
    const cards = hand.split(" ");
  
    const convertedCards = cards.map(card => {
      const rank = rankMap[card[0]];
      const suit = suitMap[card[1]];
      return `images/cards/${rank}_of_${suit}.png`;
    });
  
    return convertedCards.join(",");
  }