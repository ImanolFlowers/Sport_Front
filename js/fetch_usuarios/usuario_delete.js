document.addEventListener("DOMContentLoaded", () => {

  document.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("btn-eliminar")) return;

    const id = e.target.dataset.id;
    const token = localStorage.getItem("token");

    // Confirmación antes de borrar
    const confirmar = confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        alert("No se pudo eliminar el usuario");
        return;
      }

      alert("Usuario eliminado correctamente");

      // remueve la fila sin cargar
      e.target.closest("tr").remove();

    } catch (err) {
      console.error("Error eliminando usuario:", err);
      alert("Error al eliminar usuario");
    }

  });

});
