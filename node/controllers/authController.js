const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let users = []; // En un escenario real, deberías usar una base de datos.

const register = async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  const token = jwt.sign({ username }, 'tu_clave_secreta', { expiresIn: '1h' });
  res.json({ token });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ username }, 'tu_clave_secreta', { expiresIn: '1h' });
  res.json({ token });
};

const logout = (req, res) => {
  // Para JWT, el logout suele ser del lado del cliente (eliminación del token)
  res.json({ message: 'Sesión finalizada' });
};

module.exports = { login, register, logout };
