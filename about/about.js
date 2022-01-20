import { checkAuth, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});
const aboutMe = document.querySelector('.about-me-container');
const slider = document.querySelector('.slider');
const aboutOne = document.querySelector('.about-div one');
const aboutTwo = document.querySelector('.about-div two');
const aboutThree = document.querySelector('.about-div three');
const aboutFour = document.querySelector('.about-div four');


    
    // eslint-disable-next-line no-undef
const timeLine = new TimelineMax();

timeLine.fromTo(
    aboutMe,
    1,
    { height: '0%' },
        // eslint-disable-next-line no-undef
    { height: '90%', ease: Power2.easeInOut }
)
    .fromTo(
        aboutMe,
        1.3,
        { width: '100%' },
            // eslint-disable-next-line no-undef
        { width: '80%', ease: Power2.easeInOut }
    )
    
    .fromTo(
        slider,
        2.3,
        { x:'-100%' },
        // eslint-disable-next-line no-undef
        { x: '0%', ease: Power2.easeInOut }, '-=1.5'
    );

    // .fromTo(aboutOne, 1, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, '-=0.5')
    // .fromTo(aboutTwo, 1, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, '-=0.5')
    // .fromTo(aboutThree, 1, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, '-=0.5')
    // .fromTo(aboutFour, 1, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, '-=0.5');


