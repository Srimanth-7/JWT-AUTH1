const btn = document.getElementById('btn')
btn.addEventListener("click", async()=>{
    const token = localStorage.getItem("token")
    const response = await fetch(
        "http://localhost:3000/dashboard",
        {
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`
            },
        }
    )
    const result = await response.text()
    console.log(result)
})