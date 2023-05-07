/* Import deck */
import {Deck} from "./play_poker_tools/deck.js";
import {convertHand} from "./play_poker_tools/deck.js";

const deck = new Deck();


var player1 = {
    name: "P1",
    hand: [],
    chips: 1000,
    bet: 0,
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

}

var player2 = {
    name: "P2",
    hand: [],
    chips: 1000,
    bet: 0,
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
}

var player3 = {
    name: "P3",
    hand: [],
    chips: 1000,
    bet: 0,
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
    
}

var player4 = {
    name: "P4",
    hand: [],
    chips: 1000,
    bet: 0,
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

}

var me = {
    name: "me",
    hand: [],
    chips: 1000,
    bet: 0,
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
}

var pot = {
    main:0,
    side: 0,
    
    potMainDisplay: document.getElementById("pot-$"),
    potSideDisplay: document.getElementById("pot-$-s"),

}

//Table
const players = [player1, player2, player3, player4, me]
var dealerIndex = 0;


// Action Buttons
const startGameButton = document.getElementById("start-game-button");
const foldButton = document.getElementById("fold-button");
const checkButton = document.getElementById("check-button");
const raiseButton = document.getElementById("raise-button");

// Buttons -events
startGameButton.addEventListener("click", beginGame);
foldButton.addEventListener("click", fold);
checkButton.addEventListener("click", check);
raiseButton.addEventListener("click", raise);

//Track hands
var handNumber = 0;

//Define sleep function
const sleep = ms => new Promise(r => setTimeout(r, ms));


function beginGame(){
    console.log("beginning game");

    //Play till player runs out of chips
    while(me.chips >= 0){
        
        if(dealerIndex === 4){
            dealerIndex = 0;
        }

        blinds();
        deck.shuffle();
        deal();
        
        for (let i = 0; i < players.length; i++) {
            var actionPlayerIndex = (dealerIndex+i)%5;
            var actionPlayer = players[actionPlayerIndex];

            console.log("actionPlayer: " + actionPlayer.name);

            if(actionPlayer.folded){
                continue;
            }

            if(actionPlayer==me){
                //Wait till player presses check, fold, or raise
                var t=0; 
                while(!actionPlayer.turn){
                    //wait
                    sleep(1000);
                    console.log('waiting ${t} sec for player to act');
                    t++;

                    if (t==10){
                        //Player has timed out
                        fold();
                        break;
                    }
                }
                

            }

        }

        //End of hand
        handNumber++;
        dealerIndex++;

        if (handNumber ==100){
            break;
        }
    }

}


function fold(){
    me.folded = true;
    me.turn = false;
}

function check(){
    me.turn = false;
}

function raise(){
    me.turn = false;
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


function blinds(){
    var bigBlindPlayer = players[(dealerIndex + 2)%4];
    var smallBlindPlayer = players[(dealerIndex + 1)%4];

    bigBlindPlayer.bigBlind = true;
    smallBlindPlayer.smallBlind = true;

    bigBlindPlayer.bet = 20;
    smallBlindPlayer.bet = 10;

    bigBlindPlayer.chips -= 20;
    smallBlindPlayer.chips -= 10;

    //TODO set big and small blind images

    pot.main += 30;
    
    drawChips();
}