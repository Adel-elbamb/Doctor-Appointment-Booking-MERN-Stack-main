// import React from 'react'
// import fromatData from './../../utils/formatDate'
// function Appiontments( {appointments}) {
//      console.log(appointments)
//   return (

//   // <div>adel</div>
//   <div>
//     {/* <h1>adeddeddded</h1> */}
//         <table className="w-full text-left text-sm text-gray-500">
//   <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//   </thead>
//   <tbody>
//     {appointments?.map((item) => (
//       <tr key={item._id}>
//         <th
//           scope="row"
//           className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
//         >
//           <img
//             src={item.user.photo}
//             className="w-10 h-10 rounded-full"
//             alt=""
//           />
//           <div className="pl-3">
//             <div className="text-base font-semibold">{item.user.name}  </div>
//             <div className="text-normal text-gray-500">
//               {item.user.email}
//             </div>
//           </div>
//         </th>
//          <td className='px-4 py-6'> {item.user.gender} </td>
//          <td className='px-4 py-6'> {item.ispaid && (
//           <div className='flex item-center'>
//             <div className='h-2.5 w-2.5 bg-green-400 rounded-full mr-s'></div>
//             paid
//           </div>
//          )}
         
         
//          {!item.ispaid && (
//           <div className='flex item-center'>
//             <div className='h-2.5 w-2.5 bg-red-400 rounded-full mr-s'></div>
//             unpaid
//           </div>
//          )}</td>
//          <td className='px-4 py-6'> {item.ticketPrice } </td>
//          <td className='px-4 py-6'> {fromatData(createAt)} </td>



//       </tr>
//     ))}
//   </tbody>
// </table>
//   </div>
//   )
// }

// export default Appiontments






import React from 'react';
import {formatDate} from './../../utils/formatDate';

function Appointments({ appointments }) {
  console.log(appointments);
  return (
    <div>
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">Gender</th>
            <th className="px-6 py-3">Payment Status</th>
            <th className="px-6 py-3">Ticket Price</th>
            <th className="px-6 py-3">Created At</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((item) => (
            <tr key={item._id}>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
              >
                <img
                  src={item.user.photo}
                  className="w-10 h-10 rounded-full"
                  alt={`${item.user.name}`}
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {item.user.name}
                  </div>
                  <div className="text-normal text-gray-500">
                    {item.user.email}
                  </div>
                </div>
              </th>
              <td className="px-4 py-6">{item.user.gender}</td>
              <td className="px-4 py-6">
                {item.isPaid ? (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 bg-green-400 rounded-full mr-1"></div>
                    Paid
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 bg-red-400 rounded-full mr-1"></div>
                    Unpaid
                  </div>
                )}
              </td>
              <td className="px-4 py-6">{item.ticketPrice}</td>
              <td className="px-4 py-6">{formatDate(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
