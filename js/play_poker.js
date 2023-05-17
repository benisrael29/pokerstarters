/* Import deck */
import {Deck} from "./play_poker_tools/deck.js";
import {convertHand} from "./play_poker_tools/deck.js";
const deck = new Deck();

//community cards
var communityCards = [];

const communityCard1Display = document.getElementById("community-card-1");
const communityCard2Display = document.getElementById("community-card-2");
const communityCard3Display = document.getElementById("community-card-3");
const communityCard4Display = document.getElementById("community-card-4");
const communityCard5Display = document.getElementById("community-card-5");
const communityCardDisplays = [communityCard1Display, communityCard2Display, communityCard3Display, communityCard4Display, communityCard5Display];

//Dealer Tokens
const dealer1Display = document.getElementById("dealer-1");
const dealer2Display = document.getElementById("dealer-2");
const dealer3Display = document.getElementById("dealer-3");
const dealer4Display = document.getElementById("dealer-4");
const dealer5Display = document.getElementById("dealer-5");
const dealerDisplays = [dealer1Display, dealer2Display, dealer3Display, dealer4Display, dealer5Display];

//Raise
const raiseSelector = document.getElementById("amount");
const amountDisplay = document.getElementById("amount-to-raise");
raiseSelector.addEventListener("change", (event) => {
    amountDisplay.innerHTML = `$${event.target.value}`;
  });

var confirmRaise = false;
const confirmRaiseButton = document.getElementById("confirm-raise-button");



//Players
var player1 = {
    name: "P1",
    hand: [],
    chips: 1000,
    bet: 0,
    bets: [],
    betThisRound: 0,
    folded: false,
    allIn: false,
    dealer: false,
    smallBlind: false,
    bigBlind: false,
    winner: false,
    turn: false,

    chipsDisplay: document.getElementById("P1-$"),
    card1Display: document.getElementById("P1-card-1"),
    card2Display: document.getElementById("P1-card-2"),

    dealerDisplay: document.getElementById("dealer-1"),

    //Dialog
    dialog: document.getElementById("P1-dial"),
}

var player2 = {
    name: "P2",
    hand: [],
    chips: 1000,
    bet: 0,
    bets: [],
    betThisRound: 0,
    folded: false,
    allIn: false,
    dealer: false,
    smallBlind: false,
    bigBlind: false,
    winner: false,
    turn: false,

    chipsDisplay: document.getElementById("P2-$"),
    card1Display: document.getElementById("P2-card-1"),
    card2Display: document.getElementById("P2-card-2"),

    dealerDisplay: document.getElementById("dealer-2"),

    //Dialog
    dialog: document.getElementById("P2-dial"),
}

var player3 = {
    name: "P3",
    hand: [],
    chips: 1000,
    bet: 0,
    bets: [],
    betThisRound: 0,
    folded: false,
    allIn: false,
    dealer: false,
    smallBlind: false,
    bigBlind: false,
    winner: false,
    turn: false,

    chipsDisplay: document.getElementById("P3-$"),
    card1Display: document.getElementById("P3-card-1"),
    card2Display: document.getElementById("P3-card-2"),
    
    dealerDisplay: document.getElementById("dealer-3"),

    //Dialog
    dialog: document.getElementById("P3-dial"),
}

var player4 = {
    name: "P4",
    hand: [],
    chips: 1000,
    bet: 0,
    bets: [],
    betThisRound: 0,
    folded: false,
    allIn: false,
    dealer: false,
    smallBlind: false,
    bigBlind: false,
    winner: false,
    turn: false,

    chipsDisplay: document.getElementById("P4-$"),
    card1Display: document.getElementById("P4-card-1"),
    card2Display: document.getElementById("P4-card-2"),


    dealerDisplay: document.getElementById("dealer-5"),

    //Dialog
    dialog: document.getElementById("P4-dial"),
}

