import { checkAuth, getLeaderboard, getPlayerProfile, logout } from '../fetch-utils.js';
import { deck, shuffleDeck, splitDeck } from '../deck.js';
checkAuth();

const logoutButton = document.getElementById('logout');
const startGameButton = document.querySelector('.start-game');
const shuffleSound = document.querySelector('.soundBtn');

window.addEventListener('load', async() => {

});

startGameButton.addEventListener('click', async() => {
    const hands = splitDeck(shuffleDeck(deck));
    shuffleSound.play();

    console.log(hands);

});



logoutButton.addEventListener('click', () => {
    logout();
});
