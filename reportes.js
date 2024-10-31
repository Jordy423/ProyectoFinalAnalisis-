async function cargarReportes() {
    try {
        const response = await fetch('http://localhost:3000/generarReporte', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al cargar los reportes');
        }

        const reportes = await response.json();
        console.log('Reportes cargados:', reportes); 
        mostrarReportes(reportes);
    } catch (error) {
        console.error('Error al cargar los reportes:', error);
        alert('Error al cargar los reportes');
    }
}

function mostrarReportes(reportes) {
    const reportesContainer = document.getElementById('reportesContainer');
    reportesContainer.innerHTML = ''; // Limpiar el contenedor

    reportes.forEach(reporte => {
        const reporteDiv = document.createElement('div');
        reporteDiv.classList.add('reporte'); 

        
        reporteDiv.innerHTML = `
            <h3>${reporte.titulo}</h3>
            <p>Fecha de Generación: ${reporte.fechaGeneracion}</p>
            <p>Total Empleados: ${reporte.totalEmpleados}</p>
            <p>Total Nómina Procesada: ${reporte.totalNominaProcesada}</p>
            <p>Detalles: ${reporte.detalles}</p>
            <p>Notas: ${reporte.notas}</p>
        `;

        reportesContainer.appendChild(reporteDiv); // Agrega el reporte al contenedor
    });
}

async function generarReportes() {
    try {
        const response = await fetch('http://localhost:3000/generarReporte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al generar el reporte');
        }

        const reporte = await response.json();
        alert(`Reporte generado exitosamente:\n${JSON.stringify(reporte, null, 2)}`);
        cargarReportes(); // Cargar reportes nuevamente después de generar uno nuevo
    } catch (error) {
        console.error('Error al generar el reporte:', error);
        alert('Error al generar el reporte');
    }
}

// Evento de carga de la página
document.addEventListener('DOMContentLoaded', () => {
    cargarReportes(); // Carga los reportes al iniciar

    document.getElementById('btnRegresar').addEventListener('click', () => {
        window.location.href = 'dashboard.html'; 
    });
});
