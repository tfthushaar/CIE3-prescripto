import validator from "validator";
import bycrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }

    // hashing user password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const useData = await userModel.findById(userId).select("-password");

    res.json({ success: true, user: useData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked;

    // checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    // Convert Mongoose document to plain object and ensure all fields are included
    let docDataPlain;
    if (docData.toObject) {
      docDataPlain = docData.toObject();
    } else {
      docDataPlain = JSON.parse(JSON.stringify(docData));
    }
    delete docDataPlain.slots_booked;
    // Keep _id but ensure all other fields are preserved
    
    // Ensure userData is also a plain object
    let userDataPlain;
    if (userData.toObject) {
      userDataPlain = userData.toObject();
    } else {
      userDataPlain = JSON.parse(JSON.stringify(userData));
    }

    const appointmentData = {
      userId,
      docId,
      userData: userDataPlain,
      docData: docDataPlain,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.json({ 
        success: false, 
        message: "User ID not found. Please login again." 
      });
    }

    const appointments = await appointmentModel.find({ userId }).sort({ date: -1 });

    if (!appointments || appointments.length === 0) {
      return res.json({ success: true, appointments: [] });
    }

    // Ensure all appointments have complete docData by populating missing fields from doctor model
    const appointmentsWithCompleteData = await Promise.all(
      appointments.map(async (appointment) => {
        // Convert to plain object if needed
        let appointmentObj = appointment.toObject ? appointment.toObject() : appointment;
        
        // Check if docData has all required fields, if not, fetch from doctor model
        const needsUpdate = !appointmentObj.docData || 
                            !appointmentObj.docData.address || 
                            !appointmentObj.docData.image ||
                            !appointmentObj.docData.name;
        
        if (needsUpdate) {
          try {
            const doctorData = await doctorModel.findById(appointmentObj.docId).select("-password -slots_booked");
            if (doctorData) {
              const doctorPlain = doctorData.toObject ? doctorData.toObject() : JSON.parse(JSON.stringify(doctorData));
              // Merge with existing docData, prioritizing stored data but filling missing fields
              appointmentObj.docData = {
                ...doctorPlain,
                ...(appointmentObj.docData || {}),
                _id: appointmentObj.docId,
              };
              delete appointmentObj.docData.slots_booked;
            }
          } catch (err) {
            console.log("Error fetching doctor data for appointment:", err);
          }
        }
        
        return appointmentObj;
      })
    );

    res.json({ success: true, appointments: appointmentsWithCompleteData });
  } catch (error) {
    console.log("Error fetching appointments:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    if (!appointmentId) {
      return res.json({ success: false, message: "Appointment ID is required" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Check if already cancelled
    if (appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment is already cancelled" });
    }

    // Check if already completed
    if (appointmentData.isCompleted) {
      return res.json({ success: false, message: "Cannot cancel a completed appointment" });
    }

    // verify appointment user - convert both to strings for comparison
    const appointmentUserId = appointmentData.userId.toString();
    const requestUserId = userId.toString();
    
    if (appointmentUserId !== requestUserId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;

    if (docId && slotDate && slotTime) {
      try {
        const doctorData = await doctorModel.findById(docId);

        if (doctorData && doctorData.slots_booked) {
          let slots_booked = doctorData.slots_booked || {};

          // Check if slotDate exists in slots_booked and is an array
          if (slots_booked[slotDate] && Array.isArray(slots_booked[slotDate])) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(
              (e) => e !== slotTime
            );
          }

          await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        }
      } catch (slotError) {
        console.log("Error releasing doctor slot:", slotError);
        // Continue even if slot release fails
      }
    }

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log("Error cancelling appointment:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
};
