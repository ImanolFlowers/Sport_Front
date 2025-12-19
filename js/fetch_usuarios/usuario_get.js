document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");


    // Obtener ID del usuario logueado desde el token
    let payload;
    try {
        payload = JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
        console.error("Token inválido");
        return;
    }

    const miId = payload.sub || payload.id;

    // Obtener tabla del DOM
    const tbody = document.getElementById("tabla-usuarios-body");
    if (!tbody) return;

    try {
        // GET todos los usuarios
        const res = await fetch("http://localhost:3000/users", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const usuarios = await res.json();

        // filtar, solo el de admin no
        const lista = usuarios.filter(u => u.id !== miId);

        // Pintar usuarios
        tbody.innerHTML = "";

        lista.forEach((u, i) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${u.username}</td>
                <td>${u.name}</td>
                <td>${u.apellido}</td>
                <td>${u.email}</td>
                <td>${u.role}</td>
                <td>
                    <button class="btn-editar" data-id="${u.id}">Editar</button>
                    <button class="btn-eliminar" data-id="${u.id}">Eliminar</button>
                </td>
            `;

            tbody.appendChild(tr);
        });

    } catch (err) {
        console.error("Error obteniendo usuarios:", err);
    }
});
