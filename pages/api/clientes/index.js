import dbConnect from '../../../lib/dbConnect';
import Cliente from '../../../models/Cliente';

export default async function handler(req, res) {
  const { method } = req;
  
  await dbConnect();
  
  switch (method) {
    case 'GET':
      try {
        const clientes = await Cliente.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: clientes });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'POST':
      try {
        const cliente = await Cliente.create(req.body);
        res.status(201).json({ success: true, data: cliente });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Método não suportado' });
      break;
  }
} 