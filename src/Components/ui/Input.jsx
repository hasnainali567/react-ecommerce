import React from 'react'

const Input = ({ label, type, placeholder, ...rest }, ref) => {
  return (
    <div className='mb-4 flex flex-col items-center'>
      <label className='block text-md font-medium mb-2 self-start text-light-text'>{label}</label>
      <input type={type} className='bg-light-secondary text-light-text p-3 w-full rounded' placeholder={placeholder} {...rest} ref={ref} />
    </div>
  )
}

export default React.forwardRef(Input);