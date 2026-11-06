const btn = document.getElementById("btn");
const userDiv = document.getElementById("users");

btn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:3000/admin",
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        }
    );

    const users = await response.json();

    console.log(users);

    userDiv.innerHTML = "";

    users.forEach((user) => {
        userDiv.innerHTML += `
        <div id="${user._id}">
            <h3>${user.username}</h3>
            <button onclick="deleteUser('${user._id}')">Delete</button>
            <hr>
        </div>

        `;
    });
});

async function deleteUser(id) {
    // console.log(id);
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:3000/admin/${id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization":`Bearer ${token}`
            }
        }
    )
    const result = await response.json()
    alert(result.message)
    document.getElementById(id).remove()
}