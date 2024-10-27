const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "3434",
  database: "softjobs",
  allowExitOnIdle: true,
});


/* AUTH verificación de usuarios */
const verificarCredenciales = async (email, password) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const values = [email];
    const { rows, rowCount } = await pool.query(consulta, values);
    if (!rowCount) {
      console.log("Usuario no encontrado:", email);
      throw { code: 404, message: "Credenciales incorrectas" };
    }
  
    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw { code: 401, message: "Contraseña incorrecta" };
  };

  const getJobs = async () => {
    const { rows: usuarios} = await pool.query("SELECT * FROM usuarios");
    return usuarios;
  }

  const agregarUsuario = async ({email, lenguage, password, rol}) =>{
    const salt = await bcrypt.genSalt(10); // Genera un "salt"
    const hashedPassword = await bcrypt.hash(password, salt); // Encripta la contraseña
    const consulta =
      "INSERT INTO usuarios(id, email, password, rol, lenguage) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *";
    const values = [email, hashedPassword, rol, lenguage];
    await pool.query(consulta, values);
  };


  module.exports = { getJobs, verificarCredenciales, agregarUsuario};