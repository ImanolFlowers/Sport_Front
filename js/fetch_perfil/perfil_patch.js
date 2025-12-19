document.addEventListener("DOMContentLoaded", () => {
  const btnGuardar = document.getElementById("btn-guardar-perfil");

  if (!btnGuardar) return;

  btnGuardar.addEventListener("click", async () => {

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No estás autenticado");
      return;
    }

    // obtengo la ID del token
    let payload;
    try {
      payload = JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      alert("Token inválido");
      return;
    }

    const userId = payload.sub || payload.id;

    // obtrenemos los valores actualies
    const username   = document.getElementById("perfil-username").value;
    const name       = document.getElementById("perfil-name").value;
    const apellido  = document.getElementById("perfil-apellidos").value;
    const email      = document.getElementById("perfil-email").value;
    const telefono   = document.getElementById("perfil-telefono").value;
    const password   = document.getElementById("perfil-password").value;

    // se arma el body para enviar
    const body = {
      username,
      name,
      apellido,
      email,
      telefono
    };

    // Solo incluir la contraseña si escribieron algo
    if (password.trim() !== "") {
      body.password = password;
    }
    
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const msg = await res.json();
        console.error("Error en el backend:", msg);
        alert("No se pudo actualizar el perfil.");
        return;
      }

      alert("Datos actualizados correctamente");
      location.reload();

    } catch (error) {
      console.error("Error al intentar actualizar:", error);
      alert("Error inesperado al actualizar.");
    }

  });
});
