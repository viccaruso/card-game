import { checkAuth, getLeaderboard, getPlayerProfile, getUser, logout } from '../fetch-utils.js';
import { deck, shuffleDeck, splitDeck } from '../deck.js';
import { renderCard } from '../render-utils.js';
checkAuth();

const logoutButton = document.getElementById('logout');
const newGameButton = document.querySelector('.new-game');
const shuffleSound = document.querySelector('.soundBtn');
const playerCardCountEl = document.querySelector('.player-card-count');
const cpuCardCountEl = document.querySelector('.cpu-card-count');
const hitBtn = document.querySelector('.hit-btn');
const playerCardContainer = document.querySelector('.player-card');
const cpuCardContainer = document.querySelector('.cpu-card');

let playerCardCount = 26;
let cpuCardCount = 26;
let playerDeck = [];
let cpuDeck = [];
let warArr = [];
let wins = 0;
let totalGames = 0;

window.addEventListener('load', async() => {
    const user = await getUser();
    const player = await getPlayerProfile(user.user.id);

    const displayName = document.querySelector('.display-name');
    
    displayName.textContent = `${player.player_name} is doing battle!`;

    hitBtn.setAttribute('disabled', true);

    // const hands = splitDeck(shuffleDeck(deck));
    // console.log('The two hands are: ', hands);
    // shuffleSound.play();

    // userCardCount = 26;
    // userCardCountEl.textContent = userCardCount;
    // cpuCardCount = 26;
    // cpuCardCountEl.textContent = cpuCardCount;

    // playerDeck = hands.playerDeck;
    // cpuDeck = hands.cpuDeck;

    // console.log(playerDeck, cpuDeck);

});

newGameButton.addEventListener('click', async() => {
    hitBtn.removeAttribute('disabled');

    const hands = splitDeck(shuffleDeck(deck));
    shuffleSound.play();

    playerCardCount = 26;
    playerCardCountEl.textContent = playerCardCount;
    cpuCardCount = 26;
    cpuCardCountEl.textContent = cpuCardCount;

    playerDeck = hands.playerDeck;
    cpuDeck = hands.cpuDeck;

});

hitBtn.addEventListener('click', async() => {
    hitBtn.setAttribute('disabled', true);

    playGame();
});

logoutButton.addEventListener('click', () => {
    logout();
});


function playGame() {
    

    const playerHand = playerDeck.shift();
    const cpuHand = cpuDeck.shift();
    displayCards(playerHand, cpuHand);
    console.log('Player Deck Count: ', playerDeck.length);
    console.log('CPU Deck Count: ', cpuDeck.length);
    console.log('War Array Length:', warArr.length);
    console.log('Cards on table: ', playerHand.value, ' ', cpuHand.value);

    if (playerHand.value > cpuHand.value) {
        if (warArr.length > 0) {
            console.log(warArr);
            for (let card of warArr) {
                playerDeck.push(card);
            }
            warArr = [];
        }

        playerDeck.push(playerHand, cpuHand);

        playerCardCount = playerDeck.length;
        cpuCardCount = cpuDeck.length;
    } else if (cpuHand.value > playerHand.value) {
        if (warArr.length > 0) {
            console.log(warArr);
            for (let card of warArr) {
                cpuDeck.push(card);
            }
            warArr = [];
        }
        cpuDeck.push(playerHand, cpuHand);
        playerCardCount = playerDeck.length;
        cpuCardCount = cpuDeck.length;
    } else {
        displayCards(playerHand, cpuHand);
        const playerTopOne = playerDeck.shift();
        const playerTopTwo = playerDeck.shift();
        const playerTopThree = playerDeck.shift();
        const cpuTopOne = cpuDeck.shift();
        const cpuTopTwo = cpuDeck.shift();
        const cpuTopThree = cpuDeck.shift();
        console.error('!!!!!!WAR!!!!!!');
        warArr.push(playerHand, cpuHand, playerTopOne, playerTopTwo, playerTopThree, cpuTopOne, cpuTopTwo, cpuTopThree);
        console.log(warArr);
        console.error(warArr.length);
    }

    playerCardCountEl.textContent = playerCardCount;
    cpuCardCountEl.textContent = cpuCardCount;
    setTimeout(resetCards, 500);
    checkWin();
}

function displayCards(playerHand, cpuHand) {
    playerCardContainer.textContent = '';
    cpuCardContainer.textContent = '';
    playerCardContainer.append(renderCard(playerHand));
    cpuCardContainer.append(renderCard(cpuHand));
}

function resetCards() {
    playerCardContainer.textContent = '';
    cpuCardContainer.textContent = '';

    hitBtn.removeAttribute('disabled');

}

function checkWin() {
    if (cpuCardCount < 20) {
        wins++;
        totalGames++;
        console.error('YOU WON THE WAR', cpuCardCount);
        //  updates the games won for player 
        // updates total games for player
        // render "You WIN" modal 
        
    }
    if (playerCardCount < 20) {
        totalGames++;
        console.error('YOU LOST', playerCardCount); 
        // updates total games for player
        // render "YOU LOST" modal 
    }
}
 