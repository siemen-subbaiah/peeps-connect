import Image from 'next/image';
import Seo from '../components/Seo';
import logo from '../public/images/logo1.png';
import strapi from '../public/images/strapi.png';

const AboutPage = () => {
  return (
    <>
      <Seo title='About' />
      <div className='my-5 container mx-auto md:px-20 px-5'>
        <h1 className='md:text-3xl text-4xl'>About</h1>

        <div className='grid md:my-20 my-10 md:grid-cols-2  items-center gap-10'>
          <Image src={logo} placeholder='blur' alt='next.js-logo' />
          <div>
            <h1 className='text-3xl my-5'>Frontend - Next.js</h1>
            <p>
              Next.js gives you the best developer experience with all the
              features you need for production.
            </p>
          </div>
        </div>

        <div className='grid md:my-20 my-10 md:grid-cols-2 items-center gap-10'>
          <div className='order-2 md:order-1'>
            <h1 className='text-3xl my-5'>Backend - Strapi</h1>
            <p>
              Strapi is the leading open-source headless CMS. It’s 100%
              JavaScript, fully customizable and developer-first.
            </p>
          </div>
          <div className='order-1 md:order-2'>
            <Image src={strapi} placeholder='blur' alt='next.js-logo' />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
