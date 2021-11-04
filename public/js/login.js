console.log('hitting js file');
const loginForm = async (e) => {
    e.preventDefault();

    let username = document.querySelector('#username-login').value.trim();
    let password = document.querySelector('#password-login').value.trim();
    console.log('this is the username', username);
    console.log('this is the password', password);
    if (username && password) {
        let res = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to log in!');
        }
    }
};

document
    .querySelector('#login-button')
    .addEventListener('click', loginForm);
