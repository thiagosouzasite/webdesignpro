import dbConnect from '../../../lib/dbConnect';
import Projeto from '../../../models/Projeto';

export default async function handler(req, res) {
  const { method, query } = req;
  
  await dbConnect();
  
  switch (method) {
    case 'GET':
      try {
        // Filtro por cliente se fornecido
        const filter = query.cliente ? { cliente: query.cliente } : {};
        const projetos = await Projeto.find(filter)
          .populate('cliente')
          .populate('orcamento')
          .populate('produtos.produto')
          .sort({ createdAt: -1 });
        
        res.status(200).json({ success: true, data: projetos });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'POST':
      try {
        const projeto = await Projeto.create(req.body);
        res.status(201).json({ success: true, data: projeto });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Método não suportado' });
      break;
  }
} 