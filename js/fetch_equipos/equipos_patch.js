/**********************************************
 *  EDITAR MI EQUIPO (SOLO ENTRENADOR)
 **********************************************/

document.addEventListener("DOMContentLoaded", async () => {

  /**********************************************
   * VALIDAR ROL (solo ENTRENADOR)
   **********************************************/
  const token = localStorage.getItem("token");
  let rol = localStorage.getItem("rol");

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      rol = payload.role;
    } catch {}
  }

  // ⛔ Si NO es ENTRENADOR, NO ejecutamos nada
  if (rol !== "ENTRENADOR") return;


  /**********************************************
   *  CAPTURA DE ELEMENTOS DEL DOM
   **********************************************/
  const btnEditar = document.getElementById("btn-editar");
  const modal = document.getElementById("modal-editar");

  const inputNombre = document.getElementById("modal-nombre");
  const inputLocalidad = document.getElementById("modal-lugar");

  const btnGuardar = document.getElementById("modal-guardar");
  const btnCancelar = document.getElementById("modal-cancelar");

  if (!btnEditar || !modal || !btnGuardar || !btnCancelar) {
    console.warn("Elementos del modal de editar equipo no encontrados.");
    return;
  }


  /**********************************************
   *  OBTENER MI EQUIPO
   **********************************************/
  let equipo = null;

  try {
    const res = await fetch("http://localhost:3000/equipos/mis-equipos", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    equipo = Array.isArray(data) ? data[0] : data.equipo || data;

    if (!equipo) {
      console.warn("No tienes equipo asignado.");
      return;
    }

  } catch (e) {
    console.error("Error al cargar tu equipo:", e);
    return;
  }


  /**********************************************
   *  ABRIR MODAL
   **********************************************/
  btnEditar.addEventListener("click", () => {
    inputNombre.value = equipo.nombre || "";
    inputLocalidad.value = equipo.localidad || "";
    modal.classList.remove("oculto");
  });


  /**********************************************
   *  CERRAR MODAL
   **********************************************/
  btnCancelar.addEventListener("click", () => {
    modal.classList.add("oculto");
  });


  /**********************************************
   *  GUARDAR CAMBIOS (PATCH)
   **********************************************/
  btnGuardar.addEventListener("click", async () => {

    const body = {};

    if (inputNombre.value.trim() !== equipo.nombre) {
      body.nombre = inputNombre.value.trim();
    }

    if (inputLocalidad.value.trim() !== equipo.localidad) {
      body.localidad = inputLocalidad.value.trim();
    }

    if (Object.keys(body).length === 0) {
      alert("No hay cambios para actualizar.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/equipos/${equipo.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al actualizar");
        return;
      }

      // Actualizar valores locales
      if (body.nombre) equipo.nombre = body.nombre;
      if (body.localidad) equipo.localidad = body.localidad;

      alert("Equipo actualizado correctamente");
      modal.classList.add("oculto");

    } catch (err) {
      console.error("Error al actualizar equipo:", err);
      alert("Error al actualizar equipo.");
    }
  });

});
