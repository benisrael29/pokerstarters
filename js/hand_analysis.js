
// Get all the card images
const cardImages = document.querySelectorAll('.card-images img');

let cards = [null, null, null, null, null, null, null];


// Add a click event listener to each card image
cardImages.forEach((cardImage) => {
  cardImage.addEventListener('click', function() {
    
    //Get the card selected
    const selectedCardData = this.getAttribute('data-card');
    console.log(selectedCardData)

    //if the selected card has an id of selected-card-# reset the image to black and 
    const regex = /^back[1-9]$/;
    if(regex.test(selectedCardData)){
      //get the last digit of selected card data
      const lastDigit = parseInt(selectedCardData.charAt(selectedCardData.length - 1));
      document.getElementById(`selected-card-${lastDigit}`).src = "images/cards/back.png";
      
      //Return the image to the stack by converting opacity back to 1
      const query = `img[data-card="${cards[lastDigit-1]}"]`;
      const cardImage = document.querySelector(query);
      cardImage.style.opacity = "1";
      cards[lastDigit-1] = null


          //if all required cards are out ->eval
    if(cards[0]!=null && cards[1]!=null){
      displayHandStrength()
    }
    
      //we can return we don want to proceed to eval
      return
    }

    //check if the selected card is already in the eval cards
    var alreadyInCards = false
    for (let i = 0; i < cards.length; i++) {
      if (cards[i] == selectedCardData){
        alreadyInCards = true
      }
    }

    // This case the selected card was from the deck and we can add it to the eval cards
    for (let i = 0; i < cards.length; i++) {
      if (cards[i] == null && !alreadyInCards){
        const cardIndex = parseInt(i)+1;
        console.log(`selected-card-${cardIndex}`)
        document.getElementById(`selected-card-${cardIndex}`).src = this.src;
        this.setAttribute("style", "opacity: 0.3;");
        cards[i]=selectedCardData
        break
      }
    }


    //if all required cards are out ->eval
    if(cards[0]!=null && cards[1]!=null){
      displayHandStrength()
    }
    

  });
});

/* 
HAND EVALUATOR:

The idea behind this evalutor is to use monte carlo to simulate and estimate the strength of your hand. 
We need to therefore define the rules efficently
*/

function displayHandStrength() {

  var number_of_winners = 0
  //Run the hand 100000 times
  for(let x = 0; x<100000; x++){
    my_cards = cards.slice(0,2)
    
    //if community cards are missing generate them
    var community_cards = cards.slice(3,6)
    if(hasNull(community_cards)){
      community_cards = generateMissingCommunityCards(my_cards, community_cards)
    }
    
    //randomly choose an opponents hand
    opp_cards = generateRandomOpponentHand(my_cards, community_cards)

    res = evalHands(my_cards, opp_cards, community_cards)
    
    // if a win add to the number of winners
    if(res){number_of_winners++}

  }
  console.log("number of winners")
  console.log(number_of_winners/100000)
  var win_rate =  Number(((number_of_winners/100000)*100).toFixed(3))
  document.getElementById("he-result").innerHTML = win_rate+'%';

}

function generateRandomOpponentHand(my_cards, community_cards) {
  const allUsedCards = new Set([...my_cards, ...community_cards]);
  const ranks = '23456789TJQKA';
  const suits = 'cdhs';
  const opp_cards = [];

  while (opp_cards.length < 2) {
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const card = rank + suit;

    if (!allUsedCards.has(card)) {
      opp_cards.push(card);
      allUsedCards.add(card);
    }
  }

  return opp_cards;
}

function generateMissingCommunityCards(my_cards, community_cards){
  const ranks = '23456789TJQKA';
  const suits = 'cdhs';
  const usedCards = new Set([...my_cards, ...community_cards.filter(card => card !== null)]);
  const generatedCards = community_cards.slice();

  for (let i = 0; i < community_cards.length; i++) {
    if (community_cards[i] === null) {
      let newCard;
      do {
        const rank = ranks[Math.floor(Math.random() * ranks.length)];
        const suit = suits[Math.floor(Math.random() * suits.length)];
        newCard = rank + suit;
      } while (usedCards.has(newCard));
      
      generatedCards[i] = newCard;
      usedCards.add(newCard);
    }
  }
  return generatedCards;
}





