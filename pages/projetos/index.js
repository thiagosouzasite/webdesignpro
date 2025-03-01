import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { PlusIcon } from '@heroicons/react/solid';
import Layout from '../../components/Layout';

export default function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await axios.get('/api/projetos');
        setProjetos(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao carregar projetos');
        setLoading(false);
      }
    };

    fetchProjetos();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Orçamento':
        return 'bg-gray-100 text-gray-800';
      case 'Aprovado':
        return 'bg-blue-100 text-blue-800';
      case 'Em Andamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="Projetos | WebDesignPro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Projetos</h1>
          <Link href="/projetos/cadastrar">
            <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Novo Projeto
            </a>
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {projetos.length === 0 ? (
              <div className="px-4 py-5 text-center text-gray-500">
                Nenhum projeto encontrado. Comece adicionando um novo.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {projetos.map((projeto) => (
                  <li key={projeto._id}>
                    <Link href={`/projetos/${projeto._id}`}>
                      <a className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div>
                                <p className="text-sm font-medium text-blue-600 truncate">{projeto.titulo}</p>
                                <p className="text-sm text-gray-500">{projeto.cliente?.nome || 'Cliente não encontrado'}</p>
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(projeto.status)}`}>
                                {projeto.status}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              {projeto.dataInicio && (
                                <p className="flex items-center text-sm text-gray-500">
                                  Início: {new Date(projeto.dataInicio).toLocaleDateString('pt-BR')}
                                </p>
                              )}
                              {projeto.dataFim && (
                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                  Término: {new Date(projeto.dataFim).toLocaleDateString('pt-BR')}
                                </p>
                              )}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <p>
                                Valor: R$ {projeto.valorTotal?.toLocaleString('pt-BR') || '0,00'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
} 