var me = {
    name: "You",
    hand: [],
    chips: 1000,
    bet: 0,
    bets: [],
    betThisRound: 0,
    folded: false,
    allIn: false,
    dealer: false,
    smallBlind: false,
    bigBlind: false,
    winner: false,
    turn: false,

    chipsDisplay: document.getElementById("me-$"),
    card1Display: document.getElementById("me-card-1"),
    card2Display: document.getElementById("me-card-2"),

    dealerDisplay: document.getElementById("dealer-4"),

    //Dialog
    dialog: document.getElementById("me-dial"),
}

var pot = {
    main:0,
    side: 0,

    minBet: 20,

    bigBlind: 20,
    smallBlind: 10,
        
    potMainDisplay: document.getElementById("pot-$"),
    potSideDisplay: document.getElementById("pot-$-s"),

}

//Table
const players = [player1, player2, player3, me, player4]
const winnerDisplay = document.getElementById("winner");
const popup = document.getElementById("popup-play");
const popupWinner = document.getElementById("popup-play-winner");
var dealerIndex = 3;


// Action Buttons
const startGameButton = document.getElementById("start-game-button");
const foldButton = document.getElementById("fold-button");
const checkButton = document.getElementById("check-button");
const raiseButton = document.getElementById("raise-button");

const popupPlayOverlay = document.getElementById("popup-play");

// Buttons -events
startGameButton.addEventListener("click", beginGame);
foldButton.addEventListener("click", fold);
checkButton.addEventListener("click", check);
raiseButton.addEventListener("click", raise);
hideButtons();


//Track hands
var handNumber = 0;


//Define sleep function
const sleep = ms => new Promise(r => setTimeout(r, ms));

var game_in_progress = false;
var hand_in_progress = false;

async function beginGame(){
    // remove overlay
    popupPlayOverlay.style.display = "none";

    //Check for game in progress
    if (game_in_progress){
        console.log("game already in progress");
        return;}

    console.log("beginning game");
    startGameButton.style.background = "green";
    game_in_progress = true;

    
    //draw chips
    drawChips();

    //Play till player runs out of chips
    while(me.chips >= 0){
        //lets play
        hand_in_progress = true;
        
        dealerIndex = dealerIndex%5;
        console.log("dealerIndex: " + dealerIndex);
        dealerDisplays[dealerIndex].classList.add("dealer");

        //set dealer token


        await blinds();
        deck.shuffle();
        deal();

        await sleep(1500);
        await pre_flop(dealerIndex);
        if(!hand_in_progress){
            dealerDisplays[dealerIndex].classList.remove("dealer");
            handNumber++;
            dealerIndex++;
            continue;
        }


        await sleep(1500);
        await flop();
        if(!hand_in_progress){
            dealerDisplays[dealerIndex].classList.remove("dealer");
            handNumber++;
            dealerIndex++;
            continue;
        }
        
        await sleep(1500);
        await turn();
        if(!hand_in_progress){
            dealerDisplays[dealerIndex].classList.remove("dealer");
            handNumber++;
            dealerIndex++;
            continue;
        }
        
        await sleep(1500);
        await river();
        if(!hand_in_progress){
            dealerDisplays[dealerIndex].classList.remove("dealer");
            handNumber++;
            dealerIndex++;
            continue;
        }
        
        await sleep(1500);
        await showDown();
        await processWinner();
        //End of hand
        dealerDisplays[dealerIndex].classList.remove("dealer");
        handNumber++;
        dealerIndex++;

        if (handNumber ==100){
            console.log("You've played 100 hands!")
            break;
        }
    }
    
}


