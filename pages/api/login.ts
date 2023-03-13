import type { NextApiRequest, NextApiResponse } from "next";
import { conectarMongoDB } from "../../middlewares/conectarMongoDB";

const endpointLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { login, senha } = req.body;
    if (login && login === "ana@gmail.com" && senha === "123") {
      return res.status(200).json({
        nome: login,
        email: senha
      });
    }
    return res.status(400).json({ erro: "Usuário ou senha não encontrado" });
  }
  return res.status(405).json({ erro: "Método informado não é válido" });
};

export default conectarMongoDB(endpointLogin);
