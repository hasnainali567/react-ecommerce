import React from 'react'

const UpdateProduct = ({order, modalOpen, setModalOpen, handleUpdate }) => {

    const [status, setStatus] = React.useState(order.status);
    
    return (
        <div
            onClick={() => setModalOpen(false)}
            className={`${modalOpen ? "block" : "hidden"
                } w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-black/50 backdrop-blur-md px-5 overflow-hidden`}
        >
            <div onClick={(e) => e.stopPropagation()} className='bg-light-primary layout-content-container flex flex-col max-w-[512px] p-3  rounded-lg flex-1 shadow-md shadow-dark-secondary'>
                <div className='py-3 px-1'>
                    <p className='text-white tracking-light text-lg font-semibold leading-tight min-w-72 pb-4 '>Update Order </p>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full  px-3 py-2 bg-[#2a273a] text-white text-sm font-medium leading-normal rounded-lg">
                        <option value="Preparing" className="bg-[#2a273a] text-white pr-2">Preparing</option>
                        <option value="Pending" className="bg-[#2a273a] text-white pr-2">Pending</option>
                        <option value="Paid" className="bg-[#2a273a] text-white pr-3">Paid</option>
                        <option value="Shipped" className="bg-[#2a273a] text-white pr-2">Shipped</option>
                        <option value="Delivered" className="bg-[#2a273a] text-white pr-2">Delivered</option>
                        <option value="Cancelled" className="bg-[#2a273a] text-white pr-2">Cancelled</option>

                    </select>
                    <button onClick={() => handleUpdate(status)} className='mt-4 w-full h-10 bg-[#2a273a] text-white text-sm font-medium leading-normal rounded-lg cursor-pointer active:bg-dark-secondary active:text-dark-text hover:bg-dark-text hover:text-light-secondary  ease-in transition-all duration-200  '>
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct