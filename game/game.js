import { checkAuth, getLeaderboard, getPlayerProfile, logout } from '../fetch-utils.js';
import { deck, shuffleDeck, splitDeck } from '../deck.js';
import { renderCard } from '../render-utils.js';
checkAuth();

const logoutButton = document.getElementById('logout');
const newGameButton = document.querySelector('.new-game');
const shuffleSound = document.querySelector('.soundBtn');
const userCardCountEl = document.querySelector('.user-card-count');
const cpuCardCountEl = document.querySelector('.cpu-card-count');
const hitBtn = document.querySelector('.hit-btn');
const playerCardContainer = document.querySelector('.player-card');
const cpuCardContainer = document.querySelector('.cpu-card');

let userCardCount = 26;
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
    console.log('The two hands are: ', hands);
    shuffleSound.play();

    userCardCount = 26;
    userCardCountEl.textContent = userCardCount;
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
    renderCard(playerDeck[6]);
    playerCardContainer.append(renderCard(playerDeck[0]));
    cpuCardContainer.textContent = '';
    cpuCardContainer.append(renderCard(cpuDeck[0]));
    // if (playerDeck[0].value > cpuDeck[0].value) {
        
    // }
    
}