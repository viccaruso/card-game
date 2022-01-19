export function renderCard(card) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card-face');

    const cardFace = document.createElement('p');

    let suit = '';
    let value = '';


    switch (card.value) {
        case 11: 
            value = 'J';
            break;
        case 12:
            value = 'Q';
            break;
        case 13:
            value = 'K';
            break;
        case 14:
            value = 'A';
            break;
        default: 
            value = card.value;
            break;
    }

    switch (card.suit) {
        case 'hearts':
            suit = '❤️';
            break;
        case 'clubs':
            suit = '♣️';
            break;
        case 'diamonds':
            suit = '♦️';
            break;
        case 'spades':
            suit = '♠️';
            break;
        default:
            suit = card.suit;
            break;
    }

    cardFace.textContent = `${value} ${suit}`;
    cardDiv.append(cardFace);
    return cardDiv;
    
}

export function renderPlayer(player) {
    const playerContainer = document.createElement('div');
    const nameEl = document.createElement('h1');
    const winsEl = document.createElement('p');
    const lossesEl = document.createElement('p');
    const totalGamesEl = document.createElement('p');

    playerContainer.classList.add('player-container');
    nameEl.classList.add('player-name');
    winsEl.classList.add('wins');
    lossesEl.classList.add('losses');
    totalGamesEl.classList.add('games-played');

    nameEl.textContent = player.player_name;
    winsEl.textContent = `Total Wins: ${player.wins}`;
    lossesEl.textContent = `Total Losses: ${player.losses}`;
    totalGamesEl.textContent = `Total Games: ${player.total_games}`;

    playerContainer.append(nameEl, winsEl, lossesEl, totalGamesEl);
    return playerContainer;
}