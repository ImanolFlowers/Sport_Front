//*formulario crear equipo, al jacer clic
document.addEventListener("DOMContentLoaded", () => {
  const btnCrear = document.getElementById("btn-crear");
  const formCrear = document.getElementById("form-crear");

  if (btnCrear && formCrear) {
    btnCrear.addEventListener("click", () => {
      formCrear.classList.toggle("formulario-oculto");
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
    const btnEditar = document.getElementById("btn-editar");
    const modal = document.getElementById("modal-editar");
    const btnCancelar = document.getElementById("modal-cancelar");

    if (!btnEditar || !modal || !btnCancelar) {
        console.warn("No se encontraron elementos del modal");
        return;
    }

    // ABRIR MODAL
    btnEditar.addEventListener("click", () => {
        modal.classList.remove("oculto");
        modal.classList.add("activo");
    });

    // CERRAR MODAL
    btnCancelar.addEventListener("click", () => {
        modal.classList.add("oculto");
        modal.classList.remove("activo");
    });

    // Cerrar si se hace clic fuera del contenido
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("oculto");
            modal.classList.remove("activo");
        }
    });
});



//ocultar botones del entrenador

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const rolStorage = localStorage.getItem("rol");

    let rol = rolStorage;

    // Si existe token, leer rol del token (es más confiable)
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            rol = payload.role;
        } catch {}
    }

    const btnCrear = document.getElementById("btn-crear");
    const btnEditar = document.getElementById("btn-editar");
    const miEquipo = document.getElementById("mi-equipo"); // se pinta mi equipo

    // se oculta si no es entrenador
    if (rol !== "ENTRENADOR") {
        if (btnCrear) btnCrear.style.display = "none";
        if (btnEditar) btnEditar.style.display = "none";
        if (miEquipo) miEquipo.style.display = "none";
    }
});
