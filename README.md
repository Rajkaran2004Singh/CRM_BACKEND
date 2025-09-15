#  CRM Backend

This is the **backend** of the CRM platform, built with **Node.js + Express**.  
It provides REST APIs for authentication, customer management, campaigns, segmentation, communications, and AI tools.  
Link to frontend repository : https://github.com/Rajkaran2004Singh/CRM_FRONTEND
Deployed on **Render** and connected with the frontend on **Netlify**.

---

## Features

` **Google OAuth Authentication** using Passport.js  
- **Customer Management** (CRUD operations for customers)  
- **Campaigns**  
  - Create campaigns with JSON rule-based audience selection  
  - Auto-delivery simulation with vendor API  
  - Track sent/failed communications  
- **Segments**  
  - Advanced rule evaluator (AND/OR groups)  
  - Real-time audience calculation  
- **AI Tools** (suggest messages / personalization)  
- **Dashboard APIs** (overview of campaigns & communication logs)  
- **Session & Cookies** with `express-session`  
- **CORS Enabled** for frontend (Netlify)  

---

## 🛠️ Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with Mongoose
- [Passport.js](http://www.passportjs.org/) (Google OAuth)
- [express-session](https://www.npmjs.com/package/express-session)
- [Render](https://render.com/) for deployment

---

## 📂 Project Structure

```
backend/
├── config/
│ ├── passport.js # Google OAuth strategy
│ └── .env # Environment variables
├── controllers/ # Business logic
├── database/
│ └── dbConnection.js # MongoDB connection
├── models/ # Mongoose models
├── routes/ # Express routes
├── utils/ # Helper utilities
├── server.js # Entry point
└── package.json
```


---

## Setup (Local Development)

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/crm-backend.git
   cd crm-backend
2. Install dependencies
   ```bash
   npm install
3. Create .env file and provide the following keys
  PORT=5000
  MONGO_URI=DB_URL
  SESSION_SECRET=your-secret-key
  CLIENT_URL=FRONTEND_URL
  GOOGLE_CLIENT_ID=your-google-client-id
  GOOGLE_CLIENT_SECRET=your-google-client-secret
4. Run the server
   ```bash
   npm run dev
