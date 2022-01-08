import Head from 'next/head';

const Seo = ({ title }) => {
  return (
    <Head>
      <title>{title} | PeepsConnect</title>
      {/* <meta
          name='description'
          content={description || 'Peepsconnect is a webapp which is similar to twitter '}
        /> */}
    </Head>
  );
};

export default Seo;
