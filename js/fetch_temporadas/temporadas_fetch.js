const API_URL = "http://localhost:3000/temporadas";
const token = localStorage.getItem("token");

// carga las temporadas que hay
async function cargarTemporadas() {
    const contenedorActiva = document.getElementById("temporada-activa");
    const contenedorTodas = document.getElementById("todas-las-temporadas");

    contenedorActiva.innerHTML = "";
    contenedorTodas.innerHTML = "";

    try {
        const respuesta = await fetch(API_URL, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const temporadas = await respuesta.json();

        temporadas.forEach(temp => {
            const tarjeta = document.createElement("div");

            // get de una temporada activa
            if (temp.estado === "ACTIVA") {
                tarjeta.className = "tarjeta-temporada-activa";
                tarjeta.innerHTML = `
                    <span class="badge-activa">ACTIVA</span>
                    <p><strong>ID:</strong> ${temp.id}</p>
                    <p><strong>Estado:</strong> ${temp.estado}</p>
                    <p><strong>Iniciada:</strong> ${new Date(temp.createdAt).toLocaleDateString()}</p>
                    <p><strong>Actualizada:</strong> ${new Date(temp.updatedAt).toLocaleDateString()}</p>

                    <button class="btn-finalizar" data-id="${temp.id}">
                        <i class="fas fa-flag-checkered"></i> Finalizar temporada
                    </button>
                `;

                contenedorActiva.appendChild(tarjeta);

                // boton que finaliza
                tarjeta.querySelector(".btn-finalizar").addEventListener("click", () => {
                    finalizarTemporada(temp.id);
                });

            } else {

                // muestra todas las temporadas
                tarjeta.className = "tarjeta-temporada";
                tarjeta.innerHTML = `
                    <p><strong>ID:</strong> ${temp.id}</p>
                    <p><strong>Estado:</strong> ${temp.estado}</p>
                    <p><strong>Iniciada:</strong> ${new Date(temp.createdAt).toLocaleDateString()}</p>
                    <p><strong>Actualizada:</strong> ${new Date(temp.updatedAt).toLocaleDateString()}</p>

                    <button class="btn-eliminar" data-id="${temp.id}">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                `;

                contenedorTodas.appendChild(tarjeta);

                // evento eliminar
                tarjeta.querySelector(".btn-eliminar").addEventListener("click", () => {
                    eliminarTemporada(temp.id);
                });
            }
        });

    } catch (err) {
        console.error("Error al cargar temporadas:", err);
    }
}

// activar temporada
async function activarTemporada() {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            alert("Ya existe una temporada activa.");
            return;
        }

        alert("Temporada activada.");
        cargarTemporadas();

    } catch (err) {
        console.error(err);
        alert("No se pudo activar temporada.");
    }
}
