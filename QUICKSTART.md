# Quick Start Guide

## ✅ Prerequisites Check

Before running the application, ensure you have:

- [x] Node.js installed (v14+) ✅
- [ ] MongoDB running locally OR MongoDB Atlas account
- [ ] Cloudinary account (free tier works fine)

## 🚀 Quick Start (3 Steps)

### Step 1: Configure MongoDB

**Option A: Local MongoDB**
- Make sure MongoDB is installed and running
- Your `.env` file already has: `MONGODB_URI=mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a free cluster
- Get your connection string
- Update `backend/.env`: Replace `MONGODB_URI` with your Atlas connection string

### Step 2: Configure Cloudinary

1. Sign up at [Cloudinary](https://cloudinary.com/users/register_free) (free)
2. Go to Dashboard → Settings → Product environment credentials
3. Update `backend/.env` with your credentials:
   ```
   CLOUDINARY_NAME=your_actual_name
   CLOUDINARY_API_KEY=your_actual_key
   CLOUDINARY_SECRET_KEY=your_actual_secret
   ```

### Step 3: Run the Application

Open **3 separate terminal windows**:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# OR for auto-reload during development:
npm run server
```

**Terminal 2 - Client UI (Patient App):**
```bash
cd clientside
npm run dev
```

**Terminal 3 - Admin Dashboard:**
```bash
cd admin
npm run dev
```

## 🌐 Access URLs

After starting all services:

- **Patient/User App**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5174 (or next available port)
- **Backend API**: http://localhost:4000

## 📝 Notes

- The backend must be running before the frontend apps
- If ports are in use, Vite will automatically use the next available port
- Check the terminal output for the actual URLs

## ❓ Troubleshooting

**Backend won't start?**
- Check MongoDB is running/accessible
- Verify `.env` file exists in `backend/` folder
- Check port 4000 is not in use

**Frontend can't connect to backend?**
- Ensure backend is running on port 4000
- Check `.env` files in `clientside/` and `admin/` have `VITE_BACKEND_URL=http://localhost:4000`

**Database connection errors?**
- Verify MongoDB is running (local) or connection string is correct (Atlas)
- Check network connectivity

For more details, see [SETUP.md](./SETUP.md)

