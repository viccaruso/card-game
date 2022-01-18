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