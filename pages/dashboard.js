import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChartPieIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ClipboardCheckIcon
} from '@heroicons/react/outline';
import Layout from '../components/Layout';

export default function Dashboard() {
  const [stats, setStats] = useState({
    leadCount: 0,
    clientCount: 0,
    projectCount: 0,
    quoteCount: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Em um cenário real, você buscaria esses dados de uma API
        // Aqui estamos apenas simulando para demonstração
        // const response = await axios.get('/api/dashboard/stats');
        // setStats(response.data);
        
        // Simulando dados para exemplo
        setTimeout(() => {
          setStats({
            leadCount: 24,
            clientCount: 8,
            projectCount: 12,
            quoteCount: 18,
            totalRevenue: 42500
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    { 
      title: 'Leads', 
      value: stats.leadCount, 
      icon: UsersIcon, 
      color: 'bg-blue-500', 
      link: '/leads' 
    },
    { 
      title: 'Clientes', 
      value: stats.clientCount, 
      icon: ChartPieIcon, 
      color: 'bg-green-500', 
      link: '/clientes' 
    },
    { 
      title: 'Projetos', 
      value: stats.projectCount, 
      icon: ClipboardCheckIcon, 
      color: 'bg-purple-500', 
      link: '/projetos' 
    },
    { 
      title: 'Orçamentos', 
      value: stats.quoteCount, 
      icon: CurrencyDollarIcon, 
      color: 'bg-yellow-500', 
      link: '/orcamentos' 
    },
  ];

  return (
    <Layout title="Dashboard | WebDesignPro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className={`rounded-md p-3 ${card.color}`}>
                        <card.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {card.title}
                          </dt>
                          <dd>
                            <div className="text-lg font-bold text-gray-900">
                              {card.value}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <a
                        href={card.link}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Ver detalhes
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Resumo financeiro
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Receita total e valores de projetos ativos
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="text-3xl font-bold text-green-600">
                  R$ {stats.totalRevenue.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm text-gray-500">Receita Total</div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
} 