var preflop_progress = [];
/* Pre-flop */
async function pre_flop(playIndex){
    console.log("PRE-FLOP");

    for (let i = 0; i < players.length+1; i++) {
        var actionPlayerIndex = (playIndex+i+3)%5;
        var actionPlayer = players[actionPlayerIndex];
    
        console.log("actionPlayer: " + actionPlayer.name);
        actionPlayer.turn = true;

        //Check if players have folded
        if (await checkForFolded()){
            await processWinner();
            break;
        }


        
        
        //Highlight player
        actionPlayer.card1Display.style.border = "2px solid red";
        actionPlayer.card2Display.style.border = "2px solid red";
    

        if(actionPlayer.folded){
            continue;
        }
    
        if(actionPlayer==me && !actionPlayer.folded){
            //Wait till player presses check, fold, or raise
            displayButtons();

            var t=0; 
            while(actionPlayer.turn){
                //wait
                await sleep(1000);
                console.log('waiting ${t} sec for player to act');
                t++;
    
                if (t==100){
                    //Player has timed out
                    break;
                }
            }

            //Hide buttons
            hideButtons();
        
    
        }else{
            console.log(getHighestBet())
            console.log(preflop_progress)
            if (actionPlayer.bet == getHighestBet() && preflop_progress.length != 0){
                //Check
                await botCheck(actionPlayer, false);
            }else{
                //BOT action
                await botAction(actionPlayer, true);
            }

        }


        //Unhighlight player
        actionPlayer.card1Display.style.border = "none";
        actionPlayer.card2Display.style.border = "none";
        
    }

    //check if all players have matched if not recursivly call hand. 
    if (!checkForMatched()){
        //add to progress
        preflop_progress.push(1);
        await pre_flop(playIndex+1)
    }
}

var flopPrgress = []
/* Flop */
async function flop(){
    console.log("FLOP");

    communityCards.push(deck.deal());
    communityCards.push(deck.deal());
    communityCards.push(deck.deal());

    //Display flop
    const communitySrc1 = convertHand(communityCards[0]);
    const communitySrc2 = convertHand(communityCards[1]);
    const communitySrc3 = convertHand(communityCards[2]);

    communityCard1Display.style.backgroundImage = `url("${communitySrc1.replace('"', '\\"')}")`;
    communityCard2Display.style.backgroundImage = `url("${communitySrc2.replace('"', '\\"')}")`;
    communityCard3Display.style.backgroundImage = `url("${communitySrc3.replace('"', '\\"')}")`;

    communityCard1Display.classList.remove('board');
    communityCard2Display.classList.remove('board');
    communityCard3Display.classList.remove('board');

    communityCard1Display.style.backgroundColor = "white"
    communityCard2Display.style.backgroundColor = "white"
    communityCard3Display.style.backgroundColor = "white"

    //Reset minbet
    pot.minBet = 0;
    
    for (let i = 0; i < players.length+1; i++) {
        var actionPlayerIndex = (dealerIndex+i+1)%5; //Starts with player to left of big blind
        var actionPlayer = players[actionPlayerIndex];
        
        actionPlayer.turn = true;

        //Check if players have folded
        if (await checkForFolded()){
            await processWinner();
            break;
        }

        //Highlight player
        actionPlayer.card1Display.style.border = "2px solid red";
        actionPlayer.card2Display.style.border = "2px solid red";

        if(actionPlayer.folded){
            continue;
        }
        
        if(actionPlayer==me){
            //Display buttons
            displayButtons();
            
            //Wait till player presses check, fold, or raise
            var t=0; 
            while(actionPlayer.turn){
                //wait
                await sleep(1000);
                console.log('waiting ${t} sec for player to act');
            }

            //Hide buttons
            hideButtons();
            
        }else{
            //if flop porgress is 1 and the player has the highest bet, then check
            if (flopPrgress.length == 1 && actionPlayer.bet == getHighestBet()){
                await botCheck(actionPlayer)
            }

            //BOT action
            await botAction(actionPlayer, true);
        }

        //UnhigcheckRaisehlight player
        actionPlayer.card1Display.style.border = "none";
        actionPlayer.card2Display.style.border = "none";

    }


    if(!checkForMatched()){
        flopPrgress.push(1)
        await flop()
    }
}


/* Turn */
async function turn(){
    console.log("TURN")


    //Deal turn
    communityCards.push(deck.deal());

    //Display turn
    const communitySrc4 = convertHand(communityCards[3]);
    communityCard4Display.style.backgroundImage = `url("${communitySrc4.replace('"', '\\"')}")`;
    communityCard4Display.classList.remove('board');

    communityCard4Display.style.backgroundColor = "white"

    //Reset minbet
    pot.minBet = 0;

    for (let i = 0; i < players.length+1; i++) {
        var actionPlayerIndex = (dealerIndex+i+1)%5;
        var actionPlayer = players[actionPlayerIndex];
    
        console.log("actionPlayer: " + actionPlayer.name);
        actionPlayer.turn = true;

        //Check if players have folded
        if (await checkForFolded()){
            await processWinner();
            break;
        }
        

        //Highlight player
        actionPlayer.card1Display.style.border = "2px solid red";
        actionPlayer.card2Display.style.border = "2px solid red";

        if(actionPlayer.folded){
            continue;
        }
        
        if(actionPlayer==me){
            //Display buttons
            displayButtons();
            
            //Wait till player presses check, fold, or raise
            var t=0; 
            while(actionPlayer.turn){
                //wait
                await sleep(1000);
                console.log('waiting ${t} sec for player to act');
            }

            //Hide buttons
            hideButtons();
            
        }else{
            //BOT action
            await botAction(actionPlayer, true);
        }

        //Unhighlight player
        actionPlayer.card1Display.style.border = "none";
        actionPlayer.card2Display.style.border = "none";
        
    }

    if(!checkForMatched()){
        await turn()
    }
}


/* River */
async function river(){
    console.log("RIVER")
    
    //Reset minbet
    pot.minBet = 0;

    //Deal river
    communityCards.push(deck.deal());

    //Display river
    const communitySrc5 = convertHand(communityCards[4]);
    communityCard5Display.style.backgroundImage = `url("${communitySrc5.replace('"', '\\"')}")`;
    communityCard5Display.classList.remove('board');
    communityCard5Display.style.backgroundColor = "white"

    
        for (let i = 0; i < players.length+1; i++) {
            var actionPlayerIndex = (dealerIndex+i+1)%5;
            var actionPlayer = players[actionPlayerIndex];
            
            console.log("actionPlayer: " + actionPlayer.name);
            actionPlayer.turn = true;
            
            //Highlight player
            actionPlayer.card1Display.style.border = "2px solid red";
            actionPlayer.card2Display.style.border = "2px solid red";
            
            //Check if players have folded
            if (await checkForFolded()){
                await processWinner();
                break;
            }


            if(actionPlayer.folded){
                continue;
            }
            
            if(actionPlayer==me){
                // Display buttons
                displayButtons();
                
                //Wait till player presses check, fold, or raise
                var t=0; 
                while(actionPlayer.turn){
                    //wait
                    await sleep(1000);
                    console.log('waiting ${t} sec for player to act');

                }

                //Hide buttons
                hideButtons();
                
            }else{
                //BOT action
                await botAction(actionPlayer, true);
            }

        //Unhighlight player
        actionPlayer.card1Display.style.border = "none";
        actionPlayer.card2Display.style.border = "none";

       }

    if(!checkForMatched()){
        await river()
    }   

    } 
    

// Check if all players have matched
function checkForMatched() {
    var highestBet = 0;
    for (var i = 0; i < players.length; i++) {
      var player = players[i];
      if (player.folded) {
        continue;
      }
      if (player.bet > highestBet) {
        highestBet = player.bet;
      }
    }
    for (var i = 0; i < players.length; i++) {
      var player = players[i];
      if (player.folded) {
        continue;
      }
      if (player.bet < highestBet) {
        return false;
      }
    }
    return true;
  }



