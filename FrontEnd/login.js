document.getElementById("alert").style.display = "none"

const loginSubmitButton = document.querySelector('.loginSubmit');
loginSubmitButton.addEventListener("click", async function(){
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const logins = {
        email: email,
        password: password,
    }
    const userLogin = await fetch('http://localhost:5678/api/users/login', {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(logins)
    })

    if (!userLogin.ok) {
        document.getElementById("alert").style.display = "block"
    }

    const userLoginResult = await userLogin.json ();

    const token = userLoginResult.token;

    if (token) {
        localStorage.setItem("token", token);
        window.location.href = "index.html";
        document.getElementById("alert").style.display = "none"
    }
})