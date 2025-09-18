import React from 'react'
import * as motion from 'motion/react-client'
import { AnimatePresence } from 'framer-motion';
import Cart from './Cart';
import OrderHistory from './OrderHistory';
import Favorites from './Favorites';

const ProfileDivider = () => {

    const [active, setActive] = React.useState("Shopping Cart");
    const tabs = ['Shopping Cart', 'Order History', 'Favourites'];
  return (
    <div className='relative  w-full mb-4'>
        <ul className='relative flex gap-2 text-white border-b-1 border-dark-text xs:px-4'>
            {tabs.map((tab) => (
                <motion.li
                    key={tab}
                    initial={false}
                    animate={{ color: tab === active ? "#fff" : "#9E99B9" }}
                    onClick={() => setActive(tab)}
                    className={`relative cursor-pointer  p-2 py-3 xs:p-3 md:p-4 text-sm xs:text-md md:text-lg`}
                >
                    {tab}
                    {tab === active ? (
                        <motion.div
                            layoutId='underline'
                            className='absolute bottom-0 left-0 right-0 h-1 bg-white '
                            id='underline'
                        >
                        </motion.div>
                    ) : ( null )}
                </motion.li>
            ))}
        </ul>

        <div className='text-white'>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                >
                    {active === "Shopping Cart" && (
                        <div className='py-5 min-h-100'>
                            <Cart />
                        </div>
                    )}
                    {active === "Order History" && (
                        <div className='py-5 min-h-100'>
                            <OrderHistory />
                        </div>
                    )}
                    {active === "Favourites" && (
                        <div className='py-5 min-h-100'>
                            <Favorites />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
        
    </div>
  )
}

export default ProfileDivider