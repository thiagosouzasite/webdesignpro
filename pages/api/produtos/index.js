import dbConnect from '../../../lib/dbConnect';
import Produto from '../../../models/Produto';

export default async function handler(req, res) {
  const { method } = req;
  
  await dbConnect();
  
  switch (method) {
    case 'GET':
      try {
        const produtos = await Produto.find({}).sort({ nome: 1 });
        res.status(200).json({ success: true, data: produtos });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'POST':
      try {
        const produto = await Produto.create(req.body);
        res.status(201).json({ success: true, data: produto });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Método não suportado' });
      break;
  }
} 