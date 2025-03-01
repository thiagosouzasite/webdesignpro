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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>WebDesignPro - SaaS para Web Designers</title>
        <meta name="description" content="Sistema completo para gerenciamento de projetos de web design" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Bem-vindo ao <span className="text-blue-600">WebDesignPro</span>
        </h1>
        <p className="mt-3 text-2xl">
          Sistema para gerenciamento de Web Designers
        </p>
      </main>
    </div>
  );
} 