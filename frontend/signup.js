const btn = document.getElementById("btn")
btn.addEventListener('click', async()=>{
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value

    const response = await fetch(
        "http://localhost:3000/signup",
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                username,
                password,
                role
            })
        }
    )
    const result = await response.text()
    alert(result)

})

