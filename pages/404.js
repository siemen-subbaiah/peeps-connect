import Image from 'next/image';
import Link from 'next/link';
import Seo from '../components/Seo';
import NotFimage from '../public/images/404.svg';

const NotFoundPage = () => {
  return (
    <>
      <Seo title='Not Found' />
      <div className='text-center my-3'>
        <Image
          src={NotFimage}
          blurDataURL={NotFimage}
          alt='Not found'
          placeholder='blur'
          className='my-4'
        />
        <h3 className='text-2xl my-4'>Ohh! Page Not Found</h3>
        <p className='my-4'>
          We can't seem to find the page you're looking for
        </p>
        <Link href='/'>
          <a className='underline text-primary'>Back Home</a>
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
