
// en caso de utilizar el NGROK
//,METER LAS URL EN COMO APIS
const API_URL = "http://localhost:3000/auth";

// login
const loginForm = document.querySelector(".sign-in");
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!username || !password) {
        alert("Por favor completa los campos.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Error al iniciar sesión");

        alert("Inicio de sesión correcto");
        localStorage.setItem("token", data.access_token);
        window.location.href = "/menu.html";
    } catch (error) {
        alert(`Error al iniciar sesión: ${error.message}`);
    }
    });

    //registro
    const signupForm = document.querySelector(".sign-up");
    signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("signup-username").value.trim();
    const name = document.getElementById("signup-name").value.trim();
    const apellido = document.getElementById("signup-apellido").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const role = document.getElementById("signup-role").value;

    if (!username || !name || !apellido || !email || !password) {
        alert("Por favor debes acompletar todos los campos.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, name, apellido, email, password, role }),
        });

        const data = await response.json();

        if (!response.ok) {
        if (Array.isArray(data.message)) {
            alert(data.message.join("\n"));
        } else {
            alert(data.message || "error al registrarse");
        }
        return;
        }

        alert("registro exitoso");
        signupForm.reset();
    } catch (error) {
        alert(`Error de conexión: ${error.message}`);
    }
});
