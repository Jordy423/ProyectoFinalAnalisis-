let db;

// Inicialización de IndexedDB con mensajes de estado
const request = indexedDB.open('BaseUsuarios', 1);

request.onupgradeneeded = (event) => {
    console.log('Actualización de la base de datos.');
    db = event.target.result;

    if (!db.objectStoreNames.contains('usuarios')) {
        console.log('Creando object store "usuarios".');
        const store = db.createObjectStore('usuarios', { keyPath: 'id', autoIncrement: true });
        store.createIndex('email', 'email', { unique: true });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
    console.log('Base de datos abierta con éxito.');
    mostrarUsuarios();
};

request.onerror = (event) => {
    console.error('Error al abrir la base de datos:', event.target.error);
};

// Función para guardar un usuario
function guardarUsuario(usuario) {
    console.log('Intentando guardar usuario:', usuario);
    const transaction = db.transaction(['usuarios'], 'readwrite');

    transaction.onerror = (event) => {
        console.error('Error en la transacción:', event.target.error);
    };

    const store = transaction.objectStore('usuarios');
    const request = store.add(usuario);

    request.onsuccess = () => {
        console.log('Usuario guardado correctamente.');
        mostrarUsuarios(); // Actualiza la tabla
    };

    request.onerror = (event) => {
        console.error('Error al guardar el usuario:', event.target.error);
        alert('Error: El correo ya existe.');
    };
}

// Manejar el evento del formulario
document.getElementById('roleForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita recarga

    const nombre = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const rol = document.getElementById('role').value;

    if (!nombre || !email) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const usuario = { nombre, email, rol };
    guardarUsuario(usuario);
    event.target.reset(); // Limpia el formulario
});

// Mostrar usuarios en la tabla
function mostrarUsuarios() {
    const transaction = db.transaction(['usuarios'], 'readonly');
    const store = transaction.objectStore('usuarios');
    const request = store.openCursor();
    const tablaBody = document.querySelector('#userTable tbody');
    tablaBody.innerHTML = ''; // Limpia la tabla

    request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            const { id, nombre, email, rol } = cursor.value;
            const row = `
                <tr>
                    <td>${id}</td>
                    <td>${nombre}</td>
                    <td>${email}</td>
                    <td>${rol}</td>
                    <td>
                        <button class="btn-editar" onclick="editarUsuario(${id})">Editar</button>
                        <button class="btn-eliminar" onclick="eliminarUsuario(${id})">Eliminar</button>
                    </td>
                </tr>`;
            tablaBody.innerHTML += row;
            cursor.continue();
        }
    };

    request.onerror = (event) => {
        console.error('Error al mostrar los usuarios:', event.target.error);
    };
}

// Eliminar un usuario
function eliminarUsuario(id) {
    const transaction = db.transaction(['usuarios'], 'readwrite');
    const store = transaction.objectStore('usuarios');
    const request = store.delete(id);

    request.onsuccess = () => {
        console.log(`Usuario con ID ${id} eliminado.`);
        mostrarUsuarios();
    };

    request.onerror = (event) => {
        console.error('Error al eliminar el usuario:', event.target.error);
    };
}
