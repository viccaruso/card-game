import { checkAuth, getLeaderboard, getPlayerProfile, logout } from '../fetch-utils.js';
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


window.addEventListener('load', async() => {
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
    const hands = splitDeck(shuffleDeck(deck));
    // console.log('The two hands are: ', hands);
    shuffleSound.play();

    playerCardCount = 26;
    playerCardCountEl.textContent = playerCardCount;
    cpuCardCount = 26;
    cpuCardCountEl.textContent = cpuCardCount;

    playerDeck = hands.playerDeck;
    cpuDeck = hands.cpuDeck;
    
    console.log(playerDeck, cpuDeck);
    return playerDeck, cpuDeck;
});

hitBtn.addEventListener('click', async() => {
    playGame();
});

logoutButton.addEventListener('click', () => {
    logout();
});


function playGame() {
    playerCardContainer.textContent = '';
    cpuCardContainer.textContent = '';
    
    const playerHand = playerDeck.shift();
    const cpuHand = cpuDeck.shift();
    
    playerCardContainer.append(renderCard(playerHand));
    cpuCardContainer.append(renderCard(cpuHand));

    // console.log(playerHand.value, cpuHand.value);
    

    if (playerHand.value > cpuHand.value) {
        playerDeck.push(playerHand, cpuHand);
        playerCardCount++;
        cpuCardCount--;
        playerCardCountEl.textContent = playerCardCount;
        cpuCardCountEl.textContent = cpuCardCount;
    } else if (cpuHand.value > playerHand.value) {
        cpuDeck.push(playerHand, cpuHand);
        playerCardCount--;
        cpuCardCount++;
        playerCardCountEl.textContent = playerCardCount;
        cpuCardCountEl.textContent = cpuCardCount;
    } else if (cpuHand.value === playerHand.value) {
        console.log('!!!!!!WAR!!!!!!');
        
    }

    // if (playerCardCount === 0) {

    // }

    console.log('playerDeck', playerDeck, 'cpuDeck', cpuDeck);


}

