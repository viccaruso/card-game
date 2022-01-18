import {
    createPlayerProfile,
    redirectIfLoggedIn,
    signInUser,
    signupUser,
} from './fetch-utils.js';

const signInForm = document.getElementById('sign-in');
const signUpForm = document.getElementById('sign-up');

// if user currently logged in, redirect
redirectIfLoggedIn();

signUpForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    const data = new FormData(signUpForm);
    const userName = data.get('username');
    const user = await signupUser(data.get('email'), data.get('password'));
    

    const player = {
        player_name: userName,
        wins: 0,
        losses: 0,
        total_games: 0
    };

    await createPlayerProfile(player);

    if (user) {
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});

signInForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    const data = new FormData(signInForm);
    const user = await signInUser(data.get('email'), data.get('password'));

    if (user) {
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});
