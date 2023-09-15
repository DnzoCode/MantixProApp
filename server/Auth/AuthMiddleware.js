import jwt from "jsonwebtoken";
import User from "../models/UserModel/User";

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Obtén el token del encabezado de la solicitud
    if (!token) {
      throw new Error("No se proporcionó un token de autenticación.");
    }
    const decodedToken = jwt.verify(token, "UNSAFE_STRING");
    if (!decodedToken) {
      throw new Error("Token inválido o expirado.");
    }
    const user = await User.findById(decodedToken.user_id);

    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    // Agrega el usuario al objeto de solicitud para que esté disponible en las rutas protegidas
    req.user = user;

    next(); // Permite que la solicitud continúe
  } catch (error) {
    return res
      .status(401)
      .json({ message: "No estás autorizado para acceder a este recurso." });
  }
};
