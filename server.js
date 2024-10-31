const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Permite la comunicación entre frontend y backend
const app = express();
const port = 3000;

// Middleware para manejar JSON y habilitar CORS
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nombredb',
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectarse a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos exitosa');
    }
});

// Ruta básica para verificar el estado del servidor
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

// *** RUTAS DE USUARIOS ***
// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        }
        res.status(200).json(results);
    });
});

// Agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
    const { nombre, email, rol } = req.body;

    console.log('Datos recibidos:', req.body); // Para depuración

    const sql = 'INSERT INTO usuarios (nombre, email, rol) VALUES (?, ?, ?)';
    db.query(sql, [nombre, email, rol], (err, result) => {
        if (err) {
            console.error('Error al insertar el usuario:', err);
            return res.status(500).json({ error: 'Error al insertar el usuario' });
        }
        res.status(201).json({ message: 'Usuario agregado exitosamente', id: result.insertId });
    });
});

// Actualizar un usuario por ID
app.put('/usuarios/:id', (req, res) => {
    const { nombre, email, rol } = req.body;
    const { id } = req.params;

    const sql = 'UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?';
    db.query(sql, [nombre, email, rol, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            return res.status(500).json({ error: 'Error al actualizar usuario' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    });
});

// Eliminar un usuario por ID
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM usuarios WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            return res.status(500).json({ error: 'Error al eliminar usuario' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    });
});

// *** RUTAS DE EMPLEADOS ***
// Obtener todos los empleados
app.get('/empleados', (req, res) => {
    const sql = 'SELECT * FROM empleados';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        }
        res.status(200).json(results);
    });
});

// Agregar un nuevo empleado
app.post('/empleados', (req, res) => {
    const { name, position, salary } = req.body;

    const sql = 'INSERT INTO empleados (nombre, puesto, salario) VALUES (?, ?, ?)';
    db.query(sql, [name, position, salary], (err, result) => {
        if (err) {
            console.error('Error al insertar el empleado:', err);
            return res.status(500).json({ error: 'Error al insertar el empleado' });
        }
        res.status(201).json({ message: 'Empleado agregado exitosamente', id: result.insertId });
    });
});

// Actualizar un empleado por ID
app.put('/empleados/:id', (req, res) => {
    const { name, position, salary } = req.body;
    const { id } = req.params;

    const sql = 'UPDATE empleados SET nombre = ?, puesto = ?, salario = ? WHERE id = ?';
    db.query(sql, [name, position, salary, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar empleado:', err);
            return res.status(500).json({ error: 'Error al actualizar empleado' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.status(200).json({ message: 'Empleado actualizado correctamente' });
    });
});

// Eliminar un empleado por ID
app.delete('/empleados/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM empleados WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar empleado:', err);
            return res.status(500).json({ error: 'Error al eliminar empleado' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.status(200).json({ message: 'Empleado eliminado correctamente' });
    });
});

