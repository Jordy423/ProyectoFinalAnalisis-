// permisos.js
async function cargarPermisos() {
    try {
        const response = await fetch('http://localhost:3000/permisos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al cargar los permisos');
        }

        const permisos = await response.json();
        console.log('Permisos cargados:', permisos); 
        mostrarPermisos(permisos);
    } catch (error) {
        console.error('Error al cargar los permisos:', error);
        alert('Error al cargar los permisos');
    }
}

function mostrarPermisos(permisos) {
    const tablaBody = document.querySelector('#tablaPermisos tbody');
    tablaBody.innerHTML = ''; // Limpiar la tabla antes de llenarla

    permisos.forEach(permiso => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${permiso.id}</td>
            <td>${permiso.empleado_id}</td>
            <td>${permiso.nombre}</td>
            <td>${permiso.cargo}</td>
            <td>${permiso.permiso}</td>
            <td>
                <button class="btn btn-aceptar" onclick="gestionarPermiso(${permiso.id}, 'aceptado')">Aceptar</button>
                <button class="btn btn-denegar" onclick="gestionarPermiso(${permiso.id}, 'denegado')">Denegar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });
}

async function gestionarPermiso(id, accion) {
    if (confirm(`¿Deseas ${accion} el permiso con ID ${id}?`)) {
        try {
            const response = await fetch(`http://localhost:3000/permisos/${id}`, {
                method: 'PATCH', // O 'PUT' según lo necesites
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: accion })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el permiso');
            }

            const result = await response.json();
            console.log('Respuesta de la API:', result); // Log para depuración
            alert(`El permiso con ID ${id} ha sido ${accion}.`);
            cargarPermisos(); // Recargar permisos después de gestionar uno
        } catch (error) {
            console.error('Error al gestionar el permiso:', error);
            alert('Error al gestionar el permiso');
        }
    }
}


// Evento de carga de la página
document.addEventListener('DOMContentLoaded', () => {
    cargarPermisos(); // Carga los permisos al iniciar
});