async function fold(){
    console.log("fold")
    me.folded = true;

    raiseSelector.style.visibility = "hidden";
    amountDisplay.style.visibility = "hidden";
    confirmRaiseButton.style.visibility = "hidden";
    me.turn = false;    

    await displayDialog(me, "Fold")

}

async function check(){
    console.log("check/call")

    //This is a call
    if (getHighestBet()> me.bet){
        //Player has to call
        var mybet = getHighestBet() - me.bet;
        
        me.chips -= mybet;
        pot.main += mybet;
        me.bet += mybet;
        me.betThisRound += mybet;
        me.bets.push(mybet);

        drawChips(); 
        me.turn = false;
        await displayDialog(me, "Call $"+mybet)

    }else{
        //this is a check
        raiseSelector.style.visibility = "hidden";
        amountDisplay.style.visibility = "hidden";
        confirmRaiseButton.style.visibility = "hidden";
        
        me.turn = false;
        await displayDialog(me, "Check")

    }


}

async function raise() {
    raiseSelector.style.visibility = "visible";
    amountDisplay.style.visibility = "visible";
    confirmRaiseButton.style.visibility = "visible";
    amountDisplay.innerHTML = "$50"
  
    return new Promise((resolve, reject) => {
      confirmRaiseButton.addEventListener("click", () => {
        const amount = raiseSelector.value;
        console.log(`User selected to raise ${amount}`);
  
        raiseSelector.style.visibility = "hidden";
        amountDisplay.style.visibility = "hidden";
        confirmRaiseButton.style.visibility = "hidden";
  
        resolve(amount);
      });
  
      // You can add a similar event listener to handle the cancel button if needed
    }).then((amount) => {
      // The user confirmed the raise
      pot.main += parseInt(amount);
      me.chips -= amount;
      me.bets.push(amount);

      drawChips();
      me.turn = false;
      displayDialog(me, "Raise $" + amount)

    }).catch(() => {
      raiseSelector.style.visibility = "hidden";
      amountDisplay.style.visibility = "hidden";
      confirmRaiseButton.style.visibility = "hidden";
      me.turn = true;
    });
  }

function deal(){
    player1.hand.push(deck.deal());
    player1.hand.push(deck.deal());

    player2.hand.push(deck.deal());
    player2.hand.push(deck.deal());

    player3.hand.push(deck.deal());
    player3.hand.push(deck.deal());
    
    player4.hand.push(deck.deal());
    player4.hand.push(deck.deal());

    me.hand.push(deck.deal());
    me.hand.push(deck.deal());

    console.log(me.hand);
    const convertedHand = convertHand(me.hand[0]);
    console.log("convertedHand: " + convertedHand)

    
    me.card1Display.style.backgroundImage = `url("${convertedHand.replace('"', '\\"')}")`;
    me.card2Display.style.backgroundImage = `url("${convertHand(me.hand[1]).replace('"', '\\"')}")`;
}

function drawChips(){
    me.chipsDisplay.innerHTML = "$"+ me.chips;
    player1.chipsDisplay.innerHTML = "$"+ player1.chips;
    player2.chipsDisplay.innerHTML = "$"+ player2.chips;
    player3.chipsDisplay.innerHTML = "$"+ player3.chips;
    player4.chipsDisplay.innerHTML = "$"+ player4.chips;
    pot.potMainDisplay.innerHTML = "$"+pot.main;
}


