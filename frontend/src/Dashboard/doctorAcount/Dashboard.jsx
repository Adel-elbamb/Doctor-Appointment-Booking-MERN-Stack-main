import { useContext, useState } from "react";
import Loading from "./../../components/loader/loading";
import Error from "./../../components/Error/Error";
import userProfileDate from "./../../hooks/useFeatchDate";
import { BASE_URL } from "../../../config";
import Taps from "./Taps";
import star_icon from "./../../assets/images/Star.png";
import DoctorAbout from "./../../pages/Doctors/DoctorAbout";
import Profile from './../../Dashboard/doctorAcount/profile'
import docImage from './../../assets/images/about.png'
import Appiontments from './appiontments'

export default function Dashboard() {
  const [tap, setTap] = useState("overveiw");

  const { data, loading, error } = userProfileDate(
    `${BASE_URL}/doctors/profile/me`
  );

  console.log(data);
  // console.log(data)
  return (
    // <> <h1>adelelleell</h1></>
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loading />} ,{error && !loading && <Error />}
        {!loading && !error && (
          <div className="grid lg:grid-cols-3  gap-[30px]  lg:gap-[50px]">
            <Taps tap={tap} setTap={setTap} />
            <div className="lg:col-span-2">
              {!data
                ? " "
                : data.isApproved === "pendin" && (
                    <div className="flex  p-4 mb-3 bg-yellow-50 text-yellow-800 ">
                      <span className="sr-only ">info</span>
                      <div>to get approvely please complete your profile .</div>
                    </div>
                  )}

              <div className="mt-8">
                {tap === "overveiw" && (
                  <div>
                    <div className="flex  align-center  gap-6 mb-8 max-w-[350px]">
                      <div className=" flex   align-center gap-4  mb-10">
                        <figure className=" max-w-[200px] max-h-[200px]">
                      {/* */}
                          <img src= {data?.photo}  alt=" " className="w-full" />
                        </figure>
                        {/* {data?.photo == null ? `${docImage} `: `${data?.photo}`  }  */}
                      </div> 
                      <div className="mt-9">
                        <span
                          className="bg-[#ccf0f3] text-irisBlueColor  py-2 px-1 lg:py-2 lg:px-4
                     text-[12px]   rounded-md lg:text-[20px] leading-4  text-center lg:leading-6 font-semibold"
                        >
                          {data?.specialization} 
                        </span>

                        <h3 className=" mt-4 leading-9 font-bold text-[#1d1d1e]  lg:text-[25px] ">
                          {data?.name}
                        </h3>

                        <div className=" flex   align-center gap-[6px] mt-2 text-[#001]">
                          <span className="text-[14px] leading-4 lg:leading-6 ">
                            <img src={star_icon} />
                          </span>
                          <span>{data?.averageRating}</span>
                          <span className="text-[14px] leading-4 lg:leading-6 ">
                            ({data?.totalRating})
                          </span>
                        </div>
                        <p className="text_para leading-6 text-[16px]  max-w-[200px]">
                          {data?.bio}
                        </p>
                      </div>

                      {/* <h3 className=" ">adel</h3> */}
                    </div>

                    <DoctorAbout
                      name={data?.name}
                      about={data?.about}
                      qualifications={data?.qualifications}
                      experiences={data?.experiences}
                    />
                  </div>
                )}

                {tap === "Appointments" && <Appiontments  appointments = {data.appointments}/>}
                {tap === "setting" &&  <Profile data = {data}/>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
