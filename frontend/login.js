const btn = document.getElementById('btn');

btn.addEventListener('click', async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = {
        username,
        password
    };

    const response = await fetch(
        "http://localhost:3000/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
    );

    const data = await response.json();
    if(data.token){
        localStorage.setItem("token", data.token)
        alert('token stored successfully in local storage')
    }
});