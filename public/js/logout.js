const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST'
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

$('#logout').on('click', logout);