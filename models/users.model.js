import { connect } from "../configs/db.js";

/**
 * Devuelve todos los usuarios de la base de datos
 * @returns Array de usuarios
 */
export async function getAllUsersDB() {
  const [result] = await connect.query(
    "SELECT idUsuario, nombre, apellidos, dni, telefono, email, localidad, provincia, cPostal, (select date_format(fechaAlta, '%d/%m/%Y')) as fechaAlta, (select date_format(fechaNacimiento, '%d-%m-%Y')) as fechaNacimiento, rolUsuario, rutaImagen from USUARIOS"
  );
  return result;
}

export async function getUserByIdDB(id) {
  // Selecciono todos los datos menos la contraseña
  const [result] = await connect.query("SELECT idUsuario, nombre, apellidos, dni, telefono, email, localidad, provincia, cPostal, (select date_format(fechaAlta, '%d-%m-%Y')) as fechaAlta, (select date_format(fechaNacimiento, '%d-%m-%Y')) as fechaNacimiento, rolUsuario, rutaImagen from USUARIOS where idUsuario = ?", [id]);
  return result[0]; // Devuelve el primer resultado, ya que sólo habrá uno
}

export async function getUserByEmailDB(email) {
  const [result] = await connect.query("SELECT idUsuario, clave, rolUsuario from USUARIOS where email = ?", [email]);
  return result[0]; // Devuelve el primer resultado, ya que sólo habrá uno
}

export async function deleteUserDB(id) {
  const [result] = await connect.query("DELETE FROM USUARIOS WHERE idUsuario = ?", [id]);
  return result;
}

export async function resetUsersDB() {
  const test = await connect.query("SELECT * FROM USUARIOS");

  // Si no existen usuarios, los resetea
  if (test[0].length == 0) {
    const [result] = await connect.query(
      "INSERT INTO USUARIOS VALUES (0,md5('Pedro123'),'Pedro','Marín Rivas','38472958B','693650105','pedro.rivas@gmail.com','Alcalá de Guadaira','Sevilla',40403,'2022-1-15','1992-6-25',0,'/users/1.jpg'),(0,md5('Angel123'),'Ángel','Sanchez Pedrosa','92746526B','739274615','angel.sanchez@gmail.com','Lebrija','Sevilla',40209,'2022-2-16','1982-7-20',0,'/users/2.jpg'),(0,md5('Ana123'),'Ana','Espinosa de los Monteros','13579782C','603819574','ana.espinosa@gmail.com','Castillejo','Sevilla',40403,'2022-3-17','1972-8-30',0,'/users/3.jpg'),(0,md5('Soraya123'),'Soraya','Moreno Pérez','24687531P','687463257','soraya.moreno@gmail.com','Bormujo','Sevilla',40209,'2022-11-1','1981-4-25',1,'/users/11.jpg')"
    );

    return result;
  }
}