async function blinds(){


    var bigBlindPlayer = players[(dealerIndex + 2)%5];
    var smallBlindPlayer = players[(dealerIndex + 1)%5];
    
    console.log("blinds:")
    console.log("bigBlindPlayer: " + bigBlindPlayer.name);
    console.log("smallBlindPlayer: " + smallBlindPlayer.name);

    bigBlindPlayer.bigBlind = true;
    smallBlindPlayer.smallBlind = true;

    //Highlight and set bet
    smallBlindPlayer.card2Display.style.border = "2px solid red";
    smallBlindPlayer.card1Display.style.border = "2px solid red";
    smallBlindPlayer.dealerDisplay.innerHTML = "SB"
    await sleep(1000);
    smallBlindPlayer.bet = pot.smallBlind;
    smallBlindPlayer.chips -= pot.smallBlind;
    smallBlindPlayer.betThisRound = pot.smallBlind;
    pot.main += pot.smallBlind;
    drawChips();
    await displayDialog(smallBlindPlayer, "Small Blind")
    smallBlindPlayer.card2Display.style.border = "none";
    smallBlindPlayer.card1Display.style.border = "none";

    bigBlindPlayer.card2Display.style.border = "2px solid red";
    bigBlindPlayer.card1Display.style.border = "2px solid red";
    bigBlindPlayer.dealerDisplay.innerHTML = "BB"
    await sleep(1000);
    await displayDialog(bigBlindPlayer, "Big Blind")
    bigBlindPlayer.bet = pot.bigBlind;
    bigBlindPlayer.chips -= pot.bigBlind;
    bigBlindPlayer.betThisRound = pot.bigBlind;
    pot.main += pot.bigBlind;
    bigBlindPlayer.card2Display.style.border = "none";
    bigBlindPlayer.card1Display.style.border = "none";


    //Set min bet to be pot

    //TODO set big and small blind images
    //TODO raise blind every 10 rounds

    drawChips();
}


function generateMissingCards(my_cards) {
    const allUsedCards = new Set([...my_cards]);
    const ranks = '23456789TJQKA';
    const suits = 'CDHS';
    const opp_cards = [];

    // Add initial cards to used cards set
    my_cards.forEach(card => allUsedCards.add(card));

    // Generate missing cards
    while (opp_cards.length < 5) {
        if (opp_cards.length < my_cards.length) {
        opp_cards.push(my_cards[opp_cards.length]);
        } else {
        let card = '';
        do {
            const rank = ranks[Math.floor(Math.random() * ranks.length)];
            const suit = suits[Math.floor(Math.random() * suits.length)];
            card = rank + suit;
        } while (allUsedCards.has(card));
        opp_cards.push(card);
        allUsedCards.add(card);
        }
    }

    return opp_cards;
}

async function botCheck(player){
    console.log("botCheck: " + player.name);
    await displayDialog(player, "Check")
    player.turn = false;
}

async function botAction(player, canRaise){
    console.log("botAction: " + player.name);
    
    //Evaluate hand
    var cards = player.hand.concat(communityCards);
    console.log(cards)
    var wins = 0; 
    
    //Monte carlo hand
    for (let i=0; i<100000; i++){
        var my_cards = generateMissingCards(cards);
        var opp_cards = generateMissingCards(communityCards)


        var my_cards_value = evaluateHand(my_cards);
        var opp_cards_value = evaluateHand(opp_cards);

        var res = compareHands(my_cards_value, opp_cards_value);

        if (res){
            wins++;
        }
    }
    
    var winPercentage = (wins/100000)*100;
    console.log("hand: " + player.hand);
    console.log("winPercentage: " + winPercentage);
    console.log("pot min bet:" + pot.minBet)
    

    var highestBet = getHighestBet();
    console.log("highestBet: " + highestBet);

    await sleep(3000);
    //random bluff chance
    var bluffChance = Math.floor(Math.random() * 100);

    
    if (bluffChance < 5){
        winPercentage = 95;
    }


    //if we have entered 50% of our chips and we dont have a >95% chance of winning
    if (player.bet > player.chips/5 && winPercentage < 95){
        console.log("BOT FOLD");
        //Fold
        player.folded = true;
        player.turn = false;
    
        player.card1Display.style.opacity = 0;
        player.card2Display.style.opacity = 0;
    
        await displayDialog(player, "Fold");
        return;
    }

    
    
    //If we have a good hand
    if (winPercentage > 50 && canRaise){
        console.log("BOT BET");
        //Bet - 
        var betAmount = Math.floor(Math.random() * (highestBet - highestBet/2)) + highestBet/2;
        
        if (betAmount <highestBet){
            betAmount = highestBet;
        }

        betAmount = botBet(player, betAmount);
        player.turn = false;
        await displayDialog(player, "Bet $" + betAmount);
        drawChips();
        return;
    }

    if (winPercentage > 50 && !canRaise){
        console.log("BOT CALL");
        //Call
        var callAmount = getHighestBet() - player.betThisRound;
        betAmount = botBet(player, callAmount);
        player.turn = false;
        await displayDialog(player, "Call $" + betAmount);
        drawChips();
        return;
    }

    if (player.betThisRound == highestBet){
        console.log("BOT CHECK");
        //Check
        player.turn = false;
        await displayDialog(player, "Check");
        drawChips();
        return;
    }

    //Else we fold
    console.log("BOT FOLDED");

    //Fold
    player.folded = true;
    player.turn = false;
    player.card1Display.style.opacity = 0;
    player.card2Display.style.opacity = 0;
    await displayDialog(player, "Fold");
           
    drawChips();
}

