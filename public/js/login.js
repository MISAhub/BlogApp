fetch('/components/nav.html')
    .then(response => response.text())
    .then(data => {
        const navContainer = document.createElement('div');
        navContainer.innerHTML = data;
        document.body.insertBefore(navContainer, document.body.firstChild);
    })
    .catch(error => console.error('Error loading navigation:', error));



// form validation logic

const scriptURL = "https://script.google.com/macros/s/AKfycbwlAYJ_sySDJ68BsxTbJXeG2xp5VCH0dgnVkkH3hU5uHC7Z56rq9JprtdHjUgI5gmm-/exec";

const form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(`${scriptURL}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/display'; // Redirect to display page
                return;

            } else {
                alert(data.message);
            }
        })
});
