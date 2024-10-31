// verificar.js

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los datos de entrada
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value; // Obtener el rol seleccionado

    // Simulando credenciales correctas
    const validCredentials = {
        admin: {
            username: "admin",
            password: "admin123"
        },
        employee: {
            username: "empleado",
            password: "empleado123"
        }
    };

    // Verificación de credenciales según el rol
    if (role === "admin" &&
        username === validCredentials.admin.username &&
        password === validCredentials.admin.password) {
        alert("Inicio de sesión exitoso como Administrador");
        window.location.href = "principal.html";  // Redirecciona a la página principal del administrador
    } else if (role === "employee" &&
               username === validCredentials.employee.username &&
               password === validCredentials.employee.password) {
        alert("Inicio de sesión exitoso como Empleado");
        window.location.href = "main_empleado.html";  // Redirecciona a la página para empleados
    } else {
        document.getElementById("error").textContent = "Usuario o contraseña incorrectos.";
    }
});
