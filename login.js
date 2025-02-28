const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');
signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});
signInBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

// Selectors

const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');
const blueTheme = document.querySelector('.blue-theme');
const greenTheme = document.querySelector('.green-theme');

// Event Listeners

standardTheme.addEventListener('click', () => {
    console.log('Standard theme clicked');
    changeTheme('standard');
});
lightTheme.addEventListener('click', () => {
    console.log('Light theme clicked');
    changeTheme('light');
});
darkerTheme.addEventListener('click', () => {
    console.log('Darker theme clicked');
    changeTheme('darker');
});
blueTheme.addEventListener('click', () => {
    console.log('Blue theme clicked');
    changeTheme('blue');
});
greenTheme.addEventListener('click', () => {
    console.log('Green theme clicked');
    changeTheme('green');
});

// Check if one theme has been set previously and apply it (or std theme if not found):
let savedTheme = localStorage.getItem('savedTheme');
savedTheme === null ?
    changeTheme('standard')
    : changeTheme(localStorage.getItem('savedTheme'));

// Function to change theme
function changeTheme(theme) {
    localStorage.setItem('savedTheme', theme);
    savedTheme = localStorage.getItem('savedTheme');

    document.body.className = theme;
    // Change blinking cursor for darker theme:
    theme === 'darker' ? 
        document.getElementById('title').classList.add('darker-title')
        : document.getElementById('title').classList.remove('darker-title');

    document.querySelector('input').className = `${theme}-input`;
    // Change buttons color according to their type (todo, check or delete):
    document.querySelectorAll('button').forEach(button => {
        Array.from(button.classList).some(item => {
            if (item === 'check-btn') {
              button.className = `check-btn ${theme}-button`;  
            } else if (item === 'delete-btn') {
                button.className = `delete-btn ${theme}-button`; 
            } else if (item === 'todo-btn') {
                button.className = `todo-btn ${theme}-button`;
            }
        });
    });
}

