import React from 'react'
// import HashLoader from ''
import {HashLoader} from 'react-spinners'

export default function Loading() {
  return (
    <div className='flex item-center justify-center w-full h-full '>
        <HashLoader  color = "#26619c"/>
    </div>
  )
}
