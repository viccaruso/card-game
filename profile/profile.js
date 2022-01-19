import { checkAuth, logout, getLeaderboard, getPlayerProfile, getUser } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    
    
    const user = await getUser();
    getLeaderboard();
    const player = await getPlayerProfile(user.user.id);
    console.log(player);
    console.log(user);
    //console.log(id);
});