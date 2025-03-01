import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Por favor, forneça um nome para o lead'],
    maxlength: [100, 'Nome não pode ter mais de 100 caracteres'],
  },
  email: {
    type: String,
    required: [true, 'Por favor, forneça um email para o lead'],
    match: [/^\S+@\S+\.\S+$/, 'Por favor, forneça um email válido'],
  },
  telefone: {
    type: String,
    required: false,
  },
  origem: {
    type: String,
    enum: ['Site', 'Indicação', 'Redes Sociais', 'Google', 'Outro'],
    default: 'Outro',
  },
  status: {
    type: String,
    enum: ['Novo', 'Contatado', 'Em Negociação', 'Convertido', 'Perdido'],
    default: 'Novo',
  },
  observacoes: String,
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema); 