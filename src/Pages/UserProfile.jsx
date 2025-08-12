import React from 'react'
import { useSelector } from 'react-redux'
import { CartItem } from '../Components'
import { auth } from '../Firebase/Firebase'

const UserProfile = () => {

    const handleLogout = async () => {
        await auth.signOut();
        window.location.reload();
    }
  const user = useSelector((state) => state.user.userInfo)
  return (
    <div className='px-10 md:px-20 lg:px-30 xl:px-40 py-6 flex flex-col gap-6'>
        <h2 className='text-3xl font-semibold text-black/70'>My Profile</h2>
        <div className='flex items-center gap-4 py-4 rounded-md'>
            <img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" alt="" className='w-35 h-35 rounded-full'/>
            <div className='flex flex-col '>
                <h3 className='text-xl font-semibold text-black/70 capitalize'>{user.username}</h3>
                <p className='text-light-text'>{user.email}</p>
                <p className='text-light-text'>Joined on: January 1, 2023</p>
            </div>
            <div className='flex items-center gap-2 ml-auto'>
                <button onClick={handleLogout} className='bg-light-text text-white px-4 py-2 rounded-md cursor-pointer hover:shadow-md'>Log out</button>
            </div>
        </div>
        <div id='cart' className=' py-5 min-h-50 rounded-lg'>
            <h4 className='text-2xl text-light-text font-semibold mb-5'>Shopping Cart </h4>
            <div className='flex flex-col gap-4 py-4'>
                {user.cart?.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default UserProfile