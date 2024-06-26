import DoctorCard from "./../../components/Doctors/DoctorCard";
import { doctors } from "./../../assets/data/doctors";
import Testimonial from "../../components/Testimonial/Testimonial";
import { BASE_URL } from "../../../config";
import useFetchData from "../../hooks/useFeatchDate";
import Loader from "./../../components/loader/loading";
import Error from "./../../components/Error/Error";
import { useEffect, useState } from "react";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery , setDebounceQuery ] = useState("")

   const  handleSearch = () => {
    query.trim()
    console.log("handle sss ")
   }
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors?query = ${debounceQuery}`);
    
  useEffect(()=> {
     const timeOut = setTimeout(()=>  { setDebounceQuery(query)},700)
     return  ()=> clearTimeout(timeOut)
  },[query])

  return (
    <>
      {/* Search Section */}
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find A Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              placeholder="Search Doctor by name "
              value={query}
              onChange={e=> setQuery(e.target.value)}
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
            />
            <button  onClick={handleSearch} className="btn mt-0 rounded-[0px] rounded-r-md">
              Search
            </button>
          </div>
        </div>
      </section>
      {/* Doctors Section */}
      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && doctors && Array.isArray(doctors) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Testimonials Section */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What Our Patients Say</h2>
            <p className="text__para text-center">
              World-Class Care For Everyone. Our Health System Offers Unmatched,
              Expert Health Care.
            </p>
          </div>

          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
