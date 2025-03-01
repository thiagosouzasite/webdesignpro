import dbConnect from '../../../lib/dbConnect';
import Projeto from '../../../models/Projeto';

export default async function handler(req, res) {
  const { 
    query: { id },
    method 
  } = req;
  
  await dbConnect();
  
  switch (method) {
    case 'GET':
      try {
        const projeto = await Projeto.findById(id)
          .populate('cliente')
          .populate('orcamento')
          .populate('produtos.produto');
        
        if (!projeto) {
          return res.status(404).json({ success: false, message: 'Projeto não encontrado' });
        }
        
        res.status(200).json({ success: true, data: projeto });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'PUT':
      try {
        const projeto = await Projeto.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        
        if (!projeto) {
          return res.status(404).json({ success: false, message: 'Projeto não encontrado' });
        }
        
        res.status(200).json({ success: true, data: projeto });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'DELETE':
      try {
        const deletedProjeto = await Projeto.findByIdAndDelete(id);
        
        if (!deletedProjeto) {
          return res.status(404).json({ success: false, message: 'Projeto não encontrado' });
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