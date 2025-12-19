document.addEventListener("DOMContentLoaded", () => {
    const rolStorage = localStorage.getItem("rol"); // AQUI LO APLICA PARA VISITANTE, REUTILIZAR CODIGO POR SI ACASO
    const token = localStorage.getItem("token");

    let rol = rolStorage;

    // si existe token, leer rol del payload
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            rol = payload.role;
        } catch {}
    }

    const btnCrearPartido = document.getElementById("btn-crear-partido");

    if (rol !== "ARBITRO") {
        btnCrearPartido.style.display = "none";
    }
});
