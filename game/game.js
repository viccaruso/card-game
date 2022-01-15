import { checkAuth, getLeaderboard, getPlayerProfile, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

window.addEventListener('load', async() => {

});



logoutButton.addEventListener('click', () => {
    logout();
});
