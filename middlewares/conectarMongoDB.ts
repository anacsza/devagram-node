import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import mongoose from 'mongoose';

export const conectarMongoDB = (handler : NextApiHandler) =>
    async (req: NextApiRequest, res : NextApiResponse) => {

    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }

    const {DB_CONEXAO_STRING} = process.env;

    if(!DB_CONEXAO_STRING){
        return res.status(500).json({ erro : 'string de conexão não informado'});
    }

    mongoose.connection.on('connected', () => console.log('Conectado'));
    mongoose.connection.on('error', error => console.log(`Ocorreu um erro ao conectar: ${error}`));
    await mongoose.connect(DB_CONEXAO_STRING);
    
    return handler(req, res);
}