const mongoose = require('mongoose');

const OrcamentoSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
  },
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
  },
  titulo: {
    type: String,
    required: [true, 'Por favor informe o título do orçamento'],
    trim: true,
  },
  descricao: String,
  itens: [{
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produto',
      required: true
    },
    quantidade: {
      type: Number,
      required: true,
      default: 1
    },
    valorUnitario: {
      type: Number,
      required: true
    },
    desconto: {
      type: Number,
      default: 0
    }
  }],
  valorTotal: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Rascunho', 'Enviado', 'Aprovado', 'Recusado'],
    default: 'Rascunho'
  },
  validadeAte: Date,
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.models.Orcamento || mongoose.model('Orcamento', OrcamentoSchema); 