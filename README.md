Placement Preparation Tracker
A full-stack web application that helps students track their placement preparation by monitoring topics studied, confidence levels, and automatically identifying weak areas for focused revision.

🚀 Features
Add preparation progress for DSA, Core subjects, and Aptitude
Free-text topic entry (user can type any topic)
Confidence-based analysis (1–5 scale)
Automatic identification of Weak Areas
Today’s Focus recommendation based on current weak topics
Dynamic Focus Score to reflect preparation status
Clean dashboard-style UI
🛠️ Tech Stack
Frontend
React
Tailwind CSS
Axios
Backend
Flask (Python)
REST APIs
Database
MongoDB
📂 Project Structure
placement-prep-tracker/ │ ├── backend/ │ ├── app.py │ ├── db.py │ └── requirements.txt │ ├── frontend/ │ ├── src/ │ │ ├── pages/ │ │ │ ├── Dashboard.js │ │ │ ├── AddProgress.js │ │ │ ├── WeakAreas.js │ │ └── App.js │ └── package.json │ └── README.md

▶️ How to Run the Project
1️⃣ Start MongoDB
Open MongoDB Compass
Click Connect
Keep it running
2️⃣ Run Backend (Flask)
cd backend
venv\Scripts\activate   # if virtual environment exists
pip install flask flask-cors pymongo
python app.py
http://127.0.0.1:5000
3️⃣ Run Frontend (React)
Open a new terminal:

cd frontend

npm install

npm start

Frontend runs on:

http://localhost:3000

🧠 How It Works
User adds topics with confidence level

Each topic maintains a single current state (latest update wins)

Topics with confidence ≤ 2 are marked as Weak Areas

Dashboard updates instantly after each entry

Today’s Focus suggests one weak topic for revision

📈 Learning Outcomes
Full-stack application development

REST API design

MongoDB update-based data modeling

State-driven UI updates in React

Real-world debugging and UX-focused logic

👤 Author
Mellam Prahasini B.Tech Student | Full-Stack Development Enthusiast
