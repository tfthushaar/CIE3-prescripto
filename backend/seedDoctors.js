import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import doctorModel from "./models/doctorModel.js";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));
  await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
};

const seedDoctors = async () => {
  try {
    await connectDB();
    console.log("Connected to database");

    // Check if doctors already exist
    const existingDoctors = await doctorModel.find({});
    if (existingDoctors.length > 0) {
      console.log(`Found ${existingDoctors.length} existing doctors. Skipping seed.`);
      process.exit(0);
    }

    // Sample doctors data
    const doctors = [
      {
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-1.jpg",
        speciality: "Cardiologist",
        degree: "MD, MBBS",
        experience: "10 years",
        about: "Experienced cardiologist specializing in heart health and cardiovascular diseases.",
        available: true,
        fees: 500,
        address: {
          city: "New York",
          state: "NY",
          zip: "10001",
          street: "123 Medical Center Drive"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Michael Chen",
        email: "michael.chen@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-2.jpg",
        speciality: "Dermatologist",
        degree: "MD, MBBS",
        experience: "8 years",
        about: "Board-certified dermatologist with expertise in skin care and treatment of skin conditions.",
        available: true,
        fees: 400,
        address: {
          city: "Los Angeles",
          state: "CA",
          zip: "90001",
          street: "456 Health Plaza"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Emily Rodriguez",
        email: "emily.rodriguez@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-3.jpg",
        speciality: "Pediatrician",
        degree: "MD, MBBS",
        experience: "12 years",
        about: "Dedicated pediatrician caring for children's health from infancy to adolescence.",
        available: true,
        fees: 350,
        address: {
          city: "Chicago",
          state: "IL",
          zip: "60601",
          street: "789 Children's Hospital Lane"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. James Wilson",
        email: "james.wilson@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-4.jpg",
        speciality: "Neurologist",
        degree: "MD, MBBS, PhD",
        experience: "15 years",
        about: "Expert neurologist specializing in brain and nervous system disorders.",
        available: true,
        fees: 600,
        address: {
          city: "Houston",
          state: "TX",
          zip: "77001",
          street: "321 Neuro Care Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Lisa Anderson",
        email: "lisa.anderson@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-5.jpg",
        speciality: "Gynecologist",
        degree: "MD, MBBS",
        experience: "9 years",
        about: "Compassionate gynecologist providing women's health services and care.",
        available: true,
        fees: 450,
        address: {
          city: "Miami",
          state: "FL",
          zip: "33101",
          street: "654 Women's Health Avenue"
        },
        date: Date.now(),
        slots_booked: {}
      }
    ];

    // Hash passwords and insert doctors
    for (const doctor of doctors) {
      const salt = await bcrypt.genSalt(10);
      doctor.password = await bcrypt.hash(doctor.password, salt);
    }

    await doctorModel.insertMany(doctors);
    console.log(`✅ Successfully added ${doctors.length} sample doctors!`);
    console.log("\nDoctor Login Credentials:");
    console.log("Email: Use the emails from above");
    console.log("Password: doctor123 (for all doctors)");
    console.log("\nExample:");
    console.log("Email: sarah.johnson@prescripto.com");
    console.log("Password: doctor123");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding doctors:", error);
    process.exit(1);
  }
};

seedDoctors();

