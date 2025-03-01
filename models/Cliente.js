import mongoose from 'mongoose';

const ClienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Por favor, forneça um nome para o cliente'],
    maxlength: [100, 'Nome não pode ter mais de 100 caracteres'],
  },
  email: {
    type: String,
    required: [true, 'Por favor, forneça um email para o cliente'],
    match: [/^\S+@\S+\.\S+$/, 'Por favor, forneça um email válido'],
  },
  telefone: {
    type: String,
    required: false,
  },
  empresa: String,
  cnpj: String,
  endereco: String,
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: false,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Cliente || mongoose.model('Cliente', ClienteSchema); 