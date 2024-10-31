// Función para obtener y mostrar el total de empleados
async function cargarTotalEmpleados() {
    try {
        const response = await fetch('http://localhost:3000/empleados'); 
        const empleados = await response.json();
        document.getElementById('totalEmpleados').innerText = empleados.length; // Muestra el total de empleados
    } catch (error) {
        console.error('Error al cargar empleados:', error);
        document.getElementById('totalEmpleados').innerText = 'Error al cargar';
    }
}

// Función para ver empleados
function verEmpleados() {
    window.location.href = 'empleados.html'; 
}

// Función para ver reportes
function verReportes() {
    window.location.href = 'reportes.html'; 
}

// Función para generar reportes
async function generarReportes() {
    try {
        const response = await fetch('http://localhost:3000/generarReporte', { method: 'POST' });
        const reporteData = await response.json();
        
        // Aquí puedes construir el contenido del reporte
        let reporteResumen = `Reporte generado:\n\n`;
        reporteResumen += `Total de Empleados: ${reporteData.totalEmpleados}\n`;
        reporteResumen += `Total Nómina Procesada: ${reporteData.totalNomina}\n\n`;
        reporteResumen += `Detalles:\n`;
        
        reporteData.detalles.forEach(detalle => {
            reporteResumen += `ID: ${detalle.id}, Nombre: ${detalle.nombre}, Total a Pagar: Q${detalle.totalPagar}\n`;
        });

        // Muestra el reporte en una ventana emergente
        alert(reporteResumen);
    } catch (error) {
        console.error('Error al generar el reporte:', error);
        alert('Error al generar el reporte');
    }
}

// Función para ver nóminas
function verNominas() {
    window.location.href = 'calculo_nomina.html'; // Cambia esta URL por la ruta correcta
}

// Función para cargar datos de la gráfica
async function cargarDatosGrafica() {
    try {
        const response = await fetch('http://localhost:3000/empleados'); // Cambia la URL según tu API
        const empleados = await response.json();

        const salarios = empleados.map(emp => parseFloat(emp.salarioBase)); // Extrae los salarios
        const nombres = empleados.map(emp => emp.nombre); // Extrae los nombres

        crearGrafica(nombres, salarios); // Pasa los datos a la función crearGrafica
    } catch (error) {
        console.error('Error al cargar datos de la gráfica:', error);
    }
}

// Función para crear la gráfica
function crearGrafica(labels, data) {
    const ctx = document.getElementById('salaryChart').getContext('2d');

    const salaryChart = new Chart(ctx, {
        type: 'bar', // Tipo de gráfica
        data: {
            labels: labels, // Etiquetas del eje X
            datasets: [{
                label: 'Salario Base', // Etiqueta de la serie de datos
                data: data, // Datos de los salarios
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo de las barras
                borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
                borderWidth: 1 // Ancho del borde
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // Iniciar el eje Y en 0
                }
            }
        }
    });
}

// Evento de carga de la página
document.addEventListener('DOMContentLoaded', () => {
    cargarTotalEmpleados(); // Carga el total de empleados al iniciar
    cargarDatosGrafica(); // Cargar datos para la gráfica al iniciar
    document.getElementById('verEmpleados').addEventListener('click', verEmpleados);
    document.getElementById('verReportes').addEventListener('click', verReportes);
    document.getElementById('generarReportes').addEventListener('click', generarReportes);
    document.getElementById('verNominas').addEventListener('click', verNominas);
    document.getElementById('agregarEmpleado').addEventListener('click', () => {
        window.location.href = 'registrar.html'; 
    });
});
