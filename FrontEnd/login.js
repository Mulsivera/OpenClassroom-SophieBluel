document.getElementById("alert").style.display = "none"

const submit = document.querySelector('.loginSubmit');
submit.addEventListener("click", async function(){
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const identifants = {
        email: email,
        password: password,
    }
    const userlogin = await fetch('http://localhost:5678/api/users/login', {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(identifants)
    })

    if (!userlogin.ok) {
        document.getElementById("alert").style.display = "block"
    }

    const resultatuserlogin = await userlogin.json ();
    console.log(resultatuserlogin);

    const token = resultatuserlogin.token;

    if (token) {
        localStorage.setItem("token", token);
        window.location.href = "index.html";
        document.getElementById("alert").style.display = "none"
    }
})