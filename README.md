# PRESCRIPTO 👨‍⚕️🏥

A full-stack appointment booking system for doctors and hospitals with three-level authentication: Patients, Doctors, and Admin.

## ✨ Features

### For Patients
- User registration and login
- Browse doctors by specialty
- Book appointments with doctors
- Manage booked appointments
- Update profile with profile picture

### For Doctors
- Doctor login and dashboard
- View patient appointments
- Track earnings
- Complete or cancel appointments
- Update profile and availability

### For Admin
- Admin dashboard with statistics
- Add new doctors
- Manage all appointments
- View all doctors and patients
- Change doctor availability

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- **Cloudinary Account** - [Sign up here](https://cloudinary.com/users/register_free) (for image uploads)

### Installation

1. **Install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   
   Create `.env` files in:
   - `backend/.env` - MongoDB URI, Cloudinary credentials, JWT secret, Admin credentials
   - `clientside/.env` - `VITE_BACKEND_URL=http://localhost:4000`
   - `admin/.env` - `VITE_BACKEND_URL=http://localhost:4000`

   See [Setup Instructions](#setup-instructions) for details.

3. **Seed the database (optional):**
   ```bash
   cd backend
   node seedAll.js
   ```

4. **Run the application:**
   
   **Terminal 1 - Backend:**
   ```bash
   npm run dev:backend
   ```
   
   **Terminal 2 - Patient App:**
   ```bash
   npm run dev:client
   ```
   
   **Terminal 3 - Admin Dashboard:**
   ```bash
   npm run dev:admin
   ```

### Access URLs

- **Patient/User App:** http://localhost:5173
- **Admin Dashboard:** http://localhost:5174
- **Backend API:** http://localhost:4000

## 📋 Setup Instructions

### Backend Configuration

Create `backend/.env` file with:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Server Port
PORT=4000

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production

# Admin Credentials
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=admin123
```

### Frontend Configuration

Create `.env` file in both `clientside/` and `admin/` folders:

```env
VITE_BACKEND_URL=http://localhost:4000
```

### Start MongoDB

**Windows:**
- MongoDB service should start automatically
- Or manually: `mongod`

**Mac/Linux:**
```bash
brew services start mongodb-community
# OR
sudo systemctl start mongod
```

**MongoDB Atlas:**
- Use your Atlas connection string in the `.env` file
- Ensure your IP is whitelisted

## 📁 Project Structure

```
prescripto/
├── backend/          # Node.js/Express API server
│   ├── config/       # Database and Cloudinary configuration
│   ├── controllers/  # Route controllers
│   ├── middlewares/  # Authentication and upload middlewares
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   └── server.js     # Main server file
├── clientside/       # React frontend for patients/users
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React context providers
│   │   ├── pages/       # Page components
│   │   └── assets/      # Static assets
│   └── package.json
├── admin/            # React frontend for admin and doctors
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   └── package.json
└── package.json      # Root package.json with helper scripts
```

## 🔐 Login Credentials

See [CREDENTIALS.md](./CREDENTIALS.md) for all login credentials including:
- Sample user accounts
- Admin credentials
- Doctor credentials

**Quick Access:**
- **Admin:** `admin@prescripto.com` / `admin123`
- **Doctor:** `sarah.johnson@prescripto.com` / `doctor123`
- **User:** `john.smith@email.com` / `user123`

## 🛠️ Available Scripts

From the root directory:

```bash
npm run install:all     # Install all dependencies
npm run dev:backend     # Start backend server with nodemon
npm run dev:client      # Start patient app
npm run dev:admin       # Start admin dashboard
npm run start:backend   # Start backend server (production mode)
```

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (check with `mongosh` or `mongo`)
- Verify `MONGODB_URI` in `backend/.env`
- For Atlas, check IP whitelist settings

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Vite will automatically use the next available port

### Cloudinary Issues
- Verify Cloudinary credentials in `backend/.env`
- Ensure you have a free Cloudinary account
- Used for image uploads (doctor profiles, user avatars)

### CORS Issues
- Ensure backend is running before starting frontends
- Verify `VITE_BACKEND_URL` matches the backend URL

### Environment Variables Not Loading
- Ensure `.env` files are in the correct directories
- Restart the development servers after creating `.env` files
- Check for typos in variable names

## 📝 Default Ports

- **Backend:** `4000`
- **Patient App:** `5173` (Vite default)
- **Admin Dashboard:** `5174` (or next available port)

## 📚 Additional Documentation

- [CREDENTIALS.md](./CREDENTIALS.md) - All login credentials
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
- [package.json](./package.json) - Available npm scripts

## 🎯 Technologies Used

- **Frontend:** React, React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **File Upload:** Cloudinary, Multer
- **Authentication:** JWT (JSON Web Tokens)
- **Build Tool:** Vite

## 📄 License

This project is distributed under the MIT license.

## 👨‍💻 Author

**NIYIBIZI Elysée**

- [GitHub](https://github.com/elyse502)
- [LinkedIn](https://www.linkedin.com/in/niyibizi-elys%C3%A9e/)
- [Twitter](https://twitter.com/Niyibizi_Elyse)

---

**Note:** Make sure to update environment variables with your own credentials before deploying to production.
