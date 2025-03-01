// import dbConnect from '../../lib/dbConnect';

export default async function handler(req, res) {
  try {
    // Comentamos temporariamente a conexão com o banco
    // await dbConnect();
    res.status(200).json({ success: true, message: 'Teste de API' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no teste', error: error.message });
  }
} 