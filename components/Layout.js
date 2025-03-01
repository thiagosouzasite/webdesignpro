import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children, title = 'WebDesignPro' }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Sistema para gerenciamento de Web Designers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-20 pb-10 ml-0 md:ml-64 px-4">
          {children}
        </main>
      </div>
    </div>
  );
} 