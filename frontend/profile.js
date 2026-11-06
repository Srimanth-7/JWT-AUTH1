const btn = document.getElementById("btn");
btn.addEventListener("click", async()=>{
    const token = localStorage.getItem("token");
    const response = await fetch(
        "http://localhost:3000/profile",
        {
            method:"GET",
            headers: {
                "Authorization":`Bearer ${token}`
            },
        }
    )
    const result = await response.text()
    console.log(result)
})

const btn1 = document.getElementById("btn1");
btn1.addEventListener('click', async()=>{
    localStorage.removeItem('token');
    console.log('Logout')

})