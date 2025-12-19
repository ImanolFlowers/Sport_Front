
 // DE ESTE ALADO TENTO EL ENDPOINT PARA OBTENER MI EQUIPO

const API_URL_MI_EQUIPO = "http://localhost:3000/equipos/mis-equipos";

// TAMBIEN AGREGUE LA FUNCIÓN PARA PINTAR MI EQUIPO

function pintarMiEquipo(equipo) {
  const contenedor = document.getElementById("mi-equipo");
  if (!contenedor) return;

  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta-equipo mi-equipo";

  const escudoURL = equipo.escudo
    ? `http://localhost:3000/${equipo.escudo}`
    : "assets/default.png";

  tarjeta.innerHTML = `
    <h3>${equipo.nombre || "Sin nombre"}</h3>

    <p><b>Localidad:</b> ${equipo.localidad || "Sin localidad"}</p>

    <p><b>Entrenador:</b> 
      ${equipo.entrenadorNombreCompleto || "Sin asignar"}
    </p>
  `;

  contenedor.appendChild(tarjeta);
}

// FUNCIÓN PARA CARGAR MI EQUIPO DESDE BACKEND

async function cargarMiEquipo() {
  const contenedor = document.getElementById("mi-equipo");
  if (!contenedor) return;

  contenedor.innerHTML = "<p>Cargando...</p>";

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL_MI_EQUIPO, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log("Respuesta del endpoint /mis-equipos:", data);

    // NORMALIZA LA RESPUESTA
    const equipo =
      Array.isArray(data) ? data[0] :      // SI VIENE CON EL ARRAY
      data?.equipo ? data.equipo :         // SI VIENE COMO EQUIPO () POR SI ACASO
      data;                                // SI VIENE SOLO EL OBJETO

    if (!equipo) {
      contenedor.innerHTML = "<p>No tienes equipo asignado.</p>";
      return;
    }

    // LIMPIAMOS EL CONTENEDOR Y SE PINTA EN LAS TARJETAS
    contenedor.innerHTML = "";
    pintarMiEquipo(equipo);

    // OPTENEMOS LA ID DEL EQUIPO PARA MANDARLO A LLAMAR EN LAS TARJETAS
    console.log("ID de MI EQUIPO:", equipo.id);

    // Si quieres guardarla en el navegador:
    localStorage.setItem("miEquipoId", equipo.id);

  } catch (error) {
    console.error("Error al traer mi equipo:", error);
    contenedor.innerHTML = "<p>Error al cargar tu equipo.</p>";
  }
}


 // INICIALIZACIÓN

document.addEventListener("DOMContentLoaded", cargarMiEquipo);
