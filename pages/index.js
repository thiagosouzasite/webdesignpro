import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para o dashboard quando o usuário acessa a página principal
    router.push('/dashboard');
  }, []);

  return (
    <div>
      <Head>
        <title>WebDesignPro - SaaS para Web Designers</title>
        <meta name="description" content="Sistema completo para gerenciamento de projetos de web design" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">WebDesignPro</h1>
          <p className="mt-3 text-gray-600">Redirecionando para o dashboard...</p>
          <div className="mt-5">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </div>
      </main>
    </div>
  );
} 