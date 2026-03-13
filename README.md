# KrushiSense – Crop Recommendation System

## Description
KrushiSense is a machine learning-based crop recommendation system designed to help farmers identify the most suitable crops to grow based on soil and environmental conditions. The system analyzes the following parameters:

- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Soil pH
- Temperature
- Humidity
- Rainfall

Based on these inputs, the model predicts the top 3 crops suitable for the given conditions.

## Features
- Interactive multi-step input wizard
- Soil parameter-based crop prediction
- Top 3 crop recommendations
- Crop names displayed in English, Hindi, and Marathi
- Background video landing page
- Farmer-friendly UI
- Multilingual interface
- Modern results dashboard

## Technologies Used

**Frontend:**
- React
- TypeScript
- TailwindCSS

**Backend:**
- Python
- Django

**Machine Learning:**
- Crop Recommendation Model trained on agricultural dataset

## Project Structure

```
backend/           # Django backend and ML model
  ├── backend/     # Django project files
  ├── ml/         # Machine learning scripts and data
  └── predictions/ # Django app for predictions
frontend/          # React frontend (TypeScript + TailwindCSS)
  ├── src/        # Source code (components, pages, assets)
  └── public/     # Static assets
```

- **backend/**: Contains the Django project, ML training scripts, and prediction logic.
- **frontend/**: Contains the React app, UI components, and static assets.

## Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd "Agri Analysis"
   ```

2. **Backend Setup:**
   - Create and activate a Python virtual environment:
     ```sh
     python -m venv .venv
     # On Windows:
     .venv\Scripts\activate
     # On macOS/Linux:
     source .venv/bin/activate
     ```
   - Install dependencies:
     ```sh
     pip install -r requirements.txt
     ```
   - Run migrations:
     ```sh
     cd backend
     python manage.py migrate
     ```
   - Start the backend server:
     ```sh
     python manage.py runserver
     ```

3. **Frontend Setup:**
   - Install Node.js (if not already installed).
   - Install dependencies:
     ```sh
     cd frontend
     npm install
     ```
   - Start the frontend server:
     ```sh
     npm run dev
     ```

## Usage

1. Start the backend server (see above).
2. Start the frontend server (see above).
3. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to use the application.

## Future Improvements
- Real-time weather API integration
- Mobile-friendly responsive design
- Farmer advisory system
- Market price prediction for crops
- Enhanced data visualization and analytics
- User authentication and personalized dashboards

---

Feel free to contribute or suggest new features to make KrushiSense more helpful for farmers!
