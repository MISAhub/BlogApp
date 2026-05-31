
// Nav bar component

fetch('/components/nav.html')
    .then(response => response.text())
    .then(data => {
        const navContainer = document.createElement('div');
        navContainer.innerHTML = data;
        document.body.insertBefore(navContainer, document.body.firstChild);
    })
    .catch(error => console.error('Error loading navigation:', error));


// form sumbission logic


const signupForm = document.getElementById("form");
const submit = document.querySelector('button[type="submit"]');
const scriptURL =
    "https://script.google.com/macros/s/AKfycbwlAYJ_sySDJ68BsxTbJXeG2xp5VCH0dgnVkkH3hU5uHC7Z56rq9JprtdHjUgI5gmm-/exec";

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value.trim(),
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value.trim(),
        birthdate: document.getElementById("birthdate").value.trim(),
    };

    try {
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Account created successfully!");
            signupForm.reset();
        } else {
            const errorData = await response.json().catch(() => null);
            alert(errorData?.message || "Signup failed. Please try again.");
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Something went wrong");
    }
});


function addTask(data) {
    const formData = {
        name: data.name,
        username: data.username,
        password: data.password,
        birthdate: data.birthdate
    };

    if (!formData.name || !formData.username || !formData.password || !formData.birthdate) return;

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                alert('Account created successfully!');
                signupForm.reset();
            } else {
                alert('Failed');
            }
        });
}