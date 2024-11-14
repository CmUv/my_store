
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


document.getElementById("uploadJsonForm").onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("file", e.target.file.files[0]);

  // Mostrar el modal de carga
  const loadingModal = document.getElementById("loadingModal");
  loadingModal.style.display = "flex"; // Mostrar el modal con flex para centrar el contenido

  try {
    const response = await fetch("/upload-json", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    alert("Error al cargar el archivo .JSON");
    console.error("Error:", error);
  } finally {
    // Ocultar el modal de carga después de la operación
    loadingModal.style.display = "none"; // Ocultar el modal
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
