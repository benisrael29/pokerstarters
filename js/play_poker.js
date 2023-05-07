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
    amountDisplay.innerHTML = `${event.target.value}`;
  });


//Players
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

    minBet: 0,
        
    potMainDisplay: document.getElementById("pot-$"),
    potSideDisplay: document.getElementById("pot-$-s"),

}

//Table
const players = [player1, player2, player3, me, player4]
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
hideButtons();


//Track hands
var handNumber = 0;

//Define sleep function
const sleep = ms => new Promise(r => setTimeout(r, ms));

var game_in_progress = false;

async function beginGame(){
    if (game_in_progress){
        console.log("game already in progress");
        return;}

    console.log("beginning game");
    startGameButton.style.background = "green";
    game_in_progress = true;


    //Play till player runs out of chips
    while(me.chips >= 0){

        
        dealerIndex = dealerIndex%5;
        console.log("dealerIndex: " + dealerIndex);
        dealerDisplays[dealerIndex].classList.add("dealer");

        //set dealer token


        blinds();
        deck.shuffle();
        deal();

        await sleep(1500);
        await pre_flop();
        
        await sleep(1500);
        await flop();
        
        await sleep(1500);
        await turn();
        
        await sleep(1500);
        await river();
        
                
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

/* Pre-flop */
async function pre_flop(){
    console.log("PRE-FLOP");

    for (let i = 0; i < players.length; i++) {
        var actionPlayerIndex = (dealerIndex+i)%5;
        var actionPlayer = players[actionPlayerIndex];
    
        console.log("actionPlayer: " + actionPlayer.name);
        actionPlayer.turn = true;

        //Highlight player
        actionPlayer.card1Display.style.border = "2px solid red";
        actionPlayer.card2Display.style.border = "2px solid red";
    
        //Check if players have folded
        if (checkForFolded()){
            processWinner(actionPlayer);
            break;
        }

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
            //BOT action
            await botAction(actionPlayer);
        }


        //Unhighlight player
        actionPlayer.card1Display.style.border = "none";
        actionPlayer.card2Display.style.border = "none";
        
    }
    

}


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

    
    for (let i = 0; i < players.length; i++) {
        var actionPlayerIndex = (dealerIndex+i)%5;
        var actionPlayer = players[actionPlayerIndex];
        
        actionPlayer.turn = true;

        //Check if players have folded
        if (checkForFolded()){
            processWinner(actionPlayer);
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
                t++;
                
                if (t==100){
                    //Player has timed out
                    break;
                }
            }

            //Hide buttons
            hideButtons();
            
        }else{
            //BOT action
            await botAction(actionPlayer);
        }

        //Unhighlight player
        actionPlayer.card1Display.style.border = "none";
        actionPlayer.card2Display.style.border = "none";
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
    

    for (let i = 0; i < players.length; i++) {
        var actionPlayerIndex = (dealerIndex+i)%5;
        var actionPlayer = players[actionPlayerIndex];
    
        console.log("actionPlayer: " + actionPlayer.name);
        actionPlayer.turn = true;
        

        //Highlight player
        actionPlayer.card1Display.style.border = "2px solid red";
        actionPlayer.card2Display.style.border = "2px solid red";

        //Check if players have folded
        if (checkForFolded()){
            processWinner(actionPlayer);
            break;
        }

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
                t++;
                
                if (t==100){
                    //Player has timed out
                    break;
                }
            }

            //Hide buttons
            hideButtons();
            
        }else{
            //BOT action
            await botAction(actionPlayer);
        }

        //Unhighlight player
        actionPlayer.card1Display.style.border = "none";
        actionPlayer.card2Display.style.border = "none";
        
    }
}


/* River */
async function river(){
    console.log("RIVER")

    //Deal river
    communityCards.push(deck.deal());

    //Display river
    const communitySrc5 = convertHand(communityCards[4]);
    communityCard5Display.style.backgroundImage = `url("${communitySrc5.replace('"', '\\"')}")`;
    communityCard5Display.classList.remove('board');
    
        for (let i = 0; i < players.length; i++) {
            var actionPlayerIndex = (dealerIndex+i)%5;
            var actionPlayer = players[actionPlayerIndex];
            
            console.log("actionPlayer: " + actionPlayer.name);
            actionPlayer.turn = true;
            
            //Highlight player
            actionPlayer.card1Display.style.border = "2px solid red";
            actionPlayer.card2Display.style.border = "2px solid red";
            
            //Check if players have folded
            if (checkForFolded()){
                processWinner(actionPlayer);
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
                    t++;
                    
                    if (t==100){
                        //Player has timed out
                        break;
                    }
                }

                //Hide buttons
                hideButtons();
                
            }else{
                //BOT action
                await botAction(actionPlayer);
            }

        //Unhighlight player
        actionPlayer.card1Display.style.border = "none";
        actionPlayer.card2Display.style.border = "none";
            
        }
    }       

function fold(){
    console.log("fold")
    me.folded = true;
    me.turn = false;
}

function check(){
    console.log("check")

    if (pot.minBet > 0){
        //Player has to call
        me.chips -= pot.minBet;
        pot.chips += pot.minBet;
        drawChips();
    }
    
    me.turn = false;
}

function raise(){
    console.log("raise")
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
    var bigBlindPlayer = players[(dealerIndex + 2)%5];
    var smallBlindPlayer = players[(dealerIndex + 1)%5];

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

async function botAction(player){
    console.log("botAction: " + player.name);
    
    await sleep(1000);


    //Todo: implement bot logic
    //generate random int between 0 and 100
    var bet = Math.floor(Math.random() * 100);

    player.bet = bet;
    player.chips -= bet;

    //If bet is greater than min bet, add to pot. Else, add min bet to pot
    if (player.bet > pot.minBet){
        pot.main += bet;
        pot.minBet = bet;
    }else{
        pot.main += pot.minBet;
    }
           
    
    drawChips();
}

function checkForFolded(){
    //Returns true if all players have folded except one
    var numFolded = 0;
    for (let i = 0; i < players.length; i++) {
        if(players[i].folded){
            numFolded++;
        }
    }
    if(numFolded == 4){
        return true;
    }else{
        return false;
    }
}


function processWinner(player){
    console.log("processWinner: " + player.name);
    player.chips += pot.main;
    pot.main = 0;
    drawChips();
}


function displayButtons(){
    foldButton.style.display = "inline-block";

    if (pot.minBet == 0){
        checkButton.style.display = "inline-block";
        raiseButton.style.display = "inline-block";
    }
    
    if (pot.minBet > 0){
        //Display Call, fold, raise buttons
        checkButton.innerHTML = "Call $" + pot.minBet;
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