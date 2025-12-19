// endopoind para actualizar partidos
async function cargarEquiposEnEditar() {
    try {
        const res = await fetch("http://localhost:3000/equipos");
        const equipos = await res.json();

        const selectA = document.getElementById("edit-equipoA");
        const selectB = document.getElementById("edit-equipoB");

        selectA.innerHTML = '';
        selectB.innerHTML = '';

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
    }
}


// variables globales
let partidoEditandoId = null;


// abrir modal y cargar los datos
document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("btn-refresh")) return;

    partidoEditandoId = e.target.dataset.id;
    console.log("ID del partido a editar:", partidoEditandoId);

    // Cargar equipos primero
    await cargarEquiposEnEditar();

    // Abrir modal
    const modal = document.getElementById("modal-editar-partido");
    modal.classList.add("activo");

    try {
    const res = await fetch(`http://localhost:3000/partidos/${partidoEditandoId}`);
    const partido = await res.json();

    if (!res.ok || !partido) {
        alert("No se pudo cargar la información del partido.");
        return;
    }

    window.partidoEstadoActual = partido.estado;

    console.log("Datos del partido:", partido);

    // fecha y hora
    const fecha = partido.fechaHora.split("T")[0];
    const hora = partido.fechaHora.split("T")[1].slice(0, 5);

    document.getElementById("edit-fecha").value = fecha;
    document.getElementById("edit-hora").value = hora;
    document.getElementById("edit-jornada").value = partido.jornada;
    document.getElementById("edit-lugar").value = partido.lugar;

    document.getElementById("edit-equipoA").value = partido.equipoAId;
    document.getElementById("edit-equipoB").value = partido.equipoBId;

    document.getElementById("edit-estado").value = partido.estado;

    // Ocultar y nostar cambios segun el estado del partido
    const campos = document.querySelectorAll(".campo-editable");

    if (["EN_JUEGO", "FINALIZADO"].includes(partido.estado)) {
        campos.forEach(c => c.style.display = "none");
    } else {
        campos.forEach(c => c.style.display = "block");
    }

} catch (error) {
    console.error("Error cargando partido por ID:", error);
    alert("Error al cargar el partido.");
}

});


// CERRARM MODARL
document.getElementById("cerrar-editar").addEventListener("click", () => {
    document.getElementById("modal-editar-partido").classList.remove("activo");
});


// GUARDAR PATCH
document.getElementById("guardar-edicion").addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    let body = {};

    // Solo enviar estado si el partido está EN_JUEGO
    if (window.partidoEstadoActual === "EN_JUEGO") {
        body = {
            estado: document.getElementById("edit-estado").value
        };
    } 
    
    // En FUTURO o FINALIZADO, enviar los demás campos
    else {
        body = {
            fecha: document.getElementById("edit-fecha").value,
            hora: document.getElementById("edit-hora").value,
            jornada: Number(document.getElementById("edit-jornada").value),
            lugar: document.getElementById("edit-lugar").value,
            equipoAId: document.getElementById("edit-equipoA").value,
            equipoBId: document.getElementById("edit-equipoB").value,
            estado: document.getElementById("edit-estado").value
        };
    }

    try {
        const res = await fetch(`http://localhost:3000/partidos/${partidoEditandoId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "No se pudo actualizar el partido.");
            return;
        }

        alert("Partido actualizado con éxito.");
        document.getElementById("modal-editar-partido").classList.remove("activo");
        cargarPartidos();

    } catch (err) {
        console.error("Error al actualizar partido:", err);
        alert("Error al actualizar el partido.");
    }
});

