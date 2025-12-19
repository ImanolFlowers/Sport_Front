document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("modal-editar");
  const btnGuardar = document.getElementById("btn-guardar-editar");
  const btnCancelar = document.getElementById("btn-cancelar-editar");

  let usuarioEditandoId = null;

  // abre modal al hacer clic
  document.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("btn-editar")) return;

    usuarioEditandoId = e.target.dataset.id;

    const token = localStorage.getItem("token");

    // optiene los datos del usuario seleccionadp
    const res = await fetch(`http://localhost:3000/users/${usuarioEditandoId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    const u = await res.json();

    // llena los campos del mmodal
    document.getElementById("edit-username").value = u.username;
    document.getElementById("edit-name").value = u.name;
    document.getElementById("edit-apellidos").value = u.apellido;
    document.getElementById("edit-email").value = u.email;
    document.getElementById("edit-telefono").value = u.telefono;

    modal.classList.remove("hidden");
  });

  // guarda los camnbio del patch
  btnGuardar.addEventListener("click", async () => {

    const token = localStorage.getItem("token");

    const body = {
      username: document.getElementById("edit-username").value,
      name: document.getElementById("edit-name").value,
      apellido: document.getElementById("edit-apellidos").value,
      email: document.getElementById("edit-email").value,
      telefono: document.getElementById("edit-telefono").value
    };


    const res = await fetch(`http://localhost:3000/users/${usuarioEditandoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      alert("Error al actualizar usuario");
      return;
    }

    alert("Usuario actualizado correctamente ✔");

    modal.classList.add("hidden");
    location.reload();
  });

  // cancelar
  btnCancelar.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

});
