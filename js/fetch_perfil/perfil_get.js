
document.addEventListener("DOMContentLoaded", async () => {
  const spanName = document.getElementById("user-name");
  const dropdownBtn = document.getElementById("dropdown-btn");
  const dropdownMenu = document.getElementById("dropdown-menu");

  const token = localStorage.getItem("token");

  if (!token) {
    spanName.textContent = "Bienvenido Invitado";
    return;
  }

  try {
    // Obtener usuario del backend
    const res = await fetch("http://localhost:3000/profile", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const user = await res.json();

    // Ajusta según tus campos reales del usuario en el token/base:
    const nombre = user.username || user.name || user.fullName || "Usuario";

    // Mostrarlo bonito
    spanName.textContent = `⚽ ${nombre}`;

  } catch (err) {
    console.error("Error obteniendo perfil:", err);
    spanName.textContent = "Usuario";
  }

  // Mostrar / ocultar menú
  dropdownBtn.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
  });

  // Cerrar sesión
  document.getElementById("btn-logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    window.location.href = "index.html";
  });
});

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.log("No estás autenticado");
        return;
    }

    // obtenermo el piolad del token
    let payload;
    try {
        payload = JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
        console.error("Token inválido", error);
        return;
    }

    const userId = payload.sub || payload.id;

    if (!userId) {
        console.error("No se encontró ID en el token");
        return;
    }


    try {
        const res = await fetch(`http://localhost:3000/users/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            console.error("Error al obtener datos del usuario");
            return;
        }

        const user = await res.json();

        // se pintan los datos en el modal
        document.getElementById("perfil-username").value = user.username || "";
        document.getElementById("perfil-name").value = user.name || "";
        document.getElementById("perfil-apellidos").value = user.apellido || "";
        document.getElementById("perfil-email").value = user.email || "";
        document.getElementById("perfil-telefono").value = user.telefono || "";

        // Contraseña (siempre vacía, solo para actualizar)
        document.getElementById("perfil-password").value = "";

        // Título superior (tu card)
        document.getElementById("perfil-nombre").textContent =
            `${user.name || ""} ${user.apellidos || ""}`.trim() || "Perfil";

        document.getElementById("perfil-rol").textContent = `Rol: ${user.role || "—"}`;

    } catch (error) {
        console.error("Error al obtener perfil:", error);
    }
});
