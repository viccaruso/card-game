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
    nameEl.textContent = `${player.player_name}`;
    nameEl.style.textAlign = 'center';

    // Create table with body, header, and single row
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const thead = document.createElement('thead');
    const row = document.createElement('tr');

    // Create header cells
    const headwins = document.createElement('th');
    const headloss = document.createElement('th');
    const headgames = document.createElement('th');
    const headpercent = document.createElement('th');
    // Set content of header cells
    headwins.textContent = 'Games Won';
    headloss.textContent = 'Games Lost';
    headgames.textContent = 'Total Games Played';
    headpercent.textContent = 'Win Percentage';
    // Append header cells to header
    thead.append(headwins, headloss, headgames, headpercent);

    // Create row cells
    const wins = document.createElement('td');
    const losses = document.createElement('td');
    const games = document.createElement('td');
    const percentage = document.createElement('td');
    // Set content of row cells
    wins.textContent = `${player.wins}`;
    losses.textContent = `${player.total_games - player.wins}`;
    games.textContent = `${player.total_games}`;
    percentage.textContent = `${(player.wins / player.total_games).toFixed(2)}`;
    // Append row cells to row
    row.append(wins, losses, games, percentage);

    // Append row to body
    tbody.append(row);
    // Append header and body to table
    table.append(thead, tbody);

    // Append player name and table to container
    playerContainer.append(nameEl, table);
    
    return playerContainer;
}

export function renderLeaderboard(arr) {
    // Create container to hold leaderboard title and table
    const leaderboardContainer = document.createElement('div');

    // Create header for leaderboard
    const leaderboardtitleEl = document.createElement('h1');
    leaderboardtitleEl.textContent = 'Leaderboard';
    leaderboardtitleEl.style.textAlign = 'center';

    // Create table with a body and header
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const thead = document.createElement('thead');

    // Create header cells
    const headname = document.createElement('th');
    const headwins = document.createElement('th');
    const headloss = document.createElement('th');
    const headgames = document.createElement('th');
    const headpercent = document.createElement('th');
    // Set content of header cells
    headname.textContent = 'Player Name';
    headwins.textContent = 'Games Won';
    headloss.textContent = 'Games Lost';
    headgames.textContent = 'Total Games Played';
    headpercent.textContent = 'Win Percentage';
    // Append header cells into the header
    thead.append(headname, headwins, headloss, headgames, headpercent);

    // For every player in the array
    for (let player of arr) {
        // Create a table row
        const row = document.createElement('tr');
        // Create cells for the row 
        const name = document.createElement('td');
        const wins = document.createElement('td');
        const losses = document.createElement('td');
        const games = document.createElement('td');
        const percentage = document.createElement('td');
        // Set content of each cell
        name.textContent = `${player.player_name}`;
        wins.textContent = `${player.wins}`;
        losses.textContent = `${player.total_games - player.wins}`;
        games.textContent = `${player.total_games}`;
        percentage.textContent = `${(player.wins / player.total_games).toFixed(2)}`;
        // Append the cells tot he row
        row.append(name, wins, losses, games, percentage);
        // Append the row to the table body
        tbody.append(row);
    }

    // Append the header and the table to the body
    table.append(thead, tbody);

    // Append title and table to container
    leaderboardContainer.append(leaderboardtitleEl, table);

    return leaderboardContainer;
}

