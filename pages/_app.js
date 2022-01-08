import NextNprogress from 'nextjs-progressbar';
import Layout from '../components/Layout';
import AuthState from '../context/AuthState';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress color='#000000' height={2} />
      <AuthState>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthState>
    </>
  );
}

export default MyApp;
