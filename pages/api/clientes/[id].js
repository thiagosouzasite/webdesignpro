import dbConnect from '../../../lib/dbConnect';
import Cliente from '../../../models/Cliente';

export default async function handler(req, res) {
  const { 
    query: { id },
    method 
  } = req;
  
  await dbConnect();
  
  switch (method) {
    case 'GET':
      try {
        const cliente = await Cliente.findById(id).populate('lead');
        
        if (!cliente) {
          return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
        }
        
        res.status(200).json({ success: true, data: cliente });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'PUT':
      try {
        const cliente = await Cliente.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        
        if (!cliente) {
          return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
        }
        
        res.status(200).json({ success: true, data: cliente });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'DELETE':
      try {
        const deletedCliente = await Cliente.findByIdAndDelete(id);
        
        if (!deletedCliente) {
          return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
        }
        
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Método não suportado' });
      break;
  }
} 