// Ruta para generar el reporte
app.post('/generarReporte', async (req, res) => {
    try {
        // Obtener todos los empleados
        const sql = 'SELECT * FROM empleados';
        db.query(sql, async (err, empleados) => {
            if (err) {
                console.error('Error al obtener empleados:', err);
                return res.status(500).json({ error: 'Error al obtener empleados de la base de datos' });
            }
            
            // Formatear la fecha en 'YYYY-MM-DD'
            const fecha = new Date();
            const fechaGeneracion = fecha.toISOString().slice(0, 10); // 'YYYY-MM-DD'
            
            const totalEmpleados = empleados.length;
            const totalNominaProcesada = empleados.reduce((total, emp) => total + emp.salario, 0);

            
            // Estructura del reporte
            const reporte = {
                titulo: `Reporte de Nómina - Octubre 2024`,
                fechaGeneracion: fechaGeneracion,
                totalEmpleados: totalEmpleados,
                totalNominaProcesada: `Q${totalNominaProcesada.toFixed(2)}`,
                detalles: empleados.map(emp => ({
                    id: emp.id,
                    nombre: emp.nombre,
                    cargo: emp.puesto,
                    salarioBase: `Q${emp.salario.toFixed(2)}`,
                    deducciones: `Q${(emp.salario * 0.1).toFixed(2)}`, // Suponiendo un 10% de deducción
                    totalAPagar: `Q${(emp.salario - (emp.salario * 0.1)).toFixed(2)}`, // Salario menos deducciones
                })),
                notas: 'Todos los montos están en quetzales (Q).',
            };


            // Guardar el reporte en la base de datos
            const sqlInsert = 'INSERT INTO reportes (titulo, fechaGeneracion, totalEmpleados, totalNominaProcesada, detalles, notas) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(sqlInsert, [reporte.titulo, fechaGeneracion, totalEmpleados, totalNominaProcesada, JSON.stringify(reporte.detalles), reporte.notas], (insertErr, result) => {
                if (insertErr) {
                    console.error('Error al insertar el reporte:', insertErr);
                    return res.status(500).json({ error: 'Error al insertar el reporte en la base de datos' });
                }
                // Responder con el nuevo reporte
                res.status(201).json(reporte);
            });
        });
    } catch (error) {
        console.error('Error al generar el reporte:', error);
        res.status(500).json({ error: 'Error al generar el reporte' });
    }
});

// Ruta para obtener reportes
app.get('/generarReporte', (req, res) => {
    const sql = 'SELECT * FROM reportes'; // Ajusta esta consulta según tu estructura de base de datos
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al obtener los reportes:', err);
            return res.status(500).json({ error: 'Error al obtener reportes de la base de datos' });
        }
        res.json(result);
    });
});

// Rutas para obtener los permisos 
app.get('/permisos', (req, res) => {
 
    const query = 'SELECT * FROM permisos';
    db.query(query, (err, resultados) => {
        if (err) {
            console.error('Error al obtener los permisos:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.status(200).json(resultados);
    });
});
// Ruta para agregar un nuevo permiso
app.post('/permisos', (req, res) => {
    const { empleado_id, permiso, nombre, cargo } = req.body;

    const query = 'INSERT INTO permisos (empleado_id, permiso, nombre, cargo) VALUES (?, ?, ?,?)';
    db.query(query, [empleado_id, permiso, nombre, cargo], (err, result) => {
        if (err) {
            console.error('Error al agregar el permiso:', err);
            return res.status(500).json({ error: 'Error al agregar el permiso' });
        }
        res.status(201).json({ message: 'Permiso agregado correctamente', id: result.insertId });
    });
});

// Ruta para eliminar un permiso por ID
app.delete('/permisos/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM permisos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el permiso:', err);
            return res.status(500).json({ error: 'Error al eliminar el permiso' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Permiso no encontrado' });
        }
        res.status(200).json({ message: 'Permiso eliminado correctamente' });
    });
});
//ruta para gestion de permisos 
app.patch('/permisos/:id', (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    
    console.log(`ID: ${id}, Estado: ${estado}`); // Log para verificar los valores

    const query = 'UPDATE permisos SET estado = ? WHERE id = ?';
    db.query(query, [estado, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el permiso:', err);
            return res.status(500).json({ error: 'Error al actualizar el permiso' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Permiso no encontrado' });
        }
        res.status(200).json({ message: `Permiso con ID ${id} actualizado a ${estado}` });
    });
});
//actualizar estado del permiso
app.put('/permisos/:id', (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    const query = 'UPDATE permisos SET estado = ? WHERE id = ?';
    db.query(query, [estado, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el permiso:', err);
            return res.status(500).json({ error: 'Error al actualizar el permiso' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Permiso no encontrado' });
        }
        res.status(200).json({ message: `Permiso con ID ${id} actualizado a ${estado}` });
    });
});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
