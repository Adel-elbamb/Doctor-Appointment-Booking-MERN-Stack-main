import React from 'react'
import useFeatchDate from './../../hooks/useFeatchDate'
import { BASE_URL } from '../../../config'
import Loading from './../../components/loader/loading'
import Error from './../../components/Error/Error'
import DoctorCard from './../../components/Doctors/DoctorCard'



export default function Bookings() {
  const { data: appointments, error, loading } = useFeatchDate(`${BASE_URL}/users/appiontments/my-appiontments`); // Fixed typo in URL
  console.log(appointments);
  
  return (
   <div>

      {loading && <Loading />}
      {error && !loading && <Error errorMessage={error} />}
      {!loading && !error && appointments && appointments.length > 0 && ( // Added null check for appointments
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          {appointments.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}

      {!loading && !error && (!appointments || appointments.length === 0) && (
        <h2 className='mt-5 text-headingColor leading-7  text-primaryColor text-sembold  '>You don't have any appointments yet</h2>
      )}


   </div>
  );
}