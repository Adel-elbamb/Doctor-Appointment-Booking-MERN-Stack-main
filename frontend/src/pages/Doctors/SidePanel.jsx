
import convertTime from './../../utils/convertTime'
import {BASE_URL , token } from './../../../config'
import { toast } from 'react-toastify';

const SidePanel = ({doctorId , ticketPrice , timeSlots}) => {
   
    console.log(doctorId)

    const bookingHandler = async() => {
        try {
          const res = await fetch(`${BASE_URL}/booking/checkout-session/${doctorId}`, {
            method: 'post',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      
          const data = await res.json();
      
          if (!res.ok) {
            throw new Error(data.message + ' Please try again');
          }
      
          if (data.session.url) {
            window.location.href = data.session.url;
          }
      
        } catch (err) {
          toast.error(err.message);
        }
      }
      
  return (
    <div className='shadow p-3 lg:p-5 rounded-md'>
        <div className="flex items-center justify-between">
            <p className='text__para mt-0 font-semibold'>
                Ticket Price
            </p>
            <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
               {ticketPrice} Pound
            </span>
        </div>
        <div className='mt-[30px]'>
            <p className='text__para mt-0 font-semibold text-headingColor'>
                Available Time Slots:
            </p>
            <ul className='mt-3'>
             {timeSlots?.map((item , index) => (  <li  key={index} className='flex items-center justify-between mb-2'>
                   <p className='text-[15px] leading-6 text-textColor font-semibold'>
                       {item.day}
                   </p>
                   <p className='text-[15px] leading-6 text-textColor font-semibold'>
                       {convertTime(item.startingTime)} -  {" "} {convertTime(item.endingTime)}
                   </p>
               </li>)

                
             ) }
                {/* <li className='flex items-center justify-between mb-2'>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        Tuesday
                    </p>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        5:00 PM : 9:30 PM
                    </p>
                </li>
                <li className='flex items-center justify-between mb-2'>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        Friday
                    </p>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        5:00 PM : 9:30 PM
                    </p>
                </li> */}
            </ul>
        </div>
        <button onClick={bookingHandler} className='btn px-2 w-full rounded-md'>
            Booking 
        </button>
    </div>
  )
}

export default SidePanel