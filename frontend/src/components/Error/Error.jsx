import React from 'react'

const  Error = ({errorMassage} ) =>  {
  return (
    <div className=' flex item-center justify-center w-full h-full'>
        <h2 className='text-color-#fff1 leading-4 font-semibold text-[20px]'>{errorMassage}</h2>
    </div>
  )
}

export default Error 