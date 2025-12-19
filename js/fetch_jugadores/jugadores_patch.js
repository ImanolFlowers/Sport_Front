// ABRE EL MODAL DE ACTUALIZAR AL HACER CLIC

document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("btn-editar-jugador")) return;

  const jugadorId = e.target.dataset.id;
  const token = localStorage.getItem("token");

  try {
    // Obtener datos del jugador por ID
    const res = await fetch(`http://localhost:3000/equipos/jugadores/${jugadorId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const jugador = await res.json();
    console.log("Jugador a editar:", jugador);

    // Abrir modal
    const modal = document.getElementById("modal-editar-jugador");
    modal.classList.add("activo");

    // Rellenar campos
    document.getElementById("edit-nombre").value = jugador.nombre;
    document.getElementById("edit-apellidos").value = jugador.apellidos;
    document.getElementById("edit-numero").value = jugador.numero;
    document.getElementById("edit-posicion").value = jugador.posicion;
    document.getElementById("edit-detalle").value = jugador.posicionDetalle || "";

    // Guardar temporalmente la ID del jugador editado
    localStorage.setItem("jugadorEnEdicion", jugadorId);

  } catch (error) {
    console.error("Error al traer jugador:", error);
  }
});


// =====================================================
// GUARDAR CAMBIOS (PATCH)
// =====================================================
document.getElementById("guardar-cambios-jugador").addEventListener("click", async () => {
  const jugadorId = localStorage.getItem("jugadorEnEdicion");
  const token = localStorage.getItem("token");

  // Valores del formulario
  const nombre = document.getElementById("edit-nombre").value.trim();
  const apellidos = document.getElementById("edit-apellidos").value.trim();
  const numero = document.getElementById("edit-numero").value.trim();
  const posicion = document.getElementById("edit-posicion").value.trim();
  const detalle = document.getElementById("edit-detalle").value.trim();

  if (!nombre || !apellidos || !numero || !posicion) {
    alert("Completa todos los campos obligatorios.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/equipos/jugadores/${jugadorId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        nombre,
        apellidos,
        numero: Number(numero),
        posicion,
        posicionDetalle: detalle
      })
    });

    const data = await res.json();
    console.log("Actualizado:", data);

    if (!res.ok) {
      alert("Error al actualizar: " + (data.message || "Desconocido"));
      return;
    }

    alert("Jugador actualizado");

    // cerrar modal
    document.getElementById("modal-editar-jugador").classList.remove("activo");

    // limpiar variable temporal
    localStorage.removeItem("jugadorEnEdicion");

    // recargar jugadores (si ya tienes esta función)
    if (typeof cargarJugadoresMiEquipo === "function") {
      cargarJugadoresMiEquipo();
    }

  } catch (error) {
    console.error("Error al actualizar:", error);
    alert("Error al actualizar el jugador.");
  }
});


// =====================================================
// CERRAR MODAL
// =====================================================
document.getElementById("cerrar-modal-editar").addEventListener("click", () => {
  document.getElementById("modal-editar-jugador").classList.remove("activo");
});

// Cerrar clic afuera
document.getElementById("modal-editar-jugador").addEventListener("click", (e) => {
  if (e.target.id === "modal-editar-jugador") {
    e.target.classList.remove("activo");
  }
});
