const signUpForm = async (event) => {
    event.preventDefault();

    let username = document.querySelector('#username-input-signup').value.trim();
    let password = document.querySelector('#password-input-signup').value.trim();

    if (username && password) {
        let response = await fetch('/api/user/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

document
    .querySelector('#signup-btn')
    .addEventListener('click', signUpForm);