// Cargar todos los empleados al iniciar la página
window.onload = fetchEmployees;

// Obtener todos los empleados desde el backend
function fetchEmployees() {
    fetch('http://localhost:3000/empleados')
        .then(response => response.json())
        .then(data => populateTable(data))
        .catch(error => console.error('Error al cargar empleados:', error));
}

// Llenar la tabla con los empleados obtenidos
function populateTable(employees) {
    const tableBody = document.getElementById('employeeTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" value="${employee.nombre}" data-id="${employee.id}" class="editable"></td>
            <td><input type="text" value="${employee.puesto}" class="editable"></td>
            <td><input type="number" value="${employee.salario}" class="editable"></td>
            <td>
                <button onclick="updateEmployee(${employee.id})">Guardar</button>
                <button onclick="deleteEmployee(${employee.id})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Actualizar un empleado
function updateEmployee(id) {
    const row = document.querySelector(`input[data-id="${id}"]`).closest('tr');
    const updatedData = {
        name: row.cells[0].querySelector('input').value,
        position: row.cells[1].querySelector('input').value,
        salary: parseFloat(row.cells[2].querySelector('input').value)
    };

    fetch(`http://localhost:3000/empleados/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (response.ok) {
            alert('Empleado actualizado');
            fetchEmployees(); // Recargar la lista de empleados
        } else {
            throw new Error('Error al actualizar empleado');
        }
    })
    .catch(error => console.error(error));
}

// Eliminar un empleado
function deleteEmployee(id) {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
        fetch(`http://localhost:3000/empleados/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    fetchEmployees(); // Recargar la lista de empleados
                } else {
                    throw new Error('Error al eliminar empleado');
                }
            })
            .catch(error => console.error(error));
    }
}

// Buscar empleados por nombre
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchValue = document.getElementById('searchInput').value.toLowerCase();

    fetch('http://localhost:3000/empleados')
        .then(response => response.json())
        .then(data => {
            const filteredEmployees = data.filter(employee =>
                employee.nombre.toLowerCase().includes(searchValue)
            );
            populateTable(filteredEmployees);
        })
        .catch(error => console.error('Error al buscar empleados:', error));
});
