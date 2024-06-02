
import React from "react";
import { BiMenu } from "react-icons/bi";
import { useContext, useState } from 'react'
import { AuthContext } from './../../context/AuthContext'



export default function Taps({ tap, setTap }) {

  const { dispatch } = useContext(AuthContext)
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }
  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div className="lg:flex hidden flex-col p-[30px] bg-white   shadow-md shadow-panelshadow item-center h-max rounded-md">
        <button
          onClick={()=>{
            setTap("overveiw")
          }}
          className={`${
            tap === "overveiw"
              ? "text-primaryColor bg-indigo-100"
              : "bg-transparent  text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>

        <button
          onClick={()=>{
            setTap("Appointments")
          }}
          className={`${
            tap === "Appointments"
              ? "text-primaryColor bg-indigo-100"
              : "bg-transparent  text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Appointments
        </button>

        <button
       onClick={()=>{
        setTap("setting")
      }}
          className={`${
            tap === "setting"
              ? "text-primaryColor bg-indigo-100"
              : "bg-transparent  text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Profile
        </button>



        {/*  logout  */}
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
    </div>
  );
}

