async function eliminarPartido(id) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No tienes permiso para eliminar partidos");
        return;
    }

    const confirmar = confirm("¿Seguro que deseas eliminar este partido?");
    if (!confirmar) return;

    try {
        const res = await fetch(`http://localhost:3000/partidos/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            const err = await res.json();
            alert("Error: " + err.message);
            return;
        }

        alert("Partido eliminado correctamente");
        location.reload();

    } catch (error) {
        console.error("Error eliminando partido:", error);
        alert("No se pudo eliminar el partido");
    }
}
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar-partido")) {
        const id = e.target.dataset.id;
        eliminarPartido(id);
    }
});
