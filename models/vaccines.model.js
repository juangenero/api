import { connection } from "../configs/db.js";

export async function getAllVaccinesDB() {
  try {
    const [rows] = await connection.query("SELECT * FROM VACUNAS");
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

export async function getVaccineByIdDB(id) {
  try {
    const [rows] = await connection.query("SELECT * FROM VACUNAS WHERE idVacuna = ?", [id]);
    if (rows[0]) return rows[0];
    else return false;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

/**
 * 
 * @param {JSON} vaccine Vacuna enviada por el cliente
 * @returns JSON con error si el campos nombre está duplicado
 * @returns resultados de la consulta si todo a ido bien
 * @returns null si ha habido algún problema con la consulta
 */
export async function editVaccineDB(vaccine) {
  try {
    // Errores de posibles campos que deben ser únicos en la BD.
    const nameDuplicate = await findDuplicateFields(vaccine);

    // Si el nombre está duplicado
    if (nameDuplicate != null && nameDuplicate) {
      return { error: "Ya existe una vacuna llamada " + vaccine.nombre +"." }; // Devuelve los errores

      // Si NO existen errores
    } else {
      // Ejecución de la consulta
      const [result] = await connection.query(
        "UPDATE VACUNAS SET vacuna=?, observaciones=? WHERE idVacuna=?",
        [vaccine.nombre, vaccine.observaciones, vaccine.id]
      );

      return result;
    }
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

/**
 * Elimima una vacuna
 * @param {Integer} id de la vacuna
 * @returns Resultado de la ejecución de la consulta
 * @returns null si ha habido algún error en la ejecución de la consulta
 */
export async function deleteVaccineDB(id){
  try {
    const [rows] = await connection.query("DELETE FROM VACUNAS WHERE idVacuna = ?", [id]);
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

// Funciones auxiliares

/**
 * Busca si hay alguna vacuna con el mismo nombre
 * @param {JSON} vaccine Vacuna en formato JSON
 * @returns true si existen campos duplicados
 * @returns false si no existen campos duplicados
 * @returns null si ha habido algún problema en la consulta
 */
async function findDuplicateFields(vaccineOne) {
  try {
    const [rows] = await connection.query("SELECT vacuna FROM VACUNAS WHERE idVacuna NOT LIKE ?",[vaccineOne.id]);
    let result = false;

    // Si alguna vacuna de la BD coincide con la introducida con el cliente, result será true
    rows.map((vaccineSecond) => {
      if (vaccineOne.nombre.toLowerCase() === vaccineSecond.vacuna.toLowerCase()) result = true;
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
