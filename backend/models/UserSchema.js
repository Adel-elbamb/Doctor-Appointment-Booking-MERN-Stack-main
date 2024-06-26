import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  name: {
     type: String, 
     required: true 
  },
  phone: { 
    type: Number 
  },
  photo: { 
    type: String 
  },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  gender: { type: String, enum: ["male", "female"] },
  bloodType: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});


// UserSchema.pre(/^find/, function (next) {
//   this.populate('appointments')
//       .populate('bookings');

//   next();
// });


export default mongoose.model("User", UserSchema);