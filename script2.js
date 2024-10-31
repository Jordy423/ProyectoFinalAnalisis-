let employees = [];

// Cargar empleados desde el backend al iniciar la página
window.addEventListener('DOMContentLoaded', cargarEmpleados);

function cargarEmpleados() {
    fetch('http://localhost:3000/empleados') // Asegúrate que el servidor esté corriendo en este puerto
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            employees = data; // Guardamos los empleados en la variable global
            updateEmployeeList(); // Llenar el select
        })
        .catch(error => {
            console.error('Error al cargar empleados:', error);
            alert('No se pudieron cargar los empleados. Verifica la conexión con el servidor.');
        });
}

function updateEmployeeList() {
    const employeeSelect = document.getElementById('employee');

    if (!employeeSelect) {
        console.error('Elemento <select> con ID "employee" no encontrado.');
        return;
    }

    employeeSelect.innerHTML = '<option value="">Selecciona un empleado</option>'; // Opción por defecto

    employees.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee.id;
        option.textContent = employee.nombre;
        employeeSelect.appendChild(option);
    });
}

// Manejar el cálculo de nómina
document.getElementById('payrollForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const employeeSelect = document.getElementById('employee');
    const selectedEmployeeId = employeeSelect.value;
    const workedDays = parseInt(document.getElementById('workedDays').value) || 0;
    const extraHours = parseInt(document.getElementById('extraHours').value) || 0;

    if (!selectedEmployeeId) {
        alert('Por favor, selecciona un empleado.');
        return;
    }

    const employee = employees.find(emp => emp.id === parseInt(selectedEmployeeId));
    if (!employee) {
        alert('Empleado no encontrado.');
        return;
    }

    const baseSalary = employee.salario;
    const dailySalary = baseSalary / 30;
    const salaryForWorkedDays = dailySalary * workedDays;
    const extraHourRate = (dailySalary / 8) * 1.5;
    const salaryForExtraHours = extraHours * extraHourRate;
    const totalSalary = salaryForWorkedDays + salaryForExtraHours;

    document.getElementById('salaryOutput').textContent =
        `Empleado: ${employee.nombre}, Total a pagar: Q${totalSalary.toFixed(2)}`;
});
