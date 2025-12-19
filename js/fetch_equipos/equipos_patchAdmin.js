// ACTUALIZACION DE EQUIPO, PERO COMO ADMINISTRADOR
let equipoEditandoId = null;

// FUNCION PARA ABRIR FORMULARIO

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-editar-tarjeta")) {

    equipoEditandoId = e.target.dataset.id;

    try {
      const res = await fetch(`http://localhost:3000/equipos/${equipoEditandoId}`);
      const equipo = await res.json();

      if (!res.ok || !equipo) {
        alert("No se pudo cargar la información del equipo.");
        return;
      }

      // AQUI ES LA DUNCION PARA LLENAR FORMULARIO
      document.getElementById("edit-nombre").value = equipo.nombre || "";
      document.getElementById("edit-localidad").value = equipo.localidad || "";

      // Mostrar formulario
      document.getElementById("form-editar-tarjeta").style.display = "block";

    } catch (error) {
      console.error("Error cargando equipo por ID:", error);
      alert("Error al cargar el equipo.");
    }
  }
});

// GUARDAR CAMIOS

document.getElementById("btn-guardar-editar-tarjeta")
  .addEventListener("click", async () => {

    const nuevoNombre = document.getElementById("edit-nombre").value.trim();
    const nuevaLocalidad = document.getElementById("edit-localidad").value.trim();

    const body = {};
    if (nuevoNombre) body.nombre = nuevoNombre;
    if (nuevaLocalidad) body.localidad = nuevaLocalidad;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/equipos/${equipoEditandoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al actualizar");
        return;
      }

      alert("Equipo actualizado con éxito");

      // Ocultar formulario
      document.getElementById("form-editar-tarjeta").style.display = "none";

      // Recargar tarjetas
      location.reload();

    } catch (err) {
      console.error("Error al actualizar:", err);
      alert("Ocurrió un error al actualizar el equipo.");
    }
});

// CANCELACION

document.getElementById("btn-cancelar-editar-tarjeta")
  .addEventListener("click", () => {
    document.getElementById("form-editar-tarjeta").style.display = "none";
});
