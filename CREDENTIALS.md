# PRESCRIPTO - Login Credentials

This file contains all the login credentials for testing the PRESCRIPTO application.

## 🔗 Access Links

- **Patient/User App:** http://localhost:5173
- **Admin Dashboard:** http://localhost:5174 (Admin & Doctor Login)
- **Backend API:** http://localhost:4000

---

## 👤 User/Patient Credentials

Use these credentials to log into the **Patient App** (http://localhost:5173):

### Sample User Accounts

| Email | Password | Name |
|-------|----------|------|
| `john.smith@email.com` | `user123` | John Smith |
| `emma.johnson@email.com` | `user123` | Emma Johnson |
| `michael.brown@email.com` | `user123` | Michael Brown |
| `sophia.davis@email.com` | `user123` | Sophia Davis |
| `william.wilson@email.com` | `user123` | William Wilson |
| `olivia.miller@email.com` | `user123` | Olivia Miller |
| `james.garcia@email.com` | `user123` | James Garcia |
| `isabella.martinez@email.com` | `user123` | Isabella Martinez |
| `benjamin.anderson@email.com` | `user123` | Benjamin Anderson |
| `mia.thompson@email.com` | `user123` | Mia Thompson |
| `daniel.lee@email.com` | `user123` | Daniel Lee |
| `charlotte.white@email.com` | `user123` | Charlotte White |

**Note:** All users share the same password: `user123`

**You can also create new user accounts** by signing up on the Patient App.

---

## 👨‍💼 Admin Credentials

Use these credentials to log into the **Admin Dashboard** (http://localhost:5174) as an Admin:

| Email | Password |
|-------|----------|
| `admin@prescripto.com` | `admin123` |

**Admin Features:**
- Add new doctors
- View all doctors
- Manage all appointments
- View dashboard statistics
- Change doctor availability

---

## 👨‍⚕️ Doctor Credentials

Use these credentials to log into the **Admin Dashboard** (http://localhost:5174) as a Doctor (select "Doctor" tab):

### Sample Doctor Accounts

| Email | Password | Name | Speciality |
|-------|----------|------|------------|
| `sarah.johnson@prescripto.com` | `doctor123` | Dr. Sarah Johnson | Cardiologist |
| `michael.chen@prescripto.com` | `doctor123` | Dr. Michael Chen | Dermatologist |
| `emily.rodriguez@prescripto.com` | `doctor123` | Dr. Emily Rodriguez | Pediatrician |
| `james.wilson@prescripto.com` | `doctor123` | Dr. James Wilson | Neurologist |
| `lisa.anderson@prescripto.com` | `doctor123` | Dr. Lisa Anderson | Gynecologist |
| `robert.taylor@prescripto.com` | `doctor123` | Dr. Robert Taylor | General Physician |
| `maria.garcia@prescripto.com` | `doctor123` | Dr. Maria Garcia | Psychiatrist |
| `david.kim@prescripto.com` | `doctor123` | Dr. David Kim | Orthopedic Surgeon |
| `jennifer.brown@prescripto.com` | `doctor123` | Dr. Jennifer Brown | Gastroenterologist |
| `thomas.martinez@prescripto.com` | `doctor123` | Dr. Thomas Martinez | Ophthalmologist |
| `amanda.foster@prescripto.com` | `doctor123` | Dr. Amanda Foster | Cardiologist |
| `christopher.lee@prescripto.com` | `doctor123` | Dr. Christopher Lee | Dermatologist |
| `patricia.moore@prescripto.com` | `doctor123` | Dr. Patricia Moore | Pediatrician |
| `richard.davis@prescripto.com` | `doctor123` | Dr. Richard Davis | Neurologist |
| `nancy.white@prescripto.com` | `doctor123` | Dr. Nancy White | Gynecologist |
| `mark.thompson@prescripto.com` | `doctor123` | Dr. Mark Thompson | General Physician |
| `karen.harris@prescripto.com` | `doctor123` | Dr. Karen Harris | Psychiatrist |
| `steven.clark@prescripto.com` | `doctor123` | Dr. Steven Clark | Orthopedic Surgeon |
| `michelle.lewis@prescripto.com` | `doctor123` | Dr. Michelle Lewis | Gastroenterologist |
| `daniel.walker@prescripto.com` | `doctor123` | Dr. Daniel Walker | Ophthalmologist |

**Note:** All doctors share the same password: `doctor123`

**Total Doctors in Database:** 50 doctors across various specialties

**Doctor Specialties Available:**
- Cardiologist
- Dermatologist
- Pediatrician
- Neurologist
- Gynecologist
- General Physician
- Psychiatrist
- Orthopedic Surgeon
- Gastroenterologist
- Ophthalmologist

**Doctor Features:**
- View appointments
- Complete appointments
- Cancel appointments
- View dashboard with earnings
- Update profile
- View patient information

---

## 🔐 Password Summary

| Role | Default Password |
|------|------------------|
| User/Patient | `user123` |
| Admin | `admin123` |
| Doctor | `doctor123` |

---

## 📝 Notes

1. **Admin Dashboard:** The same login page is used for both Admin and Doctor login. Select the appropriate tab (Admin or Doctor) before logging in.

2. **User Registration:** New users can register through the Patient App at http://localhost:5173

3. **Adding Doctors:** Only admins can add new doctors through the Admin Dashboard.

4. **Database:** All credentials are stored in MongoDB. You can reset or add new users/doctors through the application interfaces or by running the seed script.

---

## 🔄 Resetting Data

To reset all data and reseed the database with sample users, doctors, and appointments:

```bash
cd backend
node seedAll.js
```

This will clear existing data and add:
- 50 doctors
- 12 sample users
- 36 sample appointments

---

**Last Updated:** November 2024

