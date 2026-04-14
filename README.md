# MzansiBuilds 🚀  

**Name:** Sinokholo Singazi  
**Project:** MzansiBuilds  
**Year:** 2026  
**Student Number:** 222705698  

👩🏽‍💻 Software Developer | Cape Peninsula University of Technology  

---

## 📌 Table of Contents
- About MzansiBuilds  
- Features  
- Tech Stack  
- Project Structure  
- Getting Started  
- API Endpoints  
- Testing  
- Git Workflow  
- CI/CD Pipeline  
- Security  
- Database Design  
- Deployment  
- Author  

---

## 💡 About MzansiBuilds  
MzansiBuilds is an Application designed for developers to build in public, collaborate with others, and showcase completed projects.  

The platform allows users to share what they are working on, interact with other developers, track their progress, and celebrate completed work through a dedicated Celebration Wall.  

---

## 🚀 Features  
- User registration and login  
- Create and manage projects  
- Live feed of developer projects  
- Comment and collaborate on projects  
- Add milestones to track progress  
- Celebration Wall for completed projects  

---

## 🛠️ Tech Stack  

### Frontend  
- React (Vite)  
- TailwindCSS  
- Axios  
- React Router DOM  

### Backend  
- Node.js  
- Express.js  
- MongoDB (Atlas)  
- Mongoose  
- JWT Authentication  
- bcryptjs  
- Passport.js (GitHub & Google OAuth)  

---

## 📁 Project Structure  
MzansiBuilds/  
├── config/  
├── middleware/  
├── models/  
├── routes/  
├── src/  
└── server.js  

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js  
- MongoDB Atlas  
- Git  

### Setup  
git clone https://github.com/222705698/MzansiBuilds.git  
cd MzansiBuilds  
npm install  

### Run Application  
npm start  

---

## 🔌 API Endpoints  

### Auth  
- POST /api/auth/register  
- POST /api/auth/login  
- GET /api/auth/me  

### Projects  
- GET /api/projects  
- POST /api/projects  
- GET /api/projects/:id  

### Milestones  
- POST /api/milestones/:projectId  
- GET /api/milestones/:projectId  

### Comments  
- POST /api/comments/:projectId  
- GET /api/comments/:projectId  

### Celebration Wall  
- GET /api/wall  

---

## 🧪 Testing  
Testing was done using:  
- Unit testing  
- Integration testing  
- Manual testing (Postman)  

---

## 🔄 Git Workflow  
- Initialize repository  
- Create feature branches  
- Commit changes regularly  
- Push to GitHub  
- Merge into main branch  

---

## ⚙️ CI/CD Pipeline  

### Continuous Integration  
- Runs on every push  
- Builds project  
- Runs tests  

### Continuous Deployment  
- Deploys after merge to main  

---

## 🔒 Security  
- Password hashing (bcryptjs)  
- JWT authentication  
- Environment variables  
- Protected routes  

---

## 🌍 Live Demo

- **Frontend:** https://mzansi-builds.vercel.app
- **Backend API:** https://mzansibuilds-backend.onrender.com 

---

## 🚀 Deployment  
- Frontend: Vercel  
- Backend: Render  
- Database: MongoDB Atlas  

---

## 👨‍💻 Author  
**Sinokholo Singazi**  
🔗 https://github.com/222705698  
🔗 https://www.linkedin.com/in/sinokholo-singazi-815b15246/  
