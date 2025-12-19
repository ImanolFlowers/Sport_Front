// ABRIR MODAL DE GOLES

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-goles")) {

        // abrir modal
        document.getElementById("modal-goles").classList.add("activo");
    }
});

document.getElementById("cerrar-goles").addEventListener("click", () => {
    document.getElementById("modal-goles").classList.remove("activo");
});


//VARIABLES GLOBALES
let partidoGolesId = null;

// ABRIRR MODARL DE LOS GOLES Y CARGAR DATOS

document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-goles")) {

        partidoGolesId = e.target.dataset.id;

        // aqui trae el partido por ID para llenar los inputs
        try {
            const res = await fetch(`http://localhost:3000/partidos/${partidoGolesId}`);
            const partido = await res.json();

            if (!res.ok) {
                alert("No se pudo cargar el partido.");
                return;
            }

            // llenar inputs con los goles actuales
            document.getElementById("golesA").value = partido.golesEquipoA ?? 0;
            document.getElementById("golesB").value = partido.golesEquipoB ?? 0;

        } catch (err) {
            console.error("Error cargando partido:", err);
        }

        // Abrir modal
        document.getElementById("modal-goles").classList.add("activo");
    }
});


// guardar solo los goles

document.getElementById("guardar-goles").addEventListener("click", async () => {

    const token = localStorage.getItem("token");

    const gA = Number(document.getElementById("golesA").value);
    const gB = Number(document.getElementById("golesB").value);

    const body = {
        golesEquipoA: gA,
        golesEquipoB: gB
    };

    try {
        const res = await fetch(`http://localhost:3000/partidos/${partidoGolesId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "No se pudo actualizar el marcador.");
            return;
        }

        alert("Marcador actualizado correctamente.");

        // Cerrar modal
        document.getElementById("modal-goles").classList.remove("activo");

        // Recargar lista de partidos
        cargarPartidos();

    } catch (err) {
        console.error("Error al actualizar goles:", err);
        alert("Error al actualizar los goles.");
    }
});


// cerar modal

document.getElementById("cerrar-goles").addEventListener("click", () => {
    document.getElementById("modal-goles").classList.remove("activo");
});