function botBet(player, amount){

    if (amount > player.chips){
        amount = player.chips;
        player.allIn = true;
    }

    player.bets.push(amount);
    player.bet += amount;
    player.chips -= amount;
    player.betThisRound += amount;
    pot.main += amount;
    console.log("player.betThisRound: " + amount);

    return amount;
}

function getHighestBet() {
    var highestBet = 0;
    for (var i = 0; i < players.length; i++) {
      var player = players[i];
      if (player.folded) {
        continue;
      }
      if (player.bet > highestBet) {
        highestBet = player.bet;
      }
    }
    return highestBet;
  }



async function displayDialog(player, dialog){
    player.dialog.innerHTML = dialog;
    player.dialog.classList.add("visible")
    await sleep(1000);
    player.dialog.classList.remove("visible")
    
}

async function checkForFolded(){
    //Returns true if all players have folded except one
    var numFolded = 0;
    for (let i = 0; i < players.length; i++) {
        if(players[i].folded){
            numFolded++;
        }
    }
    if(numFolded == 4){
        showDown();
        hand_in_progress = false;
        return true;
    }else{
        return false;
    }
}


function displayButtons(){
    foldButton.style.display = "inline-block";
    var highestBet = getHighestBet();

    if (highestBet == me.bet){
        checkButton.style.display = "inline-block";
        raiseButton.style.display = "inline-block";
    }
    
    if (highestBet > me.bet){
        //Display Call, fold, raise buttons
        checkButton.innerHTML = "Call $" + (highestBet - me.bet);
        checkButton.style.display = "inline-block";
        raiseButton.style.display = "inline-block";
    }

}

function hideButtons(){
    //Reset check/call
    checkButton.innerHTML = "Check";

    //Hide check, fold, raise buttons
    checkButton.style.display = "none";
    foldButton.style.display = "none";
    raiseButton.style.display = "none";
}


