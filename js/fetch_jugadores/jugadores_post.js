document.addEventListener("DOMContentLoaded", () => {
  const btnGuardar = document.getElementById("guardar-jugador");
  const modal = document.getElementById("modal-crear-jugador");

  btnGuardar.addEventListener("click", async () => {

    const nombre = document.getElementById("jugador-nombre").value.trim();
    const apellidos = document.getElementById("jugador-apellidos").value.trim();
    const numero = document.getElementById("jugador-numero").value.trim();
    const posicion = document.getElementById("jugador-posicion").value.trim();
    const posicionDetalle = document.getElementById("jugador-posicion-detalle").value.trim();
    const token = localStorage.getItem("token");

    // Validaciones
    if (!nombre || !apellidos || !numero || !posicion) {
      alert("Por favor llena todos los campos obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/equipos/jugadores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre,
          apellidos,
          numero: Number(numero),
          posicion,
          posicionDetalle
        })
      });

      const data = await res.json();
      console.log("Jugador creado:", data);

      if (!res.ok) {
        alert("Error: " + (data.message || "No se pudo crear el jugador"));
        return;
      }

      alert("Jugador creado correctamente ✔");

      // Cerrar modal
      modal.classList.remove("activo");

      // Limpiar campos
      document.getElementById("jugador-nombre").value = "";
      document.getElementById("jugador-apellidos").value = "";
      document.getElementById("jugador-numero").value = "";
      document.getElementById("jugador-posicion").value = "";
      document.getElementById("jugador-posicion-detalle").value = "";

      // Recargar lista de jugadores
      if (typeof cargarJugadoresMiEquipo === "function") {
        cargarJugadoresMiEquipo(); 
      }

    } catch (error) {
      console.error("Error al crear jugador:", error);
      alert("Hubo un error en la petición.");
    }
  });
});
