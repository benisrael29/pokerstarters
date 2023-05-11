

export class Pot{
    constructor(bigBlind, smallBlind){

        this.main = 0;
        this.side = 0;

        this.minBet = 0;

        this.bigBlind = 20;
        this.smallBlind = 10;

        this.mainPotDisplay= null; 
    }

    //Draw all players chips
    drawChips(players){

        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            player.chipsDisplay.innerHTML = player.chips;
        }

        this.mainPotDisplay.innerHTML = this.main;
    }


    //Distribute the blinds and draw
    async blinds(players, dealerIndex){
    
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
        pot.main += pot.bigBlind;
        bigBlindPlayer.card2Display.style.border = "none";
        bigBlindPlayer.card1Display.style.border = "none";
    
    
    
        //TODO set big and small blind images
        //TODO raise blind every 10 rounds
    
        drawChips();
    
    }



}

export { Pot };