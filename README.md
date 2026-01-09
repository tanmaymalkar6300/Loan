🚀 SmartLoan – Loan Prediction System (ML Powered)

SmartLoan is a full-stack Machine Learning web application that predicts the eligible loan amount for a user based on their financial profile.
The system uses an XGBoost ML model served via FastAPI, with a modern React frontend deployed separately.

🌐 Live Demo

Frontend (Vercel)
👉 https://loan-predictor-frontend.vercel.app

Backend API (Render)
👉 https://loan-fu3a.onrender.com

API Docs (Swagger UI)
👉 https://loan-fu3a.onrender.com/docs

🧠 Features

🔮 Predict loan amount using Machine Learning (XGBoost)

⚡ Real-time predictions via REST API

🎨 Modern, animated UI with React & Framer Motion

📊 Input validation and error handling

🌍 Fully deployed (Frontend + Backend)

📱 Responsive and user-friendly design

🏗️ Tech Stack
Frontend

React (Vite)

React Router

Framer Motion

Tailwind CSS

Deployed on Vercel

Backend

FastAPI

Python 3.10

XGBoost ML model

Scikit-learn

Deployed on Render

📂 Project Structure
Loan/
├── Loan_Rag-main/
│   ├── backend/
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   ├── runtime.txt
│   │   ├── xgb_best_model.pkl
│   │   ├── scaler.pkl
│   │   └── columns.pkl
│   │
│   └── loan recommendation system/
│       ├── src/
│       │   ├── pages/
│       │   ├── components/
│       │   └── App.jsx
│       ├── package.json
│       └── index.html

🔁 How It Works

User fills loan details in the frontend

React app sends a POST request to FastAPI backend

Backend:

Validates input

Applies preprocessing (scaling & encoding)

Uses trained XGBoost model

Predicted loan amount is returned to frontend

Result is displayed in a clean UI

📮 API Endpoint
POST /predict

Request Body (JSON):

{
  "age": 25,
  "income": 6,
  "creditScore": 750,
  "maritalStatus": "Single",
  "purpose": "Home"
}


Response:

{
  "predictedLoanAmount": 8.5
}

🧪 Run Locally
Backend
cd Loan_Rag-main/backend
pip install -r requirements.txt
uvicorn app:app --reload

Frontend
cd Loan_Rag-main/loan recommendation system
npm install
npm run dev

🚀 Deployment

Backend: Render (Python Web Service)

Frontend: Vercel (React + Vite)

API connected using production URL

📌 Notes

Render free tier may take 20–40 seconds on first request (cold start)

API automatically wakes up when requested

👨‍💻 Author

Tanmay Malkar
📧 Email: malkartanmay6300@gmail.com

🌐 GitHub: https://github.com/tanmaymalkar6300

⭐ Future Improvements

Authentication (Login / Signup)

More ML features

Model confidence score

Admin dashboard

Faster inference using caching
