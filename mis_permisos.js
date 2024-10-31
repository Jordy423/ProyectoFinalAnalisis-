document.getElementById('formPermiso').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar que el formulario se recargue

    const empleadoId = document.getElementById('empleadoId').value;
    const nombre = document.getElementById('nombre').value;
    const cargo = document.getElementById('cargo').value;
    const permiso = document.getElementById('permiso').value;

    // Validación simple
    if (!empleadoId || !nombre || !cargo || !permiso) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    // Enviar datos al backend
    try {
        const response = await fetch('http://localhost:3000/permisos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                empleado_id: empleadoId,
                nombre,
                cargo,
                permiso,
            }),
        });

        if (response.ok) {
            alert('Solicitud enviada correctamente.');
            document.getElementById('formPermiso').reset(); // Limpiar formulario
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Hubo un error al enviar la solicitud.');
    }
});
