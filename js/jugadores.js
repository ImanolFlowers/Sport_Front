document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-mis-jugadores");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.location.href = "jugadores.html";
  });
});


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-ver-jugadores")) {
        const equipoId = e.target.dataset.id;

        // Redirección con query param
        window.location.href = `jugadoresAdmin.html?equipo=${equipoId}`;
    }
});


document.addEventListener("DOMContentLoaded", () => {
  const btnAbrir = document.getElementById("btn-crear-jugador");
  const modal = document.getElementById("modal-crear-jugador");
  const btnCerrar = document.getElementById("cerrar-modal");

  // ABRIR MODAL
  btnAbrir.addEventListener("click", () => {
    modal.classList.add("activo");
  });

  // CERRAR MODAL
  btnCerrar.addEventListener("click", () => {
    modal.classList.remove("activo");
  });

  // Cerrar al hacer click afuera
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("activo");
    }
  });
});
