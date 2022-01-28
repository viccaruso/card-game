import { checkAuth, getPlayerProfile, getUser, logout, updateGame } from '../fetch-utils.js';
import { deck, shuffleDeck, splitDeck } from '../deck.js';
import { renderCard } from '../render-utils.js';
import { DECK_SIZE, CARD_COUNT } from './game-constants.js';

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

const playerStack = document.querySelector('.player-deck');
const cpuStack = document.querySelector('.cpu-deck');

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
    
    doRepeatedStuff();
});

loseModalBtn.addEventListener('click', () => {
    loseModalBg.classList.remove('modal-bg-active');
    doRepeatedStuff();
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

    hitBtn.removeAttribute('disabled');

    const hands = splitDeck(shuffleDeck(deck));
    shuffleSound.play();

    playerCardCount = 26;
    cpuCardCount = 26;
    playerCardCountEl.textContent = playerCardCount;
    cpuCardCountEl.textContent = cpuCardCount;

    playerDeck = hands.playerDeck;
    cpuDeck = hands.cpuDeck;

    playerStack.classList.add('card-back');
    cpuStack.classList.add('card-back');

});

hitBtn.addEventListener('click', async() => {
    hitBtn.setAttribute('disabled', true);

    playGame();
});

logoutButton.addEventListener('click', () => {
    logout();
});

function doDeckStuff(deckToPush, playerHand, cpuHand) {
    if (warArr.length > 0) {
            
        for (let card of warArr) {
            deckToPush.push(card);
        }
        warArr = [];
    }
    deckToPush.push(playerHand, cpuHand);
    playerCardCount = playerDeck.length;
    cpuCardCount = cpuDeck.length;

}

function playGame() {
    

    const playerHand = playerDeck.shift();
    const cpuHand = cpuDeck.shift();
    displayCards(playerHand, cpuHand);

    if (playerHand.value > cpuHand.value) {
        doDeckStuff(playerDeck, playerHand, cpuHand);
    } else if (cpuHand.value > playerHand.value) {
        doDeckStuff(cpuDeck, playerHand, cpuHand);
    } else {
        displayCards(playerHand, cpuHand);
        const playerTopOne = playerDeck.shift();
        const playerTopTwo = playerDeck.shift();
        const playerTopThree = playerDeck.shift();
        const cpuTopOne = cpuDeck.shift();
        const cpuTopTwo = cpuDeck.shift();
        const cpuTopThree = cpuDeck.shift();
        console.error('!!!!!!WAR!!!!!!');
        // a little confused here. When you loop above, it says "card of warArr". Is each of these things being pushed a single card? If so, there are some names I'd like to see changed. If not, I 'd like to see the name change in the loop
        warArr.push(playerHand, cpuHand, playerTopOne, playerTopTwo, playerTopThree, cpuTopOne, cpuTopTwo, cpuTopThree);

    }

    playerCardCountEl.textContent = playerCardCount;
    cpuCardCountEl.textContent = cpuCardCount;
    checkWin();
    setTimeout(resetCards, 1500);
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

    hitBtn.removeAttribute('disabled');
}


function checkWin() {
    if (cpuCardCount < DECK_SIZE) {
        wins++;
        totalGames++;

        const displayName = document.querySelector('.display-name');
        displayName.textContent = `You won the War!`;
        
        // render "You WIN" modal 
        winModalBg.classList.add('modal-bg-active');

        playerStack.classList.remove('card-back');
        cpuStack.classList.remove('card-back');
    }
    if (playerCardCount < DECK_SIZE) {
        totalGames++;

        // render "YOU LOST" modal?
        const displayName = document.querySelector('.display-name');
        displayName.textContent = `You were defeated!`;

        loseModalBg.classList.add('modal-bg-active');

        playerStack.classList.remove('card-back');
        cpuStack.classList.remove('card-back');
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

    playerStack.classList.add('card-back');
    cpuStack.classList.add('card-back');
}

function doRepeatedStuff() {
    displayName(player);

    hitBtn.setAttribute('disabled', true);

    hitBtn.removeAttribute('disabled');

    const hands = splitDeck(shuffleDeck(deck));
    shuffleSound.play();

    playerCardCount = CARD_COUNT;
    cpuCardCount = CARD_COUNT;
    playerCardCountEl.textContent = playerCardCount;
    cpuCardCountEl.textContent = cpuCardCount;

    playerDeck = hands.playerDeck;
    cpuDeck = hands.cpuDeck;

    playerStack.classList.add('card-back');
    cpuStack.classList.add('card-back');

}