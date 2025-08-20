const LoadingCard = () => {
  return (
    <div className='border border-gray-200 rounded-lg shadow animate-pulse overflow-hidden'>
      <div className='w-full h-65 bg-gray-300 aspect-square'></div>
      <div className="p-2.5">
        <div className='mt-2 h-8 bg-gray-400 rounded'></div>
        <div className='mt-2 h-4 bg-gray-300 w-2/4 rounded'></div>
        <div className='mt-2 h-5 bg-gray-300 rounded'></div>
        <div className='mt-2 h-4 w-2/10 bg-gray-400 rounded'></div>
        <div className='mt-2 h-8  bg-gray-400 rounded'></div>
        <div className='mt-2 h-8  bg-gray-300 rounded'></div>
      </div>
    </div>
  );
};


export default LoadingCard;