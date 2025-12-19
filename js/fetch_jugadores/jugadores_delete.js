// =====================================================
// ELIMINAR JUGADOR
// =====================================================

document.addEventListener("click", async (e) => {
  // Detectar click en el botón de eliminar
  if (!e.target.classList.contains("btn-eliminar-jugador")) return;

  const jugadorId = e.target.dataset.id;
  const token = localStorage.getItem("token");

  // Confirmación
  const confirmar = confirm("¿Seguro que deseas eliminar a este jugador?");
  if (!confirmar) return; // ← CORRECTO

  try {
    const res = await fetch(`http://localhost:3000/equipos/jugadores/${jugadorId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log("Eliminar jugador:", data);

    if (!res.ok) {
      alert("Error al eliminar: " + (data.message || "Error desconocido"));
      return;
    }

    alert("Jugador eliminado correctamente ✔");

    // Recargar lista
    if (typeof cargarJugadoresMiEquipo === "function") {
      cargarJugadoresMiEquipo();
    }

  } catch (error) {
    console.error("Error en DELETE:", error);
    alert("Hubo un error al eliminar el jugador.");
  }
});
