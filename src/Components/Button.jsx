import React from 'react'

const Button = ({label, className, onClick}) => {
  return (
    <button onClick={onClick} className={`bg-light-btn font-bold py-2 px-2 xs:px-4 rounded-md shadow active:scale-98 active:bg-light-btn/90 cursor-pointer hover:shadow-2xl ${className}`}>
      {label}
    </button>
  )
}

export default Button