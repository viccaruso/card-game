import { checkAuth, logout, getLeaderboard, getPlayerProfile, getUser } from '../fetch-utils.js';
import { renderPlayer } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');


logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    const statsContainer = document.querySelector('.stats-container');
    
    const user = await getUser();
    
    const player = await getPlayerProfile(user.user.id);
    console.log(player);
    const playerEl = renderPlayer(player);
    statsContainer.append(playerEl);
});