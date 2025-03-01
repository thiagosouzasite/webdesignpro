import dbConnect from '../../lib/dbConnect';

export default async function handler(req, res) {
  try {
    await dbConnect();
    res.status(200).json({ success: true, message: 'Conexão com o banco de dados estabelecida com sucesso!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao conectar ao banco de dados', error: error.message });
  }
} 