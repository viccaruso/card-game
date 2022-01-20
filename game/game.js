import { checkAuth, getPlayerProfile, getUser, logout, updateGame } from '../fetch-utils.js';
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

const modalBtn = document.querySelector('.modal-btn');
const rulesBtn = document.querySelector('.rules-btn');
const modalBg = document.querySelector('.modal-bg');

const winModalBtn = document.querySelector('.win-modal-btn');
const winModalBg = document.querySelector('.win-modal-bg');
const loseModalBtn = document.querySelector('.lose-modal-btn');
const loseModalBg = document.querySelector('.lose-modal-bg');


let user;
let player;

let playerCardCount = 26;
let cpuCardCount = 26;
let playerDeck = [];
let cpuDeck = [];
let warArr = [];
let wins = 0;
let totalGames = 0;

modalBtn.addEventListener('click', () => {
    modalBg.classList.remove('modal-bg-active');
});

rulesBtn.addEventListener('click', () => {
    modalBg.classList.add('modal-bg-active');
});

winModalBtn.addEventListener('click', () => {
    winModalBg.classList.remove('modal-bg-active');
    
    displayName(player);

    hitBtn.setAttribute('disabled', true);

    hitBtn.removeAttribute('disabled');

    const hands = splitDeck(shuffleDeck(deck));
    shuffleSound.play();

    playerCardCount = 26;
    cpuCardCount = 26;
    playerCardCountEl.textContent = playerCardCount;
    cpuCardCountEl.textContent = cpuCardCount;

    playerDeck = hands.playerDeck;
    cpuDeck = hands.cpuDeck;
});

loseModalBtn.addEventListener('click', () => {
    loseModalBg.classList.remove('modal-bg-active');
    displayName(player);

    hitBtn.setAttribute('disabled', true);

    hitBtn.removeAttribute('disabled');

    const hands = splitDeck(shuffleDeck(deck));
    shuffleSound.play();

    playerCardCount = 26;
    cpuCardCount = 26;
    playerCardCountEl.textContent = playerCardCount;
    cpuCardCountEl.textContent = cpuCardCount;

    playerDeck = hands.playerDeck;
    cpuDeck = hands.cpuDeck;
});

window.addEventListener('load', async() => {
    user = await getUser();
    player = await getPlayerProfile(user.user.id);
    playerCardCount = player.player_deck.length;
    cpuCardCount = player.cpu_deck.length;
    wins = player.wins;
    totalGames = player.total_games;
    playerDeck = player.player_deck;
    cpuDeck = player.cpu_deck;

    displayName(player);
    checkWin();

});

newGameButton.addEventListener('click', async() => {
    displayName(player);

    hitBtn.setAttribute('disabled', true);

    hitBtn.removeAttribute('disabled');

    const hands = splitDeck(shuffleDeck(deck));
    shuffleSound.play();

    playerCardCount = 26;
    cpuCardCount = 26;
    playerCardCountEl.textContent = playerCardCount;
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
    hitBtn.removeAttribute('disabled');

    const playerHand = playerDeck.shift();
    const cpuHand = cpuDeck.shift();
    displayCards(playerHand, cpuHand);

    if (playerHand.value > cpuHand.value) {

        if (warArr.length > 0) {
            
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

    }

    playerCardCountEl.textContent = playerCardCount;
    cpuCardCountEl.textContent = cpuCardCount;
    checkWin();
    setTimeout(resetCards, 500);
    saveGame();
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

    // hitBtn.removeAttribute('disabled');
}

function checkWin() {
    if (cpuCardCount < 23) {
        wins++;
        totalGames++;

        // render "You WIN" modal 
        const displayName = document.querySelector('.display-name');
        displayName.textContent = `You won the War!`;

        winModalBg.classList.add('modal-bg-active');

        hitBtn.setAttribute('disabled', true);
    }
    if (playerCardCount < 23) {
        totalGames++;

        // render "YOU LOST" modal?
        const displayName = document.querySelector('.display-name');
        displayName.textContent = `You were defeated!`;

        loseModalBg.classList.add('modal-bg-active');

        hitBtn.setAttribute('disabled', true);
    }
}

async function saveGame() {

    const game = {
        wins,
        totalGames,
        playerDeck,
        cpuDeck,
    };

    await updateGame(player.id, game);
}

function displayName(player) {
    const displayName = document.querySelector('.display-name');

    playerCardCountEl.textContent = playerCardCount;
    cpuCardCountEl.textContent = cpuCardCount;
    displayName.textContent = `${player.player_name} is doing battle!`;
}