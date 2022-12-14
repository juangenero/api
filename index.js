import express from "express"; // Importar servidor
import morgan from "morgan"; // Importar middleware para analizar cabeceras HTTP (Usado para el desarrollo)
import "./configs/env.js"; // Importar módulo para usar variables de entorno (archivo .env)
import cors from "cors"; // Habilita las CORS en el servidor para habilitar peticiones desde un cliente

// Importar enrutadores
import loginRoute from "./routes/login.route.js";
import usersRoute from "./routes/users.route.js";

// Importar Middlewares
import validateAuth from "./middlewares/validateAuth.js";

const app = express(); // Crear servidor

// Middlewares
app.use(cors()); // Permitir CORS en las peticiones
app.use(morgan(":method :url :status :req[header] :res[header]")); // Analizar cabeceras
app.use(express.json()); // Procesar archivos JSON
//app.use(express.urlencoded({ extended: false })); // Procesar formularios

// rutas
app.use(loginRoute);
app.use(validateAuth); // La rutas posteriores a este middleware necesitaran un usuario autenticado
app.use(usersRoute);

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});