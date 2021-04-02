$(document).ready(function () {
    $('.signup-form').hide();


    const loginFormHandler = async (event) => {
        event.preventDefault();

        // Collect values from the login form
        const email = document.querySelector('#login-email').value.trim();
        const password = document.querySelector('#login-pass').value.trim();

        if (email && password) {
            // Send a POST request to the API endpoint
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // If successful, redirect the browser to the profile page
                document.location.replace('/dashboard');
            } else {
                alert(response.statusText);
            }
        }
    };

    const signupFormHandler = async (event) => {
        event.preventDefault();

        const name = document.querySelector('#signup-name').value.trim();
        const email = document.querySelector('#signup-email').value.trim();
        const password = document.querySelector('#signup-pass').value.trim();

        if (name && email && password) {
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert(response.statusText);
            }
        } else {
            alert('You must enter a name, email, and password to continue.')
        }
    };

    document
        .querySelector('.login-form')
        .addEventListener('submit', loginFormHandler);


    document
        .querySelector('.signup-form')
        .addEventListener('submit', signupFormHandler);

    $('.create').click(function () {
        $('.login-form').hide();
        $('.signup-form').show();
    });

    $('.login').click(function () {
        $('.signup-form').hide();
        $('.login-form').show();
    });
});