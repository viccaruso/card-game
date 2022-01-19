import { checkAuth, logout, getLeaderboard, getPlayerProfile, getUser } from '../fetch-utils.js';
import { renderLeaderboard, renderPlayer } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');


logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    const statsContainer = document.querySelector('.stats-container');
    const leaderboardContainer = document.querySelector('.leaderboard-container');
    console.log(leaderboardContainer);
    const user = await getUser();
    const leaderboard = await getLeaderboard();
    console.log('leaderboard:', leaderboard);
    const player = await getPlayerProfile(user.user.id);
    console.log(player);
    const playerEl = renderPlayer(player);
    const leaderboardEl = renderLeaderboard(leaderboard);
    
    statsContainer.append(playerEl);
    leaderboardContainer.append(leaderboardEl);
    

});

