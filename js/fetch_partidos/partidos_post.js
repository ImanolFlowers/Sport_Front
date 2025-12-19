// CARGAR EQUIPO Y CREARLOS
async function cargarEquiposSelect() {
    try {
        const res = await fetch("http://localhost:3000/equipos");  
        const equipos = await res.json();

        const selectA = document.getElementById("equipoA");
        const selectB = document.getElementById("equipoB");

        // limpiar y poner la opción default
        selectA.innerHTML = '<option value="">Seleccione...</option>';
        selectB.innerHTML = '<option value="">Seleccione...</option>';

        equipos.forEach(eq => {
            const optA = document.createElement("option");
            optA.value = eq.id;
            optA.textContent = eq.nombre;

            const optB = document.createElement("option");
            optB.value = eq.id;
            optB.textContent = eq.nombre;

            selectA.appendChild(optA);
            selectB.appendChild(optB);
        });

    } catch (err) {
        console.error("Error al cargar equipos:", err);
        alert("No se pudieron cargar los equipos.");
    }
}

document.addEventListener("DOMContentLoaded", cargarEquiposSelect);



document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    const btnGuardar = document.getElementById("guardar-partido");
    const modal = document.getElementById("modal-crear-partido");

    btnGuardar.addEventListener("click", async () => {
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;
        const jornada = document.getElementById("jornada").value;
        const lugar = document.getElementById("lugar").value;
        const equipoA = document.getElementById("equipoA").value;
        const equipoB = document.getElementById("equipoB").value;

        // =validaciones basicas
        if (!fecha || !hora || !jornada || !lugar || !equipoA || !equipoB) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (equipoA === equipoB) {
            alert("Equipo A y Equipo B no pueden ser iguales.");
            return;
        }

        const body = {
            fecha,
            hora,
            jornada: Number(jornada),
            lugar,
            equipoAId: equipoA,
            equipoBId: equipoB
        };

        try {
            const res = await fetch("http://localhost:3000/partidos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                const error = await res.json();
                console.error("Error al crear partido:", error);

                alert("Error: " + (error.message || JSON.stringify(error)));
                return;
            }


            const data = await res.json();
            console.log("Partido creado:", data);

            alert("Partido creado correctamente.");

            // Cerrar modal
            modal.classList.remove("activo");

            // Recargar lista
            cargarPartidos();

        } catch (err) {
            console.error("Error inesperado:", err);
            alert("Error al conectar con el servidor.");
        }
    });
});
