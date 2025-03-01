import dbConnect from '../../../lib/dbConnect';
import Produto from '../../../models/Produto';

export default async function handler(req, res) {
  const { 
    query: { id },
    method 
  } = req;
  
  await dbConnect();
  
  switch (method) {
    case 'GET':
      try {
        const produto = await Produto.findById(id);
        
        if (!produto) {
          return res.status(404).json({ success: false, message: 'Produto não encontrado' });
        }
        
        res.status(200).json({ success: true, data: produto });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'PUT':
      try {
        const produto = await Produto.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        
        if (!produto) {
          return res.status(404).json({ success: false, message: 'Produto não encontrado' });
        }
        
        res.status(200).json({ success: true, data: produto });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'DELETE':
      try {
        const deletedProduto = await Produto.findByIdAndDelete(id);
        
        if (!deletedProduto) {
          return res.status(404).json({ success: false, message: 'Produto não encontrado' });
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