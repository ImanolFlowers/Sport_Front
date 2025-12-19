document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);
    const equipoId = params.get("equipo");

    if (!equipoId) {
        document.getElementById("lista-jugadores").innerHTML =
            "<p>No se recibió el ID del equipo.</p>";
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/equipos/jugadores/equipo/${equipoId}`);

        if (!res.ok) {
            throw new Error("No se pudieron obtener los jugadores");
        }

        const jugadores = await res.json();
        const contenedor = document.getElementById("lista-jugadores");

        if (!jugadores || jugadores.length === 0) {
            contenedor.innerHTML = "<p>Este equipo no tiene jugadores registrados.</p>";
            return;
        }

        contenedor.innerHTML = jugadores.map(j => `
            <div class="tarjeta-jugador">

                <div class="jugador-header">
                    <span class="jugador-numero">${j.numero ?? "-"}</span>
                    <span class="jugador-posicion">${j.posicion ?? "N/A"}</span>
                </div>

                <div class="jugador-nombre">
                    ${j.nombre ?? ""} ${j.apellidos ?? ""}
                </div>

                <div class="jugador-detalle">
                    Detalle: ${j.detallePosicion || "Sin detalle"}
                </div>

            </div>
        `).join("");

    } catch (err) {
        console.error("ERROR en fetch jugadores:", err);
        document.getElementById("lista-jugadores").innerHTML =
            "<p>Error cargando los jugadores.</p>";
    }
});
