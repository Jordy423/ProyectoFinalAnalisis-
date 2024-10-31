async function cargarEmpleados() {
    try {
        const response = await fetch('http://localhost:3000/empleados'); 
        const empleados = await response.json();
        mostrarEmpleados(empleados);
    } catch (error) {
        console.error('Error al cargar empleados:', error);
        alert('Error al cargar empleados');
    }
}

function mostrarEmpleados(empleados) {
    const empleadosTableBody = document.querySelector('#empleadosTable tbody');
    empleadosTableBody.innerHTML = ''; // Limpiar el contenedor

    empleados.forEach(empleado => {
        const iggs = parseFloat(empleado.salario) * 0.0483; // Calcular IGGS (4.83%)
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${empleado.id}</td>
            <td>${empleado.nombre}</td>
            <td>${empleado.puesto}</td>
            <td>Q${parseFloat(empleado.salario).toFixed(2)}</td>
            <td class="iggs">Q${iggs.toFixed(2)}</td> <!-- Mostrar IGGS calculado -->
        `;
        empleadosTableBody.appendChild(row); // Agregar la fila al cuerpo de la tabla
    });
}

function calcularIGGS() {
    const iggsPercentage = 0.0483; // Porcentaje del IGGS
    const rows = document.querySelectorAll('#empleadosTable tbody tr');

    rows.forEach(row => {
        const salarioBase = parseFloat(row.children[3].innerText.replace('Q', '').replace(',', ''));
        const iggs = salarioBase * iggsPercentage;
        row.children[4].innerText = `Q${iggs.toFixed(2)}`; // Actualizar IGGS en la tabla
    });
}

// Evento de carga de la página
document.addEventListener('DOMContentLoaded', () => {
    cargarEmpleados(); 
    document.getElementById('btnCalcular').addEventListener('click', calcularIGGS); 
});
