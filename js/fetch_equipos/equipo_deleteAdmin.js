// ============================
// equipos_delete.js
// ============================

document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("lista-equipos");
    const API_URL = "http://localhost:3000/equipos";
    const token = localStorage.getItem("token");

    if (!lista) return;

    // Event delegation: detecta clic en botón eliminar
    lista.addEventListener("click", async (e) => {
        if (!e.target.classList.contains("btn-eliminar-tarjeta")) return;

        const id = e.target.dataset.id;

        if (!confirm("¿Seguro que deseas eliminar este equipo?")) return;

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                const error = await res.json();
                alert("Error al eliminar: " + error.message);
                return;
            }

            alert("Equipo eliminado correctamente");
            window.location.reload();

        } catch (err) {
            console.error(err);
            alert("Error al eliminar el equipo");
        }
    });
});