function evalHands(my_cards, opp_cards, community_cards){

  const all_my_cards = my_cards.concat(community_cards);
  const all_opp_cards = opp_cards.concat(community_cards);
  const my_hand = evaluateHand(all_my_cards);
  const opp_hand = evaluateHand(all_opp_cards);
  
  return compareHands(my_hand, opp_hand);
  
}
  
  
function evaluateHand(cards) {
  const ranks = '23456789TJQKA';
  const suits = 'cdhs';
  
  // Count occurrences of each rank and suit
  const rankCounts = new Array(13).fill(0);
  const suitCounts = new Array(4).fill(0);
  
  for (const card of cards) {
    const rankIndex = ranks.indexOf(card[0]); //look up the rank index
    const suitIndex = suits.indexOf(card[1]); // look up the suit index
    rankCounts[rankIndex]++; //add it accordingly 
    suitCounts[suitIndex]++;
  }
  
  /* Check for a flush */
  let isFlush = false;
  for (let i = 0; i < suitCounts.length; i++) {
    if (suitCounts[i] >= 5) {
      isFlush = true;
      break;
    }
  }

  const isStraight = findStraight(rankCounts);

  const countsSortedByFrequency = rankCounts.slice().sort((a, b) => b - a);
  const primaryRank = countsSortedByFrequency[0];
  const secondaryRank = countsSortedByFrequency[1];
  
  //Sort hand by rank
  const sortedRanks = [];
  for (let i = 0; i < rankCounts.length; i++) {
    if (rankCounts[i] > 0) {
      sortedRanks.push(i);
    }
  }
  sortedRanks.sort((a, b) => b - a);

  if (isFlush && isStraight) {
    return { handRank: 8, primaryRank, secondaryRank,sortedRanks}; // Straight flush
  }

  if (primaryRank === 4) {
    return { handRank: 7, primaryRank, secondaryRank,sortedRanks }; // Four of a kind
  }
  
  if (primaryRank === 3 && secondaryRank === 2) {
    return { handRank: 6, primaryRank, secondaryRank,sortedRanks }; // Full house
  }
  
  if (isFlush) {
    return { handRank: 5, primaryRank, secondaryRank,sortedRanks }; // Flush
  }
  
  if (isStraight) {
    return { handRank: 4, primaryRank, secondaryRank,sortedRanks }; // Straight
  }
  
  if (primaryRank === 3) {
    return { handRank: 3, primaryRank, secondaryRank,sortedRanks }; // Three of a kind
  }
  
  if (primaryRank === 2 && secondaryRank === 2) {
    return { handRank: 2, primaryRank, secondaryRank ,sortedRanks}; // Two pair
  }
  
  if (primaryRank === 2) {
    return { handRank: 1, primaryRank, secondaryRank,sortedRanks }; // One pair
  }
  
  return { handRank: 0, primaryRank, secondaryRank,sortedRanks }; // High card
}

function findStraight(rankCounts) {
  const consecutiveRanks = rankCounts.concat(rankCounts.slice(0, 1)); // Account for ace-low straights (A-2-3-4-5)
  let consecutiveCount = 0;
  for (const count of consecutiveRanks) {
    consecutiveCount = count > 0 ? consecutiveCount + 1 : 0;
    if (consecutiveCount >= 5) {
      return true;
    }
  }
  return false;
}

function compareHands(my_hand, opp_hand) {
  if (my_hand.handRank > opp_hand.handRank) {
    return true;
  } else if (my_hand.handRank < opp_hand.handRank) {
    return false;
  } else {
    // Hands have the same rank, so we need to compare the primary and secondary ranks to break the tie.
    if (my_hand.primaryRank > opp_hand.primaryRank) {
      return true;
    } else if (my_hand.primaryRank < opp_hand.primaryRank) {
      return false;
    } else {
      // Primary ranks are also the same, so compare the secondary ranks.
      if (my_hand.secondaryRank > opp_hand.secondaryRank) {
        return true;
      } else if (my_hand.secondaryRank < opp_hand.secondaryRank) {
        return false;
      } else {
        // If both primary and secondary ranks are the same, the hands are tied.
        //We need to evaluate the high cards using the sorted rank attribute. 
        for (let i = 0; i < my_hand.sortedRanks.length; i++) {
          if (my_hand.sortedRanks[i] > opp_hand.sortedRanks[i]) {
            return true;
          } else if (my_hand.sortedRanks[i] < opp_hand.sortedRanks[i]) {
            return false;
          }
        }
        //If all are equal we will just true for a split pot
        return true;
      }
    }
  }
}


function hasNull(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === null) {
      return true;
    }
  }
  return false;
}


