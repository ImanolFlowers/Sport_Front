
// finalizar temporada
async function finalizarTemporada(id) {
    const confirmar = confirm("¿Finalizar temporada?");
    if (!confirmar) return;

    try {
        const res = await fetch(`${API_URL}/finalizar/${id}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) {
            alert("No se pudo finalizar la temporada.");
            return;
        }

        alert("Temporada finalizada.");
        cargarTemporadas();

    } catch (err) {
        console.error(err);
    }
}

// eliminar temporada
async function eliminarTemporada(id) {
    const confirmar = confirm("¿Eliminar esta temporada? Esta acción no se puede deshacer.");
    if (!confirmar) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) {
            alert("No se pudo eliminar la temporada por motivo de que tiene datos.");
            return;
        }

        alert("Temporada eliminada.");
        cargarTemporadas();

    } catch (err) {
        console.error(err);
    }
}

// eventos
document.addEventListener("DOMContentLoaded", () => {

    const btnCrear = document.getElementById("btn-crear-temporada");

    if (btnCrear) {
        btnCrear.addEventListener("click", activarTemporada);
    }

    cargarTemporadas();
});
