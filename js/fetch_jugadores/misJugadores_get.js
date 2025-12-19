// OBTENER JUGADORES DEL EQUIPO DEL ENTRENADOR
async function cargarJugadoresMiEquipo() {
  const contenedor = document.getElementById("lista-jugadores");
  contenedor.innerHTML = "<p>Cargando jugadores...</p>";

  // USAR LA ID CORRECTA
  const equipoId = localStorage.getItem("miEquipoId");

  if (!equipoId) {
    contenedor.innerHTML = "<p style='color:red'>No se encontró el ID del equipo.</p>";
    console.error("No existe miEquipoId en localStorage");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/equipos/jugadores/equipo/${equipoId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    const jugadores = await res.json();
    console.log("Jugadores del equipo:", jugadores);

    pintarJugadores(jugadores);

  } catch (err) {
    console.error("Error al cargar jugadores:", err);
    contenedor.innerHTML = "<p>Error al cargar jugadores.</p>";
  }
}


// PINTA LAS TARJETAS DE JUGADORES DEL PROPIO ENTRENADOE
function pintarJugadores(jugadores) {
  const contenedor = document.getElementById("lista-jugadores");
  contenedor.innerHTML = "";

  if (!jugadores || jugadores.length === 0) {
    contenedor.innerHTML = "<p>No hay jugadores registrados.</p>";
    return;
  }

  jugadores.forEach(j => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-jugador";

    tarjeta.innerHTML = `
      <div class="jugador-header">
        <span class="jugador-numero">${j.numero}</span>
        <span class="jugador-posicion">${j.posicion}</span>
      </div>

      <div class="jugador-nombre">
        ${j.nombre} ${j.apellidos}
      </div>

      <div class="jugador-detalle">
        Detalle: ${j.detallePosicion || "Sin detalle"}
      </div>

      <button class="btn-editar-jugador" data-id="${j.id}">
        Editar
      </button>

      <button class="btn-eliminar-jugador" data-id="${j.id}">
        Eliminar
      </button>
    `;

    contenedor.appendChild(tarjeta);
  });
}
// LA CARGA
document.addEventListener("DOMContentLoaded", cargarJugadoresMiEquipo);
