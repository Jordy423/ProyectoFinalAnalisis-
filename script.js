let employees = [];

document.getElementById('employeeForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let position = document.getElementById('position').value;
    let salary = parseFloat(document.getElementById('salary').value);

    // Enviar datos al backend
    fetch('http://localhost:3000/empleados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, position, salary }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al agregar el empleado');
        }
        return response.text();
    })
    .then(data => {
        alert(data);
        employees.push({ name, position, salary }); // Guardar localmente
        updateEmployeeList();
        document.getElementById('employeeForm').reset(); // Limpiar formulario
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function updateEmployeeList() {
    const employeeSelect = document.getElementById('employee');
    employeeSelect.innerHTML = '';

    employees.forEach((employee, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.text = employee.name;
        employeeSelect.add(option);
    });
}

document.getElementById('payrollForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    let selectedEmployeeIndex = document.getElementById('employee').value;
    let workedDays = parseInt(document.getElementById('workedDays').value);
    let extraHours = parseInt(document.getElementById('extraHours').value);

    if (selectedEmployeeIndex === "") {
        alert("Por favor selecciona un empleado.");
        return;
    }

    let employee = employees[selectedEmployeeIndex];
    let baseSalary = employee.salary;
    let dailySalary = baseSalary / 30; // Suponiendo 30 días en el mes
    let salaryForWorkedDays = dailySalary * workedDays;
    let extraHourRate = dailySalary / 8 * 1.5; // Suponiendo que cada hora extra es pagada al 150%
    let salaryForExtraHours = extraHours * extraHourRate;
    let totalSalary = salaryForWorkedDays + salaryForExtraHours;

    // Mostrar el resultado de la nómina
    document.getElementById('salaryOutput').textContent = `Empleado: ${employee.name}, Total a pagar: Q${totalSalary.toFixed(2)}`;
});
