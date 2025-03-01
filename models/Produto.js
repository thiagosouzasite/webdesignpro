import mongoose from 'mongoose';

const ProdutoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Por favor, forneça um nome para o produto'],
    maxlength: [100, 'Nome não pode ter mais de 100 caracteres'],
  },
  descricao: String,
  categoria: {
    type: String,
    enum: ['Website', 'Landing Page', 'E-commerce', 'Banner', 'Logo', 'Outro'],
    default: 'Website',
  },
  horasEstimadas: {
    type: Number,
    required: [true, 'Por favor, forneça uma estimativa de horas'],
    min: [0, 'Horas estimadas não podem ser negativas'],
  },
  valorBase: {
    type: Number,
    required: [true, 'Por favor, forneça um valor base'],
    min: [0, 'Valor base não pode ser negativo'],
  },
  ativo: {
    type: Boolean,
    default: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.models.Produto || mongoose.model('Produto', ProdutoSchema); 