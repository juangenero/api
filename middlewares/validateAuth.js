import jwt from "jsonwebtoken"; // JWT

/**
 * Este middleware intercepta las solicitudes HTTP y comprueba si existe un token JWT válido en la cabecera.
 * Si existe, deja pasar la petición a los demás enrutadores, si no existe, enviará una respuesta al cliente.
 */
export function validateAuth(req, res, next) {
  const token = req.headers["authorization"];

  // Si existe el token..
  if (token) {
    if (validateJWT(token)) next(); // Si el token es válido
    else res.status(403).json({ error: "token expired" }); // Si el token no es válido

    // Si no existe el token
  } else {
    res.status(403).json({ error: "missing token" });
  }
}

/**
 * Recibe un token JWT e indica si es o no válido para este servidor.
 * @param {*} token Token JWT
 * @returns true o false
 */
function validateJWT(token) {
  let result = false;

  jwt.verify(token, process.env.SIGN_JWT, (err, data) => {
    if (data) result = true;
  });
  return result;
}

export default validateAuth;
