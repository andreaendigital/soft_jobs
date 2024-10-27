const { Pool } = require("pg");


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
console.log(email, lenguage, password, rol)
  }


  module.exports = { getJobs, verificarCredenciales, agregarUsuario};