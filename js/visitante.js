document.addEventListener("DOMContentLoaded", () => {
    const btnVisitante = document.getElementById("btn-visitante");

    if (!btnVisitante) return;

    btnVisitante.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.setItem("rol", "VISITANTE");
        window.location.href = "menu.html";
    });
});
