// ENDPOIN PAR CREAR EQUIPOS POR EL ENTRENADOR
async function crearEquipo() {
  const inputNombre = document.getElementById("nombre");
  const inputLugar = document.getElementById("lugar");
  const inputEscudo = document.getElementById("escudo"); // aun no se usa

  const nombre = inputNombre.value.trim();
  const localidad = inputLugar.value.trim();

  if (!nombre || !localidad) {
    alert("Debes llenar nombre y localidad.");
    return;
  }

  const payload = { nombre, localidad };
  console.log("Payload enviado:", payload);

  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/equipos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : ""
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log("Respuesta backend:", data);

    if (!res.ok) {
      alert(data.message || "Error al crear el equipo.");
      return;
    }

    alert("Equipo creado con éxito ");

    // limpia los imputs 
    inputNombre.value = "";
    inputLugar.value = "";
    inputEscudo.value = null;

    // refresca el dom
    if (typeof cargarEquipos === "function") {
      cargarEquipos();
    }

  } catch (err) {
    console.error("Error al crear equipo:", err);
    alert("Ocurrió un error inesperado.");
  }
}

// boton de guardar
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-guardar-equipo");
  if (btn) btn.addEventListener("click", crearEquipo);
});
