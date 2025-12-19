document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal-crear-partido");
    const btnAbrir = document.getElementById("btn-crear-partido");
    const btnCerrar = document.getElementById("cerrar-modal");

    // abre el modal
    btnAbrir.addEventListener("click", () => {
        modal.classList.add("activo");   //se activa el display
    });

    // cierra modal
    btnCerrar.addEventListener("click", () => {
        modal.classList.remove("activo"); // se quita el display
    });

    // se cierrra al hacer clic fuera del contenido
    //reutilizar
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("activo");
        }
    });

});

//evento del boton de actualizar
document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-refresh")) {
        cargarPartidos();
    }
});

