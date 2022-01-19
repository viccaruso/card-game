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
let warArr = [];

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
    shuffleSound.play();

    playerCardCount = 26;
    playerCardCountEl.textContent = playerCardCount;
    cpuCardCount = 26;
    cpuCardCountEl.textContent = cpuCardCount;

    playerDeck = hands.playerDeck;
    cpuDeck = hands.cpuDeck;
});

hitBtn.addEventListener('click', async() => {
    // while (playerCardCount > 20 && cpuCardCount > 20) {

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
        console.error('!!!!!!WAR!!!!!!');
        warArr.push(playerHand, cpuHand);
        console.log(warArr);
        console.error(warArr.length);
    }

    playerCardCountEl.textContent = playerCardCount;
    cpuCardCountEl.textContent = cpuCardCount;
    setTimeout(resetCards, 2000);
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
}
