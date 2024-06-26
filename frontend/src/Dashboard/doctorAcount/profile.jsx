import { useState , useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "./../../utils/uploud.cloudinery.js";
import { BASE_URL, token } from "./../../../config.js";
import { toast } from "react-toastify";

export default function Profile({ data }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: "",
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });


  const [previewURL, setPreviewURL] = useState('');

  

   useEffect (()=> {
    setFormData({
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      password: data?.password,
      bio:  data?.bio,
      gender:data?.gender ,
      specialization: data?.specialization,
      ticketPrice: data?.ticketPrice,
      qualifications: data?.qualifications,
      experiences: data?.experiences,
      timeSlots: data?.timeSlots,
      about: data?.about,
      photo: data?.photo,
    })
   } , [data])



  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setPreviewURL(data.url)

    setFormData({ ...formData, photo: data?.photo });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/doctors/${data._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      } else {
        toast.success(result.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const handleReusableInputChange = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updatedItems = [...prevFormData[key]];
      updatedItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updatedItems,
      };
    });
  };

  const addQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const handleQualificationChanges = (event, index) => {
    handleReusableInputChange("qualifications", index, event);
  };

  const handleExperienceChanges = (event, index) => {
    handleReusableInputChange("experiences", index, event);
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            value={formData.name}
            name="name"
            placeholder="Full Name"
            onChange={handleInputChange}
            className="form__input"
          />
        </div>

        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleInputChange}
            className="form__input"
          />
        </div>

        <div className="mb-5">
          <p className="form__label">Phone Number*</p>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="Phone Number"
            onChange={handleInputChange}
            className="form__input"
          />
        </div>

        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            placeholder="Bio"
            onChange={handleInputChange}
            className="form__input"
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 mb-[30px] gap-5">
            <div>
              <p className="form__label">Gender</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <p className="form__label">specialization*</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">select</option>
                <option value="Surgeon">Surgeon</option>
                <option value="Neurology">Neurology</option>
                <option value="Burn Treatment">Burn Treatment</option>
              </select>
            </div>

            <div>
              <p className="form__label">Ticket Price</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                className="form__input py-3.5"
                onChange={handleInputChange}
                value={formData.ticketPrice}
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="label__from mb-4">Qualifications</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 mb-[30px] gap-5">
                <div>
                  <p className="form__label">Starting date*</p>
                  <input
                    type="date"
                    onChange={(e) => handleQualificationChanges(e, index)}
                    name="startingDate"
                    value={item.startingDate}
                    className="form__input"
                  />
                </div>

                <div>
                  <p className="form__label">Ending date*</p>
                  <input
                    type="date"
                    name="endingDate"
                    onChange={(e) => handleQualificationChanges(e, index)}
                    value={item.endingDate}
                    className="form__input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 mb-[30px] gap-5">
                <div>
                  <p className="form__label">Degree*</p>
                  <input
                    type="text"
                    onChange={(e) => handleQualificationChanges(e, index)}
                    name="degree"
                    value={item.degree}
                    className="form__input"
                  />
                </div>

                <div>
                  <p className="form__label">University</p>
                  <input
                    type="text"
                    onChange={(e) => handleQualificationChanges(e, index)}
                    name="university"
                    value={item.university}
                    className="form__input"
                  />
                </div>
              </div>
              <button
                onClick={(e) => deleteQualification(e, index)}
                className="bg-red-600 rounded-full p-2 text-white cursor-pointer text-[16px]"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            onClick={addQualification}
            className="my-3 bg-black text-white text-[19px] py-2 px-5 rounded h-fit"
          >
            Add Qualifications
          </button>
        </div>

        <div className="mb-5">
          <p className="label__from mb-4">Experiences</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 mb-[30px] gap-5">
                <div>
                  <p className="form__label">Starting date*</p>
                  <input
                    type="date"
                    name="startingDate"
                    value={item.startingDate}
                    onChange={(e) => handleExperienceChanges(e, index)}
                    className="form__input"
                  />
                </div>

                <div>
                  <p className="form__label">Ending date*</p>
                  <input
                    type="date"
                    name="endingDate"
                    value={item.endingDate}
                    onChange={(e) => handleExperienceChanges(e, index)}
                    className="form__input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 mb-[30px] gap-5">
                <div>
                  <p className="form__label">Position*</p>
                  <input
                    type="text"
                    name="position"
                    value={item.position}
                    onChange={(e) => handleExperienceChanges(e, index)}
                    className="form__input"
                  />
                </div>

                <div>
                  <p className="form__label">Hospital*</p>
                  <input
                    type="text"
                    name="hospital"
                    value={item.hospital}
                    onChange={(e) => handleExperienceChanges(e, index)}
                    className="form__input"
                  />
                </div>
              </div>

              <button
                onClick={(e) => deleteExperience(e, index)}
                className="bg-red-600 rounded-full p-2 text-white cursor-pointer text-[16px]"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="my-3 bg-black text-white text-[19px] py-2 px-5 rounded h-fit"
          >
            Add Experiences
          </button>
        </div>

        <div className="mb-5">
          <p className="label__from mb-4">Time Slots</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                <div>
                  <p className="form__label">Day</p>
                  <select
                    name="day"
                    value={item.day}
                    onChange={(e) =>
                      handleReusableInputChange("timeSlots", index, e)
                    }
                    className="form__input py-3.5"
                  >
                    <option value="">select</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
                </div>

                <div>
                  <p className="form__label">Starting Time*</p>
                  <input
                    type="time"
                    onChange={(e) =>
                      handleReusableInputChange("timeSlots", index, e)
                    }
                    name="startingTime"
                    value={item.startingTime}
                    className="form__input"
                  />
                </div>

                <div>
                  <p className="form__label">Ending Time*</p>
                  <input
                    type="time"
                    name="endingTime"
                    value={item.endingTime}
                    onChange={(e) =>
                      handleReusableInputChange("timeSlots", index, e)
                    }
                    className="form__input"
                  />
                </div>

                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteItem("timeSlots", index);
                    }}
                    className="bg-red-600 rounded-full p-2 text-white cursor-pointer text-[16px] mt-5"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem("timeSlots", {
                day: "",
                startingTime: "",
                endingTime: "",
              });
            }}
            className="my-3 bg-black text-white text-[19px] py-2 px-5 rounded h-fit"
          >
            Add Time Slots
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">About</p>
          <textarea
            name="about"
            placeholder="write about eny thing "
            rows={3}
            onChange={handleInputChange}
            value={formData.about}
            className="form__input"
          />
        </div>
        <div className='mb-5 flex items-center gap-3'>
            {formData.photo && (
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-border-primaryColor flex items-center justify-center">
                  <img src={previewURL} 
                  alt="" 
                  className="w-full rounded-full" />
                </figure>
                           )}
              <div className='relative w-[130px] h-[50px]'>
                <input 
                 type="file"
                 name="photo" 
                 id="customFile"
                 onChange={handleFileInputChange}
                 accept='.jpg, .png'
                 className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                />
                <label 
                 htmlFor="customFile"
                 className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem]
                 text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'
                >
                  Upload Photo
                </label>
              </div>
            </div>

        <button
          onClick={updateProfileHandler}
          className="bg-primaryColor py-3 px-4 text-white rounded-lg mt-5"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