async function showDown(){
    console.log("showDown");

    //Show all cards expect folded players
    for (let i = 0; i < players.length; i++) {
        if (players[i].folded){
            continue;
        }

        players[i].card1Display.style.backgroundImage = `url("${convertHand(players[i].hand[0]).replace('"', '\\"')}")`;
        players[i].card2Display.style.backgroundImage = `url("${convertHand(players[i].hand[1]).replace('"', '\\"')}")`;
    }


    //For each player, check if they have the best hand
    var bestPlayer = null;
    var bestHand = null;
    for (let i = 0; i < players.length; i++) {

        //Skip folded players
        if(players[i].folded){
            continue;
        }

        if (bestPlayer == null){
            bestPlayer = players[i];
            bestHand = players[i].hand + communityCards;
        }

        var playersHand = players[i].hand + communityCards;
        var rankOfPlayersHand = evaluateHand(playersHand);
        var rankOfBestHand = evaluateHand(bestHand);

        if (compareHands(rankOfPlayersHand, rankOfBestHand)){
            bestPlayer = players[i];
            bestHand = playersHand;
        }
    }

    console.log(bestPlayer.name + " wins with " + bestHand);
    var winningHand = await evaluateHand(bestHand);


    //Display winner
    popupWinner.style.display = "block";
    popupWinner.innerHTML = bestPlayer.name + " wins $" + pot.main+ " with " + winningHand.description;
    
    //Wait 5 seconds
    await sleep(5000);

    //Hide popup
    popupWinner.style.display = "none";

    return bestPlayer;
        
}


async function processWinner(){
    console.log("processing Winner")
    var winner = await showDown();

    console.log("processWinner: " + winner.name);

    winner.chips += pot.main;
    pot.minBet = pot.bigBlind;
    pot.main = 0;
    pot.side = 0;

    drawChips();

    //Reset bets, folded and hands
    //hide cards
    for (let i = 0; i < players.length; i++) {
        players[i].bet = 0;
        players[i].folded = false;
        players[i].hand = [];
        players[i].betThisRound = 0;

        //Hide cards
        players[i].card1Display.style.backgroundImage = `url("images/cards/back.png")`;
        players[i].card2Display.style.backgroundImage = `url("images/cards/back.png")`;
        players[i].card1Display.style.opacity = 1;
        players[i].card2Display.style.opacity = 1;

        //Reset blinds
        players[i].bigBlind = false;
        players[i].smallBlind = false;

        console.log(players[i].name);
        players[i].dealerDisplay.innerHTML = "";

        players[i].card2Display.style.border = "none";
        players[i].card1Display.style.border = "none";

    }


    //Reset community cards
    communityCards = [];

    //Hide all community cards
    for (let i = 0; i < communityCardDisplays.length; i++) {
        communityCardDisplays[i].style.backgroundImage = `none`;
        communityCardDisplays[i].classList.add("board")
        communityCardDisplays[i].style.backgroundColor = "chartreuse"
    }


    //Reset deck
    deck.reset();

}



/* Evaluation Functions */
function evaluateHand(cards) {
    const ranks = '23456789TJQKA';
    const suits = 'CDHS';
    
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
      return { handRank: 8, primaryRank, secondaryRank,sortedRanks, description:"Straight Flush" }; // Straight flush
    }
  
    if (primaryRank === 4) {
      return { handRank: 7, primaryRank, secondaryRank,sortedRanks, description:"Four of a Kind" }; // Four of a kind
    }
    
    if (primaryRank === 3 && secondaryRank === 2) {
      return { handRank: 6, primaryRank, secondaryRank,sortedRanks, description: "Full House" }; // Full house
    }
    
    if (isFlush) {
      return { handRank: 5, primaryRank, secondaryRank,sortedRanks, description:"Flush" }; // Flush
    }
    
    if (isStraight) {
      return { handRank: 4, primaryRank, secondaryRank,sortedRanks, description:"Straight" }; // Straight
    }
    
    if (primaryRank === 3) {
      return { handRank: 3, primaryRank, secondaryRank,sortedRanks, description:"Three of a kind" }; // Three of a kind
    }
    
    if (primaryRank === 2 && secondaryRank === 2) {
      return { handRank: 2, primaryRank, secondaryRank ,sortedRanks, description: "Two Pair"}; // Two pair
    }
    
    if (primaryRank === 2) {
      return { handRank: 1, primaryRank, secondaryRank,sortedRanks, description:"One Pair"}; // One pair
    }
    
    return { handRank: 0, primaryRank, secondaryRank,sortedRanks, description: "a High Card" }; // High card
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