// 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { token } from './../../config';

const useFetchData = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

//  console.log(token)
  


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message);
        }
        // console.log(result)
        setData(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;



//  import React, { useEffect, useState } from 'react';
// import { token } from './../../config';

// const useFetchData = (url) => {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);

//       try {
//         const res = await fetch(url, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const errorResult = await res.json();
//         if (!res.ok) {
//           // Handle HTTP errors
          
//           throw new Error(errorResult.message || 'Something went wrong');
//         }

//         const result = await res.json();
//         console.log(result);
//         setData(result.data);
//         setLoading(false);
//         setError(null);
//       } catch (err) {
//         // setError(err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   return {
//     data,
//     loading,
//     error,
//   };
// };

// export default useFetchData;


