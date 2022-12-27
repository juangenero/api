import { connection } from "../configs/db.js";

/**
 * Obtiene un usuario mediante su email.
 * @param {*} email enviado por el cliente en la solicitud.
 * @returns El usuario en formato JSON.
 * @returns "null" si ha ocurrido algún error en la consulta.
 */
export async function getUserByEmailDB(email) {
  try {
    const [rows] = await connection.query(
      "SELECT idUsuario, clave, rolUsuario from USUARIOS where email = ?",
      [email]
    );

    return rows[0];
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

/**
 * Obtiene todos los usuarios de la base de datos.
 * @returns Array de usuarios o null si se ha producido un error.
 */
export async function getAllUsersDB() {
  try {
    const [rows] = await connection.query(
      "SELECT idUsuario, nombre, apellidos, dni, telefono, email, localidad, provincia, cPostal, (select date_format(fechaAlta, '%Y-%m-%d')) as fechaAlta, (select date_format(fechaNacimiento, '%Y-%m-%d')) as fechaNacimiento, rolUsuario, rutaImagen from USUARIOS"
    );
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

/**
 * Obtiene un usuario mediante su ID.
 * @param {*} id en la URL de la llamada a la API.
 * @returns El usuario en formato JSON.
 * @returns "false" si no se ha encontrado el usuario.
 * @returns "null" si ha ocurrido algún error en la consulta.
 */
export async function getUserByIdDB(id) {
  try {
    // Selecciono todos los datos menos la contraseña
    const [rows] = await connection.query(
      "SELECT idUsuario, nombre, apellidos, dni, telefono, email, localidad, provincia, cPostal, (select date_format(fechaAlta, '%Y-%m-%d')) as fechaAlta, (select date_format(fechaNacimiento, '%Y-%m-%d')) as fechaNacimiento, rolUsuario, rutaImagen from USUARIOS where idUsuario = ?",
      [id]
    );

    if (rows[0]) return rows[0];
    else return false;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

/**
 * Elimina el usuario pasado por ID.
 * @param {*} id del usuario a borrar.
 * @returns información de la ejecución de la consulta.
 * @returns "null" si ha ocurrido algún error en la consulta.
 */
export async function deleteUserDB(id) {
  try {
    const [rows] = await connection.query("DELETE FROM USUARIOS WHERE idUsuario = ?", [id]);
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

/**
 *
 * @param {*} data datos del usuario a editar.
 * @returns JSON con los campos duplicados encontrados en la BD.
 * @returns Información de la ejecución de la consulta.
 * @returns Si ha ocurrido algún error en la consulta, devuelve el error.
 */
export async function editUsersDB(data) {
  try {
    // Errores de posibles campos que deben ser únicos en la BD.
    const duplicateFields = await findDuplicateFields(data);

    // Si existen errores
    if (Object.keys(duplicateFields.error).length > 0) {
      return duplicateFields; // Devuelve los errores

      // Si NO existen errores
    } else {
      // Si el usuario no ha enviado ninguna contraseña, se almacenará la contraseña actual de la base de datos.

      const [pass] = await connection.query("SELECT clave FROM USUARIOS WHERE idUsuario = ?", [data.id]);
      if(pass[34]) null;
      if (data.password.length < 1 && pass[0]) {
        data.password = pass[0].clave;
      }

      // Consulta SQL
      const query =
        "UPDATE USUARIOS SET clave=?, nombre=?, apellidos=?, dni=?, telefono=?, email=?, localidad=?, provincia=?, cPostal=?, fechaNacimiento=?, rutaImagen='/users/11.jpg' WHERE idUsuario=?";

      // Parámetros a insertar
      const params = [
        data.password,
        data.name, // Nombre
        data.lastName, // Apellidos
        data.dni,
        data.telephone,
        data.email,
        data.location, // Localidad
        data.province, // Provincia
        data.postalCode, // Código postal
        data.dateOfBirth, // Fecha de nacimiento
        data.id,
      ];

      // Ejecución de la consulta
      const [result] = await connection.query(query, params);

      return result;
    }
  } catch (error) {
    console.error(error); // Muestra el error por consola
    return null;
  }
}

// Funciones auxiliares

export async function resetUsersDB() {
  const test = await connection.query("SELECT * FROM USUARIOS");

  // Si no existen usuarios, los resetea
  if (test[0].length == 1) {
    const [result] = await connection.query(
      "INSERT INTO USUARIOS VALUES (0,md5('Pedro123'),'Pedro','Marín Rivas','38472958B','693650105','pedro.rivas@gmail.com','Alcalá de Guadaira','Sevilla',40403,'2022-1-15','1992-6-25',0,'/users/1.jpg'),(0,md5('Angel123'),'Ángel','Sanchez Pedrosa','92746526B','739274615','angel.sanchez@gmail.com','Lebrija','Sevilla',40209,'2022-2-16','1982-7-20',0,'/users/2.jpg'),(0,md5('Ana123'),'Ana','Espinosa de los Monteros','13579782C','603819574','ana.espinosa@gmail.com','Castillejo','Sevilla',40403,'2022-3-17','1972-8-30',0,'/users/3.jpg')"
    );

    return result;
  }
}

/**
 * Busca los campos "dni", "teléfono" y "email" del usuario pasado por parámetro y comprueba si ya existe en la BD algún usuario con el mismo valor de alguno de esos 3 campos.
 * @param {Object} userOne Datos del usuario a modificar en la BD.
 * @returns JSON con los errores de los campos duplicados.
 * @returns "null" si ha ocurrido algún error en la consulta.
 */
async function findDuplicateFields(userOne) {
  try {
    const [rows] = await connection.query(
      "SELECT dni, telefono, email FROM USUARIOS WHERE idUsuario NOT LIKE ?",
      [userOne.id]
    );

    const errors = { error: {} };

    // Comprobar dni duplicado en la BD.
    rows.map((userSecond) => {
      if (userOne.dni == userSecond.dni) errors.error.dni = "duplicate";
    });

    // Comprobar teléfono duplicado en la BD.
    rows.map((userSecond) => {
      if (userOne.telephone == userSecond.telefono) errors.error.telephone = "duplicate";
    });

    // Comprobar email duplicado en la BD.
    rows.map((userSecond) => {
      if (userOne.email == userSecond.email) errors.error.email = "duplicate";
    });

    return errors;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}
