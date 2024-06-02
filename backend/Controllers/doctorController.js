import Doctor from "../models/DoctorSchema.js"; // Import the Doctor model
import Booking from './../models/BookingSchema.js'

export const updateDoctor = async (req, res) => {
  // Rename the function to updateDoctor
  const id = req.params.id;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      // Use the Doctor model
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor, // Use updatedDoctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update!",
      data: error,
    });
  }
};

export const deleteDoctor = async (req, res) => {
  // Rename the function to deleteDoctor
  const id = req.params.id;

  try {
    await Doctor.findByIdAndDelete(id); // Use the Doctor model

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete!",
      data: error,
    });
  }
};

export const getSingleDoctor = async (req, res) => {
  // Rename the function to getSingleDoctor
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password"); // Use the Doctor model

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "No Doctor Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor Found",
      data: doctor, // Use doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctor!",
      data: error,
    });
  }
};

export const getAllDoctor = async (req, res) => {
  // Rename the function to getAllDoctors
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      ); // Use the Doctor model
    }

    res.status(200).json({
      success: true,
      message: "Doctors Found",
      data: doctors, // Use doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctors!",
      data: error.message,
    });
  }
};


// export const getdoctorProfile =   async (req, res) => {
//   const doctorId = req.userId;
  
//   try {
//     console.log(req.userId)
//     const doctor = await Doctor.findById({_id : doctorId});
//     if (!doctor) {
//       return res.status(404).json({ success: false, message: "doctor not found" });
//     }
//     console.log(doctor.doc)
//     const { password, ...rest } = doctor.doc;
//     const appointments = await Booking.find({doctor : doctorId})
//     console.log(...rest)
//     res.status(200).json({
//       success: true,
//       message: "Profile info is getting",
//       data: { ...rest , appointments },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Something went wrong, cannot get" });
//   }
// } 


// export const getdoctorProfile = async (req, res) => {
//   const _id = req.body 

//   console.log(req.userId)
//   try {
//     // console.log(req)
//     // console.log(`Doctor ID: ${doctorId}`);

//     // Find the doctor by ID
//     const doctor = await Doctor.findOne({_id});
//     if (!doctor) {
//       return res.status(404).json({ success: false, message: "Doctor not found" });
//     }
//     return res.json({message : 'done ' , doctor})

//     // Retrieve appointments for the doctor
//     // const appointments = await Booking.find({ doctor: doctorId });

//     // res.status(200).json({
//     //   success: true,
//     //   message: "Profile info retrieved successfully",
//     //   data: { doctor, appointments },
//     // });
//   } catch (err) {
//     console.error(`Error retrieving doctor profile: ${err.message}`);
//     res.status(500).json({ success: false, message: "Something went wrong, cannot retrieve profile" });
//   }
// };



export const getdoctorProfile = async (req, res) => {
  const doctorId = req.userId;  // Assuming `userId` is set by some authentication middleware

  if (!doctorId) {
    return res.status(400).json({ success: false, message: "doctorId is required" });
  }

  try {
    // console.log(req.userId);
    const doctor = await Doctor.findById(doctorId);
    
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const { password, ...rest } = doctor.toObject();  // toObject to strip Mongoose metadata
    const appointments = await Booking.find({ doctor: doctorId });

    res.status(200).json({
      success: true,
      message: "Profile info is retrieved",
      data: { ...rest, appointments },
    });
  } catch (err) {
    console.error(err);  // Log the error for debugging purposes
    res.status(500).json({ success: false, message: "Something went wrong, cannot get profile info" });
  }
};
