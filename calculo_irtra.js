const API_URL = 'http://localhost:3000';
async function cargarEmpleados() {
    try {
        const response = await fetch('http://localhost:3000/empleados');
        if (!response.ok) throw new Error('No se pudo cargar la lista de empleados');
        
        const empleados = await response.json();
        console.log('Empleados cargados:', empleados); 
        mostrarEmpleados(empleados);
    } catch (error) {
        console.error('Error al cargar empleados:', error);
        alert('Error al cargar empleados');
    }
}

function mostrarEmpleados(empleados) {
    const empleadosTableBody = document.querySelector('#tablaEmpleados'); 
    empleadosTableBody.innerHTML = ''; // Limpiar el contenedor

    empleados.forEach(empleado => {
        const irtra = calcularIRTRA(parseFloat(empleado.salario)); // Calcular IRTRA
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${empleado.id}</td>
            <td>${empleado.nombre.trim()}</td>
            <td>${empleado.puesto.trim()}</td>
            <td>Q${parseFloat(empleado.salario).toFixed(2)}</td>
            <td class="irtra">Q${irtra.toFixed(2)}</td> <!-- Mostrar IRTRA calculado -->
        `;
        empleadosTableBody.appendChild(row); // Agregar la fila al cuerpo de la tabla
    });
}

// Función para calcular IRTRA
function calcularIRTRA(salario) {
    const irtraPercentage = 0.01; 
    return salario * irtraPercentage;
}

// Evento para cargar empleados al inicio
document.addEventListener('DOMContentLoaded', () => {
    cargarEmpleados(); 
});




