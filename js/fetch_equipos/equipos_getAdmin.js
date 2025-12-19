// ESTE ednpoind es para visualizar los equipos
document.addEventListener("DOMContentLoaded", async () => {
    const lista = document.getElementById("lista-equipos");
    const API_URL = "http://localhost:3000/equipos";

    let rol = localStorage.getItem("rol");
    const token = localStorage.getItem("token");

    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            rol = payload.role;
        } catch {}
    }

    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al obtener equipos");

        const equipos = await res.json();

        lista.innerHTML = equipos.map(eq => {
            const escudoURL = eq.escudo
                ? `http://localhost:3000/${eq.escudo}`
                : "assets/default.png";

            return `
            <div class="tarjeta-equipo">
                <h3>${eq.nombre}</h3>
                <p><strong>Lugar:</strong> ${eq.localidad}</p>
                <p><strong>Entrenador:</strong> ${eq.entrenadorNombreCompleto ?? "Sin asignar"}</p>

                <div class="tarjeta-acciones">
                    <button class="btn-ver-jugadores" data-id="${eq.id}">
                        Ver jugadores
                    </button>

                    <button class="btn-editar-tarjeta" data-id="${eq.id}">
                        Editar
                    </button>

                    <button class="btn-eliminar-tarjeta" data-id="${eq.id}">
                        Eliminar
                    </button>
                </div>
            </div>
        `;

        }).join("");


        // Oaqui oculto los botones que no quiero visualizar
        if (rol !== "ARBITRO") {
            document.querySelectorAll(".btn-editar-tarjeta").forEach(btn => btn.style.display = "none");
            document.querySelectorAll(".btn-eliminar-tarjeta").forEach(btn => btn.style.display = "none");
        }

    } catch (err) {
        console.error(err);
        lista.innerHTML = "<p>Error al cargar los equipos.</p>";
    }
});
