import { connection } from "../configs/db.js";

export async function getAllPetsDB() {
  try {
    const [rows] = await connection.query(
      "SELECT idMascota, idUsuario,(select concat(usuarios.nombre ,' ', usuarios.apellidos ) from usuarios where usuarios.idUsuario = mascotas.idUsuario) as dueno , nombre, especie, raza, sexo, peso,(select date_format(fechaAlta, '%Y-%m-%d')) as fechaAlta,(select date_format(fechaNacimiento, '%Y-%m-%d')) as fechaNacimiento, altura, comentarios, rutaImagen , (SELECT max(fecha) FROM pet_doctor.consultas where consultas.idMascota = mascotas.idMascota) as ultimaConsulta FROM MASCOTAS;"
    );
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

export async function getPetsOfUserDB(idUser) {
  try {
    const [rows] = await connection.query(
      "SELECT idMascota, idUsuario, nombre, especie, raza, sexo, peso,(select date_format(fechaAlta, '%Y-%m-%d')) as fechaAlta,(select date_format(fechaNacimiento, '%Y-%m-%d')) as fechaNacimiento, altura, comentarios, rutaImagen , (SELECT max(fecha) FROM pet_doctor.consultas where consultas.idMascota = mascotas.idMascota) as ultimaConsulta FROM MASCOTAS WHERE idUsuario = ?;",
      [idUser]
    );

    if (rows[0]) return rows; // Si existen resultados los devuelve
    else return false;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

export async function getPetByIdDB(idPet) {
  try {
    const [row] = await connection.query(
      "SELECT idMascota, (select concat(usuarios.nombre ,' ', usuarios.apellidos ) FROM usuarios WHERE usuarios.idUsuario = mascotas.idUsuario) as dueno, nombre, especie, raza, sexo, peso, (select date_format(fechaAlta, '%Y-%m-%d')) as fechaAlta, (select date_format(fechaNacimiento, '%Y-%m-%d')) as fechaNacimiento, altura, comentarios, rutaImagen FROM MASCOTAS WHERE idMascota = ?;",
      [idPet]
    );

    if (row[0]) return row[0];
    else return false;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}
