//carga de datos en la tabla de posiciones

document.addEventListener("DOMContentLoaded", () => {
    cargarTabla();
});

async function cargarTabla() {
    const tbody = document.getElementById("tabla-body");

    // Indicador de carga
    tbody.innerHTML = `
        <tr><td colspan="10">Cargando...</td></tr>
    `;

    try {
        const res = await fetch("http://localhost:3000/tabla");

        if (!res.ok) {
            throw new Error("Error al obtener la tabla");
        }

        const tabla = await res.json();

        // Pintar tabla directamente SIN ordenar
        tbody.innerHTML = "";

        tabla.forEach((equipo) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${equipo.posicion}</td>
                <td>${equipo.nombreEquipo}</td>
                <td>${equipo.PJ}</td>
                <td>${equipo.PG}</td>
                <td>${equipo.PE}</td>
                <td>${equipo.PP}</td>
                <td>${equipo.GF}</td>
                <td>${equipo.GC}</td>
                <td>${equipo.DIF}</td>
                <td><strong>${equipo.Pts}</strong></td>
            `;

            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error(error);
        tbody.innerHTML = `
            <tr>
                <td colspan="10" style="color:red; font-weight:bold;">
                    Error al cargar la tabla
                </td>
            </tr>
        `;
    }
}
