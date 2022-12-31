import express from "express"; // Importar servidor
import morgan from "morgan"; // Importar middleware para analizar cabeceras HTTP (Usado para el desarrollo)
import "./configs/env.js"; // Importar módulo para usar variables de entorno (archivo .env)
import cors from "cors"; // Habilita las CORS en el servidor para habilitar peticiones desde un cliente
import validateAuth from "./middlewares/validateAuth.js"; // Importar Middlewares

// Importar enrutadores
import loginRoute from "./routes/login.route.js";
import usersRoute from "./routes/users.route.js";

const app = express(); // Crear servidor

// Middlewares
app.use(cors()); // Permitir CORS en las peticiones
app.use(morgan(":method :url :status :req[header] :res[header]")); // Analizar cabeceras
app.use(express.json({ limit: "3 mb" })); // Procesar archivos JSON de 3 MB como máximo

// rutas
app.use(loginRoute);
app.use(validateAuth); // La rutas posteriores a este middleware necesitaran un usuario autenticado
app.use(usersRoute);

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
