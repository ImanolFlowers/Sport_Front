//solo oculta el boton de termporada

document.addEventListener("DOMContentLoaded", () => {
    const rolStorage = localStorage.getItem("rol"); // aplica para el visitante
    const token = localStorage.getItem("token");

    let rol = rolStorage;

    // si existe token, leer rol del payload
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            rol = payload.role;
        } catch {}
    }

    const btnTemporadas = document.getElementById("temporadas");
    const btnUsuarios = document.getElementById("btn-usuarios");

    if (rol !== "ARBITRO") {
        btnTemporadas.style.display = "none";
        btnUsuarios.style.display = "none";
    }
});
