const Avatar = ({ letter }) => {
  return (
    <div className='h-10 rounded-full w-10 bg-primary text-white text-lg flex justify-center items-center'>
      {letter}
    </div>
  );
};

export default Avatar;
