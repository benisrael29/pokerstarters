import { Deck } from './deck.js';
import {Pot} from './pot.js';



class Game{
    constructor(){
        this.deck = new Deck();

        this.players = [];
        this.community_cards = [];
        this.pot = new Pot();

        this.preflop = null; 
        this.flop = null;
        this.turn = null;
        this.river = null;

    }


    deal(players){
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            player.hand.push(this.deck.deal()); //First card
            player.hand.push(this.deck.deal()); //Second card
        }
    }

    //Checks if all plays have folded bar one
    checkFold(players){
        var count = 0;
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if(player.folded){
                count++;
            }
        }
        if(count == players.length - 1){
            return true;
        }
        return false;
    }

    



}