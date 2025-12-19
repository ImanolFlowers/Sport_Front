// VISUALIZAR PARTYIDOS

function obtenerRol() {
    const token = localStorage.getItem("token");
    const rolStorage = localStorage.getItem("rol"); // visitante

    // Si hay token → rol del JWT
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.role; 
        } catch (err) {
            console.warn("Error leyendo token, usando storage");
        }
    }

    // Si no hay token vistante o otro
    return rolStorage;
}


async function cargarPartidos() {
    try {
        const res = await fetch("http://localhost:3000/partidos"); 
        const partidos = await res.json();
        // Ordenar: EN_JUEGO → FUTURO → FINALIZADO
        partidos.sort((a, b) => {
            const prioridad = {
                "EN_JUEGO": 1,
                "FUTURO": 2,
                "FINALIZADO": 3
            };
            return prioridad[a.estado] - prioridad[b.estado];
        });


        // OBTENER ROL CORRECTAMENTE
        let rol = obtenerRol();

        const contenedor = document.getElementById("lista-partidos");
        contenedor.innerHTML = "";

        if (!partidos.length) {
            contenedor.innerHTML = `<p>No hay partidos registrados aún.</p>`;
            return;
        }

        partidos.forEach(p => {
            const div = document.createElement("div");
            div.classList.add("tarjeta-partido");
            if (p.estado === "EN_JUEGO") {
                div.classList.add("en-juego");
            } else if (p.estado === "FINALIZADO") {
                div.classList.add("finalizado");
            } else if (p.estado === "CANCELADO") {
                div.classList.add("cancelado");
            } else {
                div.classList.add("futuro");
            }


            const fechaISO = p.fechaHora;
            const fecha = new Date(fechaISO).toISOString().split("T")[0];
            const hora  = new Date(fechaISO).toISOString().split("T")[1].slice(0, 5);

            div.innerHTML = `
                <button class="btn-refresh" data-id="${p.id}">
                    Editar partido
                </button>
                <button class="btn-goles" data-id="${p.id}">
                    Editar Marcador
                </button>
                <button class="btn-eliminar-partido" data-id="${p.id}">
                    Eliminar partido
                </button>



                <h2><span>${p.estado}</span></h2>
                
                <h3>Jornada ${p.jornada}</h3>

                <div class="equipos">
                    <span>${p.equipoAnombre}</span>
                    <span>vs</span>
                    <span>${p.equipoBnombre}</span>
                </div>

                <div class="marcador">
                    ${p.golesEquipoA} - ${p.golesEquipoB}
                </div>

                <div class="detalles">
                    <span>${fecha}</span>
                    <span>${hora} hrs</span>
                    <span>${p.lugar}</span>
                </div>
            `;
            contenedor.appendChild(div);
        });

        // OCULTAR BOTONES SEGUN ROL
        if (rol !== "ARBITRO") {
            document.querySelectorAll(".btn-refresh").forEach(btn => btn.style.display = "none");
            document.querySelectorAll(".btn-goles").forEach(btn => btn.style.display = "none");
            document.querySelectorAll(".btn-eliminar-partido").forEach(btn => btn.style.display = "none");
        }

    } catch (err) {
        console.error("Error al cargar partidos:", err);
    }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", cargarPartidos);
