import mongoose from 'mongoose';

const ProjetoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'Por favor, forneça um título para o projeto'],
    maxlength: [200, 'Título não pode ter mais de 200 caracteres'],
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: [true, 'Um projeto deve estar associado a um cliente'],
  },
  orcamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orcamento',
    required: false,
  },
  status: {
    type: String,
    enum: ['Orçamento', 'Aprovado', 'Em Andamento', 'Concluído', 'Cancelado'],
    default: 'Orçamento',
  },
  descricao: String,
  dataInicio: Date,
  dataFim: Date,
  produtos: [
    {
      produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto',
      },
      quantidade: {
        type: Number,
        default: 1,
      },
      valor: Number,
    },
  ],
  valorTotal: {
    type: Number,
    default: 0,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.models.Projeto || mongoose.model('Projeto', ProjetoSchema); 