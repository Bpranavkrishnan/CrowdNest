Crowdfunding Web App 🚀
A MERN Stack crowdfunding platform where users can create, manage, and donate to campaigns seamlessly. The app includes admin approval, secure user authentication, and a dynamic dashboard to track donations.

🌟 Features
✅ User Features

Sign up, log in, and manage their campaigns.
Create crowdfunding campaigns with goals and images.
Donate to campaigns using a dummy payment system.
Track donation progress with a real-time progress bar.
✅ Admin Features

View all campaigns in an Admin Dashboard.
Approve or reject campaigns before they go live.
Manage user donations and track funding goals.
✅ Tech Stack

Frontend: React.js (Vite)
Backend: Express.js, MongoDB Atlas
Authentication: JWT (JSON Web Tokens)
Styling: CSS (No Tailwind)

📂 Project Structure
Frontend (React + Vite)

/frontend  
│── /assets           # Stores images  
│── /components       # Reusable UI components  
│── /context          # Global state management  
│── /pages            # Individual pages  
│── /styles           # CSS files  
│── App.jsx, index.css, main.jsx (core files)  


Backend (Express + MongoDB)
/backend  
│── /middleware  
│   ├── authMiddleware.js    # Protects routes & verifies JWT  
│── /models  
│   ├── Campaign.js          # Campaign schema  
│   ├── DonationModel.js     # Donation schema  
│   ├── UserModel.js         # User schema (with admin role)  
│── /routes  
│   ├── authRoutes.js        # User authentication  
│   ├── campaignRoutes.js    # Campaign management  
│   ├── paymentRoute.js      # Handles dummy payments  
│── .env                     # Stores secret keys  
│── server.js                 # Main backend server  


🚀 Installation & Setup
1️⃣ Clone the Repository

git clone https://github.com/YOUR_USERNAME/crowdfunding-app.git
cd crowdfunding-app


2️⃣ Install Dependencies

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install


3️⃣ Setup Environment Variables
Create a .env file in the backend folder:


3️⃣ Setup Environment Variables
Create a .env file in the backend folder:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key



🛠 Running the Project
Start Backend

cd backend
npm start
Start Frontend

cd frontend
npm run dev
🔗 API Routes
User Authentication
POST /api/auth/register → Register a new user
POST /api/auth/login → Log in and receive JWT
Campaigns
POST /api/campaigns/create → Create a new campaign
GET /api/campaigns → Fetch all active campaigns
PUT /api/campaigns/update-status/:id → (Admin) Approve/reject campaign
Donations
POST /api/donations → Donate to a campaign
📌 Contribution & Support
Feel free to fork this repo, submit issues, and contribute! 🚀

📧 Contact: bpranavkrishnan@gmail.com

