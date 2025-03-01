import dbConnect from '../../../lib/dbConnect';
import Lead from '../../../models/Lead';

export default async function handler(req, res) {
  const { 
    query: { id },
    method 
  } = req;
  
  await dbConnect();
  
  switch (method) {
    case 'GET':
      try {
        const lead = await Lead.findById(id);
        
        if (!lead) {
          return res.status(404).json({ success: false, message: 'Lead não encontrado' });
        }
        
        res.status(200).json({ success: true, data: lead });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'PUT':
      try {
        const lead = await Lead.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        
        if (!lead) {
          return res.status(404).json({ success: false, message: 'Lead não encontrado' });
        }
        
        res.status(200).json({ success: true, data: lead });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'DELETE':
      try {
        const deletedLead = await Lead.findByIdAndDelete(id);
        
        if (!deletedLead) {
          return res.status(404).json({ success: false, message: 'Lead não encontrado' });
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