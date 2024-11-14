const apiUrl = '/users';

// Crear Usuario
document.getElementById("createUserForm").onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        const newUser = await response.json();
        alert(`Usuario ${newUser.name} creado exitosamente`);
        fetchUsers();
    } catch (error) {
        alert("Error al crear usuario");
    }
};

// Actualizar Usuario
document.getElementById("updateUserForm").onsubmit = async (e) => {
    e.preventDefault();
    const userId = document.getElementById("userId").value;
    const name = document.getElementById("updateName").value;
    const email = document.getElementById("updateEmail").value;
    const password = document.getElementById("updatePassword").value;
    try {
        const response = await fetch(`${apiUrl}/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        if (response.ok) {
            const updatedUser = await response.json();
            alert(`Usuario ${updatedUser.name} actualizado exitosamente`);
            fetchUsers();
        } else {
            alert("Usuario no encontrado");
        }
    } catch (error) {
        alert("Error al actualizar usuario");
    }
};

// Obtener y mostrar lista de usuarios
async function fetchUsers() {
    try {
        const response = await fetch(apiUrl);
        const users = await response.json();
        const userList = document.getElementById("userList");
        userList.innerHTML = "";
        users.forEach((user) => {
            const userDiv = document.createElement("div");
            userDiv.className = "user-card";
            userDiv.innerHTML = `
                <p><strong>ID:</strong> ${user.id}</p>
                <p><strong>Nombre:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <button onclick="deleteUser(${user.id})">Eliminar</button>
            `;
            userList.appendChild(userDiv);
        });
    } catch (error) {
        alert("Error al cargar usuarios");
        console.log("Error de cargar usuarios");
    }
}

// Eliminar Usuario
async function deleteUser(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            alert("Usuario eliminado exitosamente");
            fetchUsers();
        } else {
            alert("Usuario no encontrado");
        }
    } catch (error) {
        alert("Error al eliminar usuario");
    }
}
