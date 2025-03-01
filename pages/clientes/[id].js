import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { 
  PencilIcon, 
  TrashIcon, 
  DocumentTextIcon,
  BriefcaseIcon 
} from '@heroicons/react/outline';
import Layout from '../../components/Layout';

export default function DetalhesDeCliente() {
  const router = useRouter();
  const { id } = router.query;
  const [cliente, setCliente] = useState(null);
  const [projetos, setProjetos] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchCliente();
    }
  }, [id]);

  const fetchCliente = async () => {
    try {
      const response = await axios.get(`/api/clientes/${id}`);
      setCliente(response.data.data);
      
      // Em um sistema real, buscaríamos projetos e orçamentos relacionados
      // aqui estamos apenas simulando
      // const projetosResponse = await axios.get(`/api/projetos?cliente=${id}`);
      // setProjetos(projetosResponse.data.data);
      
      // const orcamentosResponse = await axios.get(`/api/orcamentos?cliente=${id}`);
      // setOrcamentos(orcamentosResponse.data.data);
      
      setLoading(false);
    } catch (error) {
      setError('Erro ao carregar informações do cliente');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await axios.delete(`/api/clientes/${id}`);
        router.push('/clientes');
      } catch (error) {
        setError('Erro ao excluir cliente');
      }
    }
  };

  const handleCreateProject = () => {
    router.push(`/projetos/cadastrar?clienteId=${id}`);
  };

  const handleCreateQuote = () => {
    router.push(`/orcamentos/cadastrar?clienteId=${id}`);
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

  if (!cliente) {
    return (
      <Layout title="Cliente não encontrado">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Cliente não encontrado
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${cliente.nome} | WebDesignPro`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-800">{cliente.nome}</h1>
            {cliente.empresa && (
              <p className="text-sm text-gray-500">{cliente.empresa}</p>
            )}
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
            <button
              type="button"
              onClick={handleCreateProject}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              <BriefcaseIcon className="-ml-1 mr-2 h-5 w-5" />
              Novo Projeto
            </button>
            <button
              type="button"
              onClick={handleCreateQuote}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <DocumentTextIcon className="-ml-1 mr-2 h-5 w-5" />
              Novo Orçamento
            </button>
            <Link href={`/clientes/editar/${id}`}>
              <a className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                Editar
              </a>
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <TrashIcon className="-ml-1 mr-2 h-5 w-5" />
              Excluir
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Informações do Cliente</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Detalhes completos do contato.</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Nome completo</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cliente.nome}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cliente.email}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Telefone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cliente.telefone}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Empresa</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {cliente.empresa || 'Não informado'}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">CNPJ</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {cliente.cnpj || 'Não informado'}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Endereço</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {cliente.endereco || 'Não informado'}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Data de cadastro</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(cliente.dataCriacao).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </dd>
              </div>
              {cliente.lead && (
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Origem</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <Link href={`/leads/${cliente.lead._id}`}>
                      <a className="text-blue-600 hover:text-blue-800">
                        Lead: {cliente.lead.nome}
                      </a>
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Seção de Projetos */}
        <div className="mt-8">
          <div className="md:flex md:items-center md:justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Projetos</h2>
            <button
              onClick={handleCreateProject}
              className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Novo Projeto
            </button>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {projetos.length === 0 ? (
              <div className="px-4 py-5 text-center text-gray-500">
                Nenhum projeto encontrado para este cliente.
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
                              <div className="ml-3">
                                <p className="text-sm font-medium text-blue-600 truncate">{projeto.titulo}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                  Status: <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${projeto.status === 'Concluído' ? 'green' : 'blue'}-100 text-${projeto.status === 'Concluído' ? 'green' : 'blue'}-800`}>{projeto.status}</span>
                                </p>
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="text-sm text-gray-500">
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
        </div>

        {/* Seção de Orçamentos */}
        <div className="mt-8">
          <div className="md:flex md:items-center md:justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Orçamentos</h2>
            <button
              onClick={handleCreateQuote}
              className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Novo Orçamento
            </button>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {orcamentos.length === 0 ? (
              <div className="px-4 py-5 text-center text-gray-500">
                Nenhum orçamento encontrado para este cliente.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {orcamentos.map((orcamento) => (
                  <li key={orcamento._id}>
                    <Link href={`/orcamentos/${orcamento._id}`}>
                      <a className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-sm font-medium text-blue-600 truncate">{orcamento.titulo}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                  Status: <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${orcamento.status === 'Aprovado' ? 'green' : orcamento.status === 'Recusado' ? 'red' : 'blue'}-100 text-${orcamento.status === 'Aprovado' ? 'green' : orcamento.status === 'Recusado' ? 'red' : 'blue'}-800`}>{orcamento.status}</span>
                                </p>
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="text-sm text-gray-500">
                                Valor: R$ {orcamento.valorTotal?.toLocaleString('pt-BR') || '0,00'}
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
        </div>
      </div>
    </Layout>
  );
} 