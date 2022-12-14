import { conexion } from "../configs/db.js";

export async function getUserByEmail(email) {
  const [result] = await conexion.query("select * from usuarios where email = ?", [email]);
  return result[0]; // Devuelve el primer resultado, ya que sólo habrá uno
}

/**
 * Devuelve todos los usuarios de la base de datos
 * @returns Array de usuarios
 */
export async function getAllUsers() {
  const [result] = await conexion.query(
    "select idUsuario, nombre, apellidos, dni, telefono, email, localidad, provincia, cPostal, (select date_format(fechaAlta, '%d/%m/%Y')) as fechaAlta, (select date_format(fechaNacimiento, '%d-%m-%Y')) as fechaNacimiento, rolUsuario, rutaImagen from usuarios;"

  );
  return result;
}
