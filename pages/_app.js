import '../styles/globals.css';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // Renderize o layout somente para páginas autenticadas
  if (router.pathname === '/login' || router.pathname === '/register') {
    return <Component {...pageProps} />;
  }

  return <Component {...pageProps} />;
}

export default MyApp; 