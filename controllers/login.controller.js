import jwt from "jsonwebtoken"; // JWT
import { getUserByEmail } from "../models/users.model.js";

export function login(req, res) {
  const email = req.body.username; // En el cliente este valor es "username" pero en el backend es "email"
  const password = req.body.password;

  // Si el usuario o la contraseña están vacíos
  if (!(email && password)) {
    res.json({ error: "Usuario o contraseña vacíos" });

    // Si los campos del formulario NO están vacíos
  } else {
    // Obtener el usuario de la BD
    getUserByEmail(email)
      .then((user) => {
        // Si el usuario existe y la contraseña es correcta
        if (user && user.clave == password) {
          // Extraer datos del usuario que se enviarán al cliente
          const payload = {
            id: user.idUsuario,
            rol: user.rolUsuario,
          };

          // Firmar token y enviarlo al cliente
          const token = jwt.sign(payload, process.env.SIGN_JWT);
          res.json({ token });

          // Si el usuario o la contraseña son incorrectos
        } else {
          res.json({ error: "Usuario o contraseña incorrecto" });
        }
      })
      .catch(() => res.json({ error: "Error en la base de datos" }));
  }
}


/**
 * Función que devuelve true o false indicando si el token recibido es válido
 */


export default login;
