import { useContext, useState } from 'react'
import Loading from './../../components/loader/loading'
import Error from './../../components/Error/Error'
import userProfileDate  from './../../hooks/useFeatchDate'
import { BASE_URL } from '../../../config'
import Taps from './Taps'




export default function Dashboard() {

  const [tap, setTap] = useState("overveiw")
  

  const {data , loading , error}= userProfileDate(`${BASE_URL}/doctors/profile/me`)

  return (
    
    // <> <h1>adelelleell</h1></>
    <section>
    <div className='max-w-[1170px] px-5 mx-auto'>
    {loading && <Loading/>} ,
    {error &&  ! loading && <Error/>}
     
    {!loading && !error && (<div className='grid lg:grid-cols-3  gap-[30px]  lg:gap-[50px]' >
       <Taps tap= {tap} setTap = {setTap}/>
       <div className='lg:col-span-2'> 
        {
          data.isApproved === "pending" &&
           (
           <div className='flex  p-4 mb-3 bg-yellow-200  '> 
           <i className='fas fa-ban'></i>
             </div>
        )
        }
       
       </div>
    </div>
  )}
  </div>
  </section>
  )
}


 

