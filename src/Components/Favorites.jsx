
import React, { useMemo } from 'react'
import { FaHeart, FaPercent } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { addToFavorites } from './Features/UserSlice';
import { message } from 'antd';

const Favorites = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const sortedFav = useMemo(() => {
    if (!user || !user.favorites) return [];
    return [...user.favorites].sort((a, b) => b.addedAt - a.addedAt);
  }, [user]);

  const offPercent = (item) => item.onSale ? Math.round(((item.price - item.discountedPrice) / item.price) * 100) : 0;


  if (!user || !user.favorites || user.favorites.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-64'>
        <p className='text-white'>No favorites added yet.</p>
      </div>
    );
  }

  const handleRemoveFavorite = async (favoriteItem) => {

    messageApi.open({
      type: "loading",
      content: "Removing from favorites...",
      duration: 0,
    });
    try {
      await dispatch(addToFavorites({ favoriteItem })).unwrap();
      messageApi.destroy();
      messageApi.success("Removed from favorites");
    } catch (error) {
      messageApi.destroy();
      messageApi.error("Failed to remove from favorites");
      console.error("Error removing from favorites:", error);
    }

  };

  

  return (
    <div className=''>
      {contextHolder}
      <h2 className='text-2xl font-medium'>Favorites</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   gap-4 mt-4'>
        {sortedFav.map((item) => (
          <div key={item.id}
            onClick={() => { navigate(`/products/${item.id}`) }}
            className='relative flex flex-col rounded-lg bg-dark-secondary cursor-pointer hover:shadow-md shadow-dark-secondary transition-shadow duration-300'>
            {item.onSale && (
              <span className='absolute top-2 left-2 z-10 flex items-center gap-2 bg-light-primary text-white p-2 rounded-md text-sm font-semilight'>
                <FaPercent size={20} className='text-light-primary p-1 bg-white rounded-sm' />
                <span>{offPercent(item)}% Off</span>
              </span>
            )}
            <img src={item.image} alt="" className='w-full h-48 object-cover rounded-t-md' />
            <div className='flex justify-between items-center p-2 gap-2'>
              <h3 className='text-base  text-nowrap overflow-ellipsis overflow-hidden'>{item.title} adadkak</h3>
              <button
                onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(item) }}
                className='p-2 shrink-0 bg-light-primary rounded-md cursor-pointer'>
                <FaHeart size={20} className='text-dark-text ' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites