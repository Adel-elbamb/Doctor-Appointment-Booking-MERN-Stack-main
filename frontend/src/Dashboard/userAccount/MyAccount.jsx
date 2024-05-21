import { useContext, useState } from 'react'
import { AuthContext } from './../../context/AuthContext'
import userImg from './../../assets/images/doctor-img01.png'
import Bookings from './Bookings'
import Profile from './Profile'
import Loading from './../../components/loader/loading'
import Error from './../../components/Error/Error'
// get user data 
import userProfileDate  from './../../hooks/useFeatchDate'
import { BASE_URL } from '../../../config'


function MyAccount () {
  const { dispatch } = useContext(AuthContext)
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const [tap, setTap] = useState('booking')
  const {data, loading , error}= userProfileDate(`${BASE_URL}/users/profile/me`)
  console.log(error , "Eroro")
  console.log(data , "userDate");

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
      {loading && <Loading/>} ,
        {/* {error && <Error errorMassage = {error}/>} */}
       
      {!loading && !error && (<div className='grid md:grid-cols-3 gap-10'>
        <div className='pb-[5@px] px-[30px] rounded-md'>
          {/* image style  */}
          <div className='flex items-center justify-center '>
            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
              <img
                src={userImg}
                alt=''
                className='w-full h-full rounded-full'
              />
            </figure>
          </div>
          {/* user data  */}
          <div className='text-center mt-4'>
            <h1 className='text-[18px] leading-[30px] text-headingColor font-bold'>
              Adel Elbamby
            </h1>
            <p className='text-textColor text-[14px] leading-6 font-medium'>
              adelelbamby@gmail.com
            </p>
            <p className='text-textColor text-[14px] leading-6 font-medium'>
              Blood :
              <span className='ml-2  text-heandlingColor text-[22px] leanding-8'>
                o-
              </span>
            </p>
          </div>

          {/* logout  */}
          <div className='mt-50px  md:mt-[100px]'>
            <button
              onClick={handleLogout}
              className='w-full rounded-lg bg-black   p-3 text-[16px] leading-7 text-white '
            >
              {' '}
              Logout{' '}
            </button>
            <button className='w-full  rounded-lg bg-red-600  mt-4  p-3 text-[16px] leading-7 text-white '>
              {' '}
              Delete Acount{' '}
            </button>
          </div>
        </div>

        {/* col 2 */}
        <div className='md:col-span-2 md:px-[30px]'>
          <button
            onClick={() => {
              setTap('booking')
            }}
            className={`  ${tap === 'booking' && 'bg-primaryColor  text-white font-normal p-4 mr-5 px-5 ' }p-4 mr-5 px-5 rounded-md text-handlingColor font-semibold text-[16px] border border-solid border-x-red-200
            leading-7`}
          >
            {' '}
            My-booking{' '}
          </button>

          <button onClick={()=> {setTap("settings")}}
            className={`${tap === 'settings' && 'bg-primaryColor text-white  leading-7  p-4  font-normal'}p-4 mr-5 px-5 rounded-md text-handlingColor font-semibold text-[16px] border border-solid border-x-red-200
            leading-7`}
          >
            {' '}
            Profile-setting{' '}
          </button>

          
        {
             tap == 'booking' && <Bookings/>
        }
        {
             tap == 'settings' && <Profile/>
        }
        </div>

        
      </div>)}
    </div>
    </section>
  )
}

export default MyAccount
