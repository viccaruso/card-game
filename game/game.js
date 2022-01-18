import { checkAuth, getLeaderboard, getPlayerProfile, logout } from '../fetch-utils.js';
import { deck, shuffleDeck, splitDeck } from '../deck.js';
checkAuth();

const logoutButton = document.getElementById('logout');
const startGameButton = document.querySelector('.start-game');
const shuffleSound = document.querySelector('.soundBtn');
const userCardCountEl = document.querySelector('.user-card-count');
const cpuCardCountEl = document.querySelector('.cpu-card-count');


let userCardCount = 26;
let cpuCardCount = 26;

window.addEventListener('load', async() => {

});

startGameButton.addEventListener('click', async() => {
    const hands = splitDeck(shuffleDeck(deck));
    console.log('The two hands are: ', hands);
    shuffleSound.play();
    userCardCount = 26;
    userCardCountEl.textContent = userCardCount;
    cpuCardCount = 26;
    cpuCardCountEl.textContent = cpuCardCount;
});



logoutButton.addEventListener('click', () => {
    logout();
});
