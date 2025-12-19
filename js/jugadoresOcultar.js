document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const rolStorage = localStorage.getItem("rol");

    let rol = rolStorage;

    // Si hay token, leer rol del JWT
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            rol = payload.role;
        } catch {}
    }

    // -----------------------------
    // Botones a ocultar SI NO ES ENTRENADOR
    // -----------------------------
    const botonesParaOcultar = ["btn-mis-jugadores", "jugadores"];

    if (rol !== "ENTRENADOR") {
        botonesParaOcultar.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.style.display = "none";
        });
    }
});
