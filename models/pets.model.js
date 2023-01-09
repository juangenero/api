import { connection } from "../configs/db.js";

export async function getAllPetsDB() {
  try {
    const [rows] = await connection.query(
      "SELECT idMascota, idUsuario,(select concat(usuarios.nombre ,' ', usuarios.apellidos ) from usuarios where usuarios.idUsuario = mascotas.idUsuario) as Dueño , nombre, especie, raza, sexo, peso,(select date_format(fechaAlta, '%Y-%m-%d')) as fechaAlta,(select date_format(fechaNacimiento, '%Y-%m-%d')) as fechaNacimiento, altura, comentarios, rutaImagen , (SELECT max(fecha) FROM pet_doctor.consultas where consultas.idMascota = mascotas.idMascota) as ultimaConsulta FROM MASCOTAS;"
    );
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}
