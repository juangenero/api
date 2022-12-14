import {createPool} from 'mysql2/promise'

// CreatePool mantiene las conexiones abiertas para que sean reutilizadas y las cierra automáticamente cuando llevan un tiempo determinado sin ser usadas.
export const conexion = createPool({
    host: 'localhost',
    user: 'juan',
    password: '1234',
    port: 3306,
    database: 'pet_doctor'
})