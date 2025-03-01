import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import Layout from '../../components/Layout';

export default function DetalhesDeProduto() {
  const router = useRouter();
  const { id } = router.query;
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchProduto();
    }
  }, [id]);

  const fetchProduto = async () => {
    try {
      const response = await axios.get(`/api/produtos/${id}`);
      setProduto(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Erro ao carregar informações do produto');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await axios.delete(`/api/produtos/${id}`);
        router.push('/produtos');
      } catch (error) {
        setError('Erro ao excluir produto');
      }
    }
  };

  const toggleStatus = async () => {
    try {
      const response = await axios.put(`/api/produtos/${id}`, {
        ...produto,
        ativo: !produto.ativo
      });
      setProduto(response.data.data);
    } catch (error) {
      setError('Erro ao alterar status do produto');
    }
  };

  if (loading) {
    return (
      <Layout title="Carregando...">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Erro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </Layout>
    );
  }

  if (!produto) {
    return (
      <Layout title="Produto não encontrado">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Produto não encontrado
          </div>
          <div className="mt-4">
            <Link href="/produtos">
              <a className="text-blue-600 hover:text-blue-800">
                ← Voltar para a lista de produtos
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${produto.nome} | WebDesignPro`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-800">
              {produto.nome}
              <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${produto.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {produto.ativo ? 'Ativo' : 'Inativo'}
              </span>
            </h1>
          </div>
          <div className="mt-4 md:mt-0 flex md:ml-4">
            <button
              onClick={toggleStatus}
              className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              {produto.ativo ? 'Desativar' : 'Ativar'}
            </button>
            <Link href={`/produtos/editar/${id}`}>
              <a className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <PencilIcon className="-ml-1 mr-2 h-5 w-5" />
                Editar
              </a>
            </Link>
            <button
              onClick={handleDelete}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <TrashIcon className="-ml-1 mr-2 h-5 w-5" />
              Excluir
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Detalhes do produto
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Categoria</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{produto.categoria}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Descrição</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {produto.descricao || 'Nenhuma descrição fornecida.'}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Horas Estimadas</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{produto.horasEstimadas}h</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Valor Base</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  R$ {produto.valorBase.toLocaleString('pt-BR')}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Data de criação</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(produto.dataCriacao).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
} 