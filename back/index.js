const express = require("express"); // importamos express
const cors = require("cors"); // importamos cors
const app = express(); //Creamos una instancia de express

const {  getJobs, verificarCredenciales, agregarUsuario } = require("./consultas");

app.listen(3000, () => console.log("Servidor arriba en el puerto 3000 ;)"));

app.use(express.json()); //middleware

app.use(cors()); //CORS

const JWT_SECRET_KEY = "clave_secreta_soft_jobs";

app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      await verificarCredenciales(email, password);
  
      const token = jwt.sign({ email }, jwt_secret_key);
      res.json({ token });
    } catch (error) {
      console.log("Error en /login:", error);
      res.status(error.code || 500).send(error.message);
    }
  });
  
  app.post("/usuarios", async (req, res) => {
    try {
      await agregarUsuario(req.body);
      res.status(201).send("Usuario agregado con exito ;)");
    } catch (error) {
      res
        .status(error.code || 500)
        .send(error.message || "Error al crear al usuario");
    }
  });

