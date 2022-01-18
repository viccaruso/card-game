import { checkAuth, getLeaderboard, getPlayerProfile, logout } from '../fetch-utils.js';
import { deck, shuffleDeck, splitDeck } from '../deck.js';
checkAuth();

const logoutButton = document.getElementById('logout');

window.addEventListener('load', async() => {
    const hands = splitDeck(shuffleDeck(deck));
});



logoutButton.addEventListener('click', () => {
    logout();
});
