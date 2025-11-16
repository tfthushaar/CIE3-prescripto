import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import doctorModel from "./models/doctorModel.js";
import userModel from "./models/userModel.js";
import appointmentModel from "./models/appointmentModel.js";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));
  await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
};

const seedAll = async () => {
  try {
    await connectDB();
    console.log("Connected to database");

    // Clear existing data
    console.log("Clearing existing data...");
    await doctorModel.deleteMany({});
    await userModel.deleteMany({});
    await appointmentModel.deleteMany({});
    console.log("Existing data cleared.");

    // Seed Doctors
    const doctorsData = [
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
      },
      {
        name: "Dr. Robert Taylor",
        email: "robert.taylor@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-6.jpg",
        speciality: "General Physician",
        degree: "MD, MBBS",
        experience: "7 years",
        about: "General practitioner providing comprehensive primary care services.",
        available: true,
        fees: 300,
        address: {
          city: "Seattle",
          state: "WA",
          zip: "98101",
          street: "789 Primary Care Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Maria Garcia",
        email: "maria.garcia@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-7.jpg",
        speciality: "Psychiatrist",
        degree: "MD, MBBS, MD Psychiatry",
        experience: "11 years",
        about: "Experienced psychiatrist specializing in mental health and psychiatric care.",
        available: true,
        fees: 550,
        address: {
          city: "Boston",
          state: "MA",
          zip: "02101",
          street: "321 Mental Health Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. David Kim",
        email: "david.kim@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-8.jpg",
        speciality: "Orthopedic Surgeon",
        degree: "MD, MBBS, MS Orthopedics",
        experience: "14 years",
        about: "Board-certified orthopedic surgeon specializing in bone and joint conditions.",
        available: true,
        fees: 700,
        address: {
          city: "San Francisco",
          state: "CA",
          zip: "94101",
          street: "555 Orthopedic Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Jennifer Brown",
        email: "jennifer.brown@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-9.jpg",
        speciality: "Gastroenterologist",
        degree: "MD, MBBS",
        experience: "10 years",
        about: "Expert gastroenterologist specializing in digestive system disorders.",
        available: true,
        fees: 500,
        address: {
          city: "Atlanta",
          state: "GA",
          zip: "30301",
          street: "222 Digestive Health Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Thomas Martinez",
        email: "thomas.martinez@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-10.jpg",
        speciality: "Ophthalmologist",
        degree: "MD, MBBS, MS Ophthalmology",
        experience: "13 years",
        about: "Specialized ophthalmologist providing comprehensive eye care services.",
        available: true,
        fees: 450,
        address: {
          city: "Dallas",
          state: "TX",
          zip: "75201",
          street: "888 Eye Care Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Amanda Foster",
        email: "amanda.foster@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-11.jpg",
        speciality: "Cardiologist",
        degree: "MD, MBBS, FACC",
        experience: "14 years",
        about: "Senior cardiologist with extensive experience in heart disease prevention and treatment.",
        available: true,
        fees: 550,
        address: {
          city: "Philadelphia",
          state: "PA",
          zip: "19101",
          street: "111 Heart Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Christopher Lee",
        email: "christopher.lee@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-12.jpg",
        speciality: "Dermatologist",
        degree: "MD, MBBS, FAAD",
        experience: "9 years",
        about: "Board-certified dermatologist specializing in cosmetic and medical dermatology.",
        available: true,
        fees: 425,
        address: {
          city: "Phoenix",
          state: "AZ",
          zip: "85001",
          street: "222 Skin Care Clinic"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Patricia Moore",
        email: "patricia.moore@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-13.jpg",
        speciality: "Pediatrician",
        degree: "MD, MBBS, FAAP",
        experience: "16 years",
        about: "Experienced pediatrician dedicated to providing comprehensive care for infants, children, and adolescents.",
        available: true,
        fees: 375,
        address: {
          city: "Portland",
          state: "OR",
          zip: "97201",
          street: "333 Kids Health Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Richard Davis",
        email: "richard.davis@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-14.jpg",
        speciality: "Neurologist",
        degree: "MD, MBBS, PhD",
        experience: "18 years",
        about: "Expert neurologist specializing in complex neurological disorders and conditions.",
        available: true,
        fees: 650,
        address: {
          city: "Detroit",
          state: "MI",
          zip: "48201",
          street: "444 Neuro Institute"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Nancy White",
        email: "nancy.white@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-15.jpg",
        speciality: "Gynecologist",
        degree: "MD, MBBS, FACOG",
        experience: "12 years",
        about: "Compassionate gynecologist providing comprehensive women's health and reproductive care.",
        available: true,
        fees: 475,
        address: {
          city: "Minneapolis",
          state: "MN",
          zip: "55401",
          street: "555 Women's Clinic"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Mark Thompson",
        email: "mark.thompson@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-16.jpg",
        speciality: "General Physician",
        degree: "MD, MBBS",
        experience: "10 years",
        about: "Primary care physician providing comprehensive family medicine and preventive care.",
        available: true,
        fees: 325,
        address: {
          city: "Tampa",
          state: "FL",
          zip: "33601",
          street: "666 Family Medicine Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Karen Harris",
        email: "karen.harris@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-17.jpg",
        speciality: "Psychiatrist",
        degree: "MD, MBBS, MD Psychiatry",
        experience: "13 years",
        about: "Board-certified psychiatrist specializing in mental health, anxiety, and depression treatment.",
        available: true,
        fees: 575,
        address: {
          city: "Cleveland",
          state: "OH",
          zip: "44101",
          street: "777 Mental Wellness Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Steven Clark",
        email: "steven.clark@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-18.jpg",
        speciality: "Orthopedic Surgeon",
        degree: "MD, MBBS, MS Orthopedics",
        experience: "16 years",
        about: "Renowned orthopedic surgeon specializing in joint replacement and sports medicine.",
        available: true,
        fees: 750,
        address: {
          city: "Denver",
          state: "CO",
          zip: "80201",
          street: "888 Sports Medicine Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Michelle Lewis",
        email: "michelle.lewis@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-19.jpg",
        speciality: "Gastroenterologist",
        degree: "MD, MBBS, FACG",
        experience: "11 years",
        about: "Expert gastroenterologist providing comprehensive digestive health services.",
        available: true,
        fees: 525,
        address: {
          city: "Baltimore",
          state: "MD",
          zip: "21201",
          street: "999 Digestive Health Institute"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Daniel Walker",
        email: "daniel.walker@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-20.jpg",
        speciality: "Ophthalmologist",
        degree: "MD, MBBS, MS Ophthalmology",
        experience: "15 years",
        about: "Specialized ophthalmologist with expertise in cataract surgery and retinal diseases.",
        available: true,
        fees: 500,
        address: {
          city: "Nashville",
          state: "TN",
          zip: "37201",
          street: "1000 Vision Care Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      // General Physician Doctors (5)
      {
        name: "Dr. Robert Mitchell",
        email: "robert.mitchell@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-21.jpg",
        speciality: "General Physician",
        degree: "MD, MBBS",
        experience: "8 years",
        about: "Experienced general practitioner providing comprehensive primary care and preventive medicine.",
        available: true,
        fees: 280,
        address: {
          city: "Indianapolis",
          state: "IN",
          zip: "46201",
          street: "111 Primary Care Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Susan Adams",
        email: "susan.adams@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-22.jpg",
        speciality: "General Physician",
        degree: "MD, MBBS",
        experience: "11 years",
        about: "Dedicated family medicine physician focused on comprehensive patient care and wellness.",
        available: true,
        fees: 295,
        address: {
          city: "Charlotte",
          state: "NC",
          zip: "28201",
          street: "222 Family Health Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. William Baker",
        email: "william.baker@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-23.jpg",
        speciality: "General Physician",
        degree: "MD, MBBS",
        experience: "9 years",
        about: "Compassionate general practitioner providing personalized primary care services.",
        available: true,
        fees: 310,
        address: {
          city: "Jacksonville",
          state: "FL",
          zip: "32201",
          street: "333 Wellness Clinic"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Jessica Carter",
        email: "jessica.carter@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-24.jpg",
        speciality: "General Physician",
        degree: "MD, MBBS",
        experience: "7 years",
        about: "Board-certified family physician specializing in preventive care and chronic disease management.",
        available: true,
        fees: 275,
        address: {
          city: "Columbus",
          state: "OH",
          zip: "43201",
          street: "444 Community Health Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Andrew Phillips",
        email: "andrew.phillips@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-25.jpg",
        speciality: "General Physician",
        degree: "MD, MBBS",
        experience: "12 years",
        about: "Experienced primary care physician dedicated to providing quality healthcare to all ages.",
        available: true,
        fees: 320,
        address: {
          city: "Fort Worth",
          state: "TX",
          zip: "76101",
          street: "555 General Medicine Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      // Gynecologist Doctors (5)
      {
        name: "Dr. Rebecca Young",
        email: "rebecca.young@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-26.jpg",
        speciality: "Gynecologist",
        degree: "MD, MBBS, FACOG",
        experience: "10 years",
        about: "Compassionate gynecologist providing comprehensive women's health services and reproductive care.",
        available: true,
        fees: 460,
        address: {
          city: "Memphis",
          state: "TN",
          zip: "38101",
          street: "111 Women's Health Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Victoria Green",
        email: "victoria.green@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-27.jpg",
        speciality: "Gynecologist",
        degree: "MD, MBBS, FACOG",
        experience: "13 years",
        about: "Expert gynecologist specializing in obstetrics, gynecology, and women's reproductive health.",
        available: true,
        fees: 485,
        address: {
          city: "Louisville",
          state: "KY",
          zip: "40201",
          street: "222 Reproductive Health Clinic"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Stephanie King",
        email: "stephanie.king@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-28.jpg",
        speciality: "Gynecologist",
        degree: "MD, MBBS",
        experience: "8 years",
        about: "Dedicated gynecologist providing personalized care for women's health and wellness.",
        available: true,
        fees: 440,
        address: {
          city: "Oklahoma City",
          state: "OK",
          zip: "73101",
          street: "333 Gynecology Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Amanda Scott",
        email: "amanda.scott@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-29.jpg",
        speciality: "Gynecologist",
        degree: "MD, MBBS, FACOG",
        experience: "15 years",
        about: "Senior gynecologist with extensive experience in high-risk obstetrics and gynecologic surgery.",
        available: true,
        fees: 520,
        address: {
          city: "Milwaukee",
          state: "WI",
          zip: "53201",
          street: "444 Women's Care Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Rachel Turner",
        email: "rachel.turner@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-30.jpg",
        speciality: "Gynecologist",
        degree: "MD, MBBS",
        experience: "9 years",
        about: "Compassionate gynecologist specializing in minimally invasive procedures and women's wellness.",
        available: true,
        fees: 455,
        address: {
          city: "Albuquerque",
          state: "NM",
          zip: "87101",
          street: "555 Women's Wellness Clinic"
        },
        date: Date.now(),
        slots_booked: {}
      },
      // Dermatologist Doctors (5)
      {
        name: "Dr. Jonathan Wright",
        email: "jonathan.wright@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-31.jpg",
        speciality: "Dermatologist",
        degree: "MD, MBBS, FAAD",
        experience: "10 years",
        about: "Board-certified dermatologist specializing in medical and cosmetic dermatology.",
        available: true,
        fees: 420,
        address: {
          city: "Tucson",
          state: "AZ",
          zip: "85701",
          street: "111 Skin Care Clinic"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Lauren Hall",
        email: "lauren.hall@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-32.jpg",
        speciality: "Dermatologist",
        degree: "MD, MBBS, FAAD",
        experience: "12 years",
        about: "Expert dermatologist providing comprehensive skin care and treatment for all skin conditions.",
        available: true,
        fees: 435,
        address: {
          city: "Fresno",
          state: "CA",
          zip: "93701",
          street: "222 Dermatology Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Brian Allen",
        email: "brian.allen@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-33.jpg",
        speciality: "Dermatologist",
        degree: "MD, MBBS",
        experience: "8 years",
        about: "Dedicated dermatologist specializing in acne treatment, skin cancer screening, and dermatologic surgery.",
        available: true,
        fees: 410,
        address: {
          city: "Mesa",
          state: "AZ",
          zip: "85201",
          street: "333 Skin Health Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Nicole Nelson",
        email: "nicole.nelson@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-34.jpg",
        speciality: "Dermatologist",
        degree: "MD, MBBS, FAAD",
        experience: "14 years",
        about: "Senior dermatologist with expertise in cosmetic dermatology, laser treatments, and medical dermatology.",
        available: true,
        fees: 450,
        address: {
          city: "Virginia Beach",
          state: "VA",
          zip: "23451",
          street: "444 Advanced Dermatology"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Kevin Hill",
        email: "kevin.hill@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-35.jpg",
        speciality: "Dermatologist",
        degree: "MD, MBBS",
        experience: "9 years",
        about: "Compassionate dermatologist providing expert care for skin, hair, and nail conditions.",
        available: true,
        fees: 415,
        address: {
          city: "Oakland",
          state: "CA",
          zip: "94601",
          street: "555 Comprehensive Dermatology"
        },
        date: Date.now(),
        slots_booked: {}
      },
      // Pediatrician Doctors (5)
      {
        name: "Dr. Samantha Rogers",
        email: "samantha.rogers@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-36.jpg",
        speciality: "Pediatrician",
        degree: "MD, MBBS, FAAP",
        experience: "11 years",
        about: "Dedicated pediatrician providing comprehensive healthcare for infants, children, and adolescents.",
        available: true,
        fees: 360,
        address: {
          city: "Raleigh",
          state: "NC",
          zip: "27601",
          street: "111 Children's Health Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Matthew Cooper",
        email: "matthew.cooper@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-37.jpg",
        speciality: "Pediatrician",
        degree: "MD, MBBS, FAAP",
        experience: "13 years",
        about: "Experienced pediatrician specializing in childhood development, vaccinations, and preventive care.",
        available: true,
        fees: 370,
        address: {
          city: "Omaha",
          state: "NE",
          zip: "68101",
          street: "222 Kids Care Clinic"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Ashley Richardson",
        email: "ashley.richardson@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-38.jpg",
        speciality: "Pediatrician",
        degree: "MD, MBBS",
        experience: "7 years",
        about: "Compassionate pediatrician providing quality healthcare for children from birth through adolescence.",
        available: true,
        fees: 345,
        address: {
          city: "Miami",
          state: "FL",
          zip: "33101",
          street: "333 Pediatric Care Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Justin Cox",
        email: "justin.cox@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-39.jpg",
        speciality: "Pediatrician",
        degree: "MD, MBBS, FAAP",
        experience: "15 years",
        about: "Senior pediatrician with expertise in pediatric emergency medicine and critical care.",
        available: true,
        fees: 385,
        address: {
          city: "Long Beach",
          state: "CA",
          zip: "90801",
          street: "444 Children's Hospital"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Brittany Howard",
        email: "brittany.howard@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-40.jpg",
        speciality: "Pediatrician",
        degree: "MD, MBBS",
        experience: "10 years",
        about: "Dedicated pediatrician focused on providing family-centered care and child wellness.",
        available: true,
        fees: 365,
        address: {
          city: "Colorado Springs",
          state: "CO",
          zip: "80901",
          street: "555 Young Patients Clinic"
        },
        date: Date.now(),
        slots_booked: {}
      },
      // Neurologist Doctors (5)
      {
        name: "Dr. Tyler Ward",
        email: "tyler.ward@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-41.jpg",
        speciality: "Neurologist",
        degree: "MD, MBBS, PhD",
        experience: "12 years",
        about: "Expert neurologist specializing in epilepsy, stroke, and movement disorders.",
        available: true,
        fees: 620,
        address: {
          city: "Raleigh",
          state: "NC",
          zip: "27601",
          street: "111 Neurology Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Megan Torres",
        email: "megan.torres@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-42.jpg",
        speciality: "Neurologist",
        degree: "MD, MBBS, PhD",
        experience: "14 years",
        about: "Board-certified neurologist with expertise in headache medicine and neuroimaging.",
        available: true,
        fees: 635,
        address: {
          city: "Virginia Beach",
          state: "VA",
          zip: "23451",
          street: "222 Neuro Care Institute"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Brandon Ramirez",
        email: "brandon.ramirez@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-43.jpg",
        speciality: "Neurologist",
        degree: "MD, MBBS",
        experience: "9 years",
        about: "Dedicated neurologist providing comprehensive care for neurological conditions and disorders.",
        available: true,
        fees: 610,
        address: {
          city: "Oakland",
          state: "CA",
          zip: "94601",
          street: "333 Brain Health Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Kimberly James",
        email: "kimberly.james@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-44.jpg",
        speciality: "Neurologist",
        degree: "MD, MBBS, PhD",
        experience: "16 years",
        about: "Senior neurologist specializing in multiple sclerosis, neuroimmunology, and neurorehabilitation.",
        available: true,
        fees: 670,
        address: {
          city: "Minneapolis",
          state: "MN",
          zip: "55401",
          street: "444 Advanced Neurology"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Jason Watson",
        email: "jason.watson@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-45.jpg",
        speciality: "Neurologist",
        degree: "MD, MBBS",
        experience: "11 years",
        about: "Expert neurologist providing specialized care for neurodegenerative diseases and cognitive disorders.",
        available: true,
        fees: 640,
        address: {
          city: "Tulsa",
          state: "OK",
          zip: "74101",
          street: "555 Neuro Specialists"
        },
        date: Date.now(),
        slots_booked: {}
      },
      // Gastroenterologist Doctors (5)
      {
        name: "Dr. Melissa Brooks",
        email: "melissa.brooks@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-46.jpg",
        speciality: "Gastroenterologist",
        degree: "MD, MBBS, FACG",
        experience: "10 years",
        about: "Board-certified gastroenterologist specializing in digestive disorders and endoscopic procedures.",
        available: true,
        fees: 515,
        address: {
          city: "Cleveland",
          state: "OH",
          zip: "44101",
          street: "111 Digestive Health Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Nathan Kelly",
        email: "nathan.kelly@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-47.jpg",
        speciality: "Gastroenterologist",
        degree: "MD, MBBS, FACG",
        experience: "13 years",
        about: "Expert gastroenterologist providing comprehensive care for gastrointestinal and liver diseases.",
        available: true,
        fees: 530,
        address: {
          city: "Tampa",
          state: "FL",
          zip: "33601",
          street: "222 GI Care Center"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Heather Sanders",
        email: "heather.sanders@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-48.jpg",
        speciality: "Gastroenterologist",
        degree: "MD, MBBS",
        experience: "8 years",
        about: "Dedicated gastroenterologist specializing in inflammatory bowel disease and hepatology.",
        available: true,
        fees: 505,
        address: {
          city: "Arlington",
          state: "TX",
          zip: "76001",
          street: "333 Digestive Care Clinic"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Ryan Price",
        email: "ryan.price@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-49.jpg",
        speciality: "Gastroenterologist",
        degree: "MD, MBBS, FACG",
        experience: "15 years",
        about: "Senior gastroenterologist with expertise in advanced endoscopy, ERCP, and therapeutic procedures.",
        available: true,
        fees: 545,
        address: {
          city: "Corpus Christi",
          state: "TX",
          zip: "78401",
          street: "444 Advanced Gastroenterology"
        },
        date: Date.now(),
        slots_booked: {}
      },
      {
        name: "Dr. Christina Bennett",
        email: "christina.bennett@prescripto.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dzyrmrs5n/image/upload/v1/default-doctor-50.jpg",
        speciality: "Gastroenterologist",
        degree: "MD, MBBS",
        experience: "11 years",
        about: "Compassionate gastroenterologist providing expert care for digestive health and nutrition counseling.",
        available: true,
        fees: 520,
        address: {
          city: "Riverside",
          state: "CA",
          zip: "92501",
          street: "555 GI Wellness Center"
        },
        date: Date.now(),
        slots_booked: {}
      }
    ];

    // Hash passwords for doctors
    for (const doctor of doctorsData) {
      const salt = await bcrypt.genSalt(10);
      doctor.password = await bcrypt.hash(doctor.password, salt);
    }

    const doctors = await doctorModel.insertMany(doctorsData);
    console.log(`✅ Added ${doctors.length} doctors`);

    // Seed Users
    const usersData = [
      {
        name: "John Smith",
        email: "john.smith@email.com",
        password: "user123",
        image: "",
        phone: "555-0101",
        address: { city: "New York", state: "NY", zip: "10001", street: "123 Main St" },
        dob: "1990-05-15",
        gender: "Male"
      },
      {
        name: "Emma Johnson",
        email: "emma.johnson@email.com",
        password: "user123",
        image: "",
        phone: "555-0102",
        address: { city: "Los Angeles", state: "CA", zip: "90001", street: "456 Oak Ave" },
        dob: "1988-08-22",
        gender: "Female"
      },
      {
        name: "Michael Brown",
        email: "michael.brown@email.com",
        password: "user123",
        image: "",
        phone: "555-0103",
        address: { city: "Chicago", state: "IL", zip: "60601", street: "789 Pine St" },
        dob: "1992-03-10",
        gender: "Male"
      },
      {
        name: "Sophia Davis",
        email: "sophia.davis@email.com",
        password: "user123",
        image: "",
        phone: "555-0104",
        address: { city: "Houston", state: "TX", zip: "77001", street: "321 Elm St" },
        dob: "1995-11-30",
        gender: "Female"
      },
      {
        name: "William Wilson",
        email: "william.wilson@email.com",
        password: "user123",
        image: "",
        phone: "555-0105",
        address: { city: "Miami", state: "FL", zip: "33101", street: "654 Maple Dr" },
        dob: "1987-07-18",
        gender: "Male"
      },
      {
        name: "Olivia Miller",
        email: "olivia.miller@email.com",
        password: "user123",
        image: "",
        phone: "555-0106",
        address: { city: "Seattle", state: "WA", zip: "98101", street: "987 Cedar Ln" },
        dob: "1993-02-25",
        gender: "Female"
      },
      {
        name: "James Garcia",
        email: "james.garcia@email.com",
        password: "user123",
        image: "",
        phone: "555-0107",
        address: { city: "Boston", state: "MA", zip: "02101", street: "147 Birch Ave" },
        dob: "1991-09-12",
        gender: "Male"
      },
      {
        name: "Isabella Martinez",
        email: "isabella.martinez@email.com",
        password: "user123",
        image: "",
        phone: "555-0108",
        address: { city: "San Francisco", state: "CA", zip: "94101", street: "258 Willow St" },
        dob: "1994-04-05",
        gender: "Female"
      },
      {
        name: "Benjamin Anderson",
        email: "benjamin.anderson@email.com",
        password: "user123",
        image: "",
        phone: "555-0109",
        address: { city: "Atlanta", state: "GA", zip: "30301", street: "369 Spruce Way" },
        dob: "1989-12-20",
        gender: "Male"
      },
      {
        name: "Mia Thompson",
        email: "mia.thompson@email.com",
        password: "user123",
        image: "",
        phone: "555-0110",
        address: { city: "Dallas", state: "TX", zip: "75201", street: "741 Ash Blvd" },
        dob: "1996-06-14",
        gender: "Female"
      },
      {
        name: "Daniel Lee",
        email: "daniel.lee@email.com",
        password: "user123",
        image: "",
        phone: "555-0111",
        address: { city: "Phoenix", state: "AZ", zip: "85001", street: "852 Cypress Rd" },
        dob: "1990-01-08",
        gender: "Male"
      },
      {
        name: "Charlotte White",
        email: "charlotte.white@email.com",
        password: "user123",
        image: "",
        phone: "555-0112",
        address: { city: "Denver", state: "CO", zip: "80201", street: "963 Fir St" },
        dob: "1992-10-17",
        gender: "Female"
      }
    ];

    // Hash passwords for users
    for (const user of usersData) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    const users = await userModel.insertMany(usersData);
    console.log(`✅ Added ${users.length} users`);

    // Seed Appointments
    const appointmentsData = [];
    const appointmentStatuses = ["pending", "completed", "cancelled"];
    const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
    
    // Generate dates (today and next 30 days)
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }

    // Create appointments
    let appointmentCount = 0;
    for (let i = 0; i < users.length && appointmentCount < 50; i++) {
      const user = users[i];
      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image
      };

      // Each user gets 2-4 appointments
      const numAppointments = Math.floor(Math.random() * 3) + 2;
      
      for (let j = 0; j < numAppointments && appointmentCount < 50; j++) {
        const doctor = doctors[Math.floor(Math.random() * doctors.length)];
        const slotDate = dates[Math.floor(Math.random() * dates.length)];
        const slotTime = timeSlots[Math.floor(Math.random() * timeSlots.length)];
        
        const status = appointmentStatuses[Math.floor(Math.random() * appointmentStatuses.length)];
        const isCompleted = status === "completed";
        const cancelled = status === "cancelled";
        
        const appointmentDate = new Date(today);
        appointmentDate.setDate(today.getDate() - Math.floor(Math.random() * 30));

        const docData = {
          _id: doctor._id,
          name: doctor.name,
          speciality: doctor.speciality,
          fees: doctor.fees,
          image: doctor.image
        };

        appointmentsData.push({
          userId: user._id,
          docId: doctor._id,
          userData: userData,
          docData: docData,
          amount: doctor.fees,
          slotTime: slotTime,
          slotDate: slotDate,
          date: appointmentDate.getTime(),
          isCompleted: isCompleted,
          cancelled: cancelled,
          payment: isCompleted ? true : false
        });

        appointmentCount++;
      }
    }

    await appointmentModel.insertMany(appointmentsData);
    console.log(`✅ Added ${appointmentsData.length} appointments`);

    console.log("\n📊 Summary:");
    console.log(`   - Doctors: ${doctors.length}`);
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Appointments: ${appointmentsData.length}`);
    console.log("\n🔑 Login Credentials:");
    console.log("   Doctor Login:");
    console.log("   - Email: sarah.johnson@prescripto.com (or any doctor email)");
    console.log("   - Password: doctor123");
    console.log("\n   User Login:");
    console.log("   - Email: john.smith@email.com (or any user email)");
    console.log("   - Password: user123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedAll();

