# Topo AI Project

This repository contains the full-stack solution for the **AI Application Developer Internship Technical Assessment** at **Topo Consulting**. The project involves **data ingestion, processing, and visualization** using **Flask** for the backend and **React.js** for the frontend.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Overview

This project processes structured and unstructured data from **CSV, JSON, PDF, and PPTX files**. The backend extracts and processes data, while the frontend presents the results in a clean and interactive dashboard.

## Technologies Used

### Backend:
- Python (Flask, Pandas, PyPDF2, python-pptx)
- Flask-CORS for API communication
- Data ingestion from CSV, JSON, PDF, PPTX

### Frontend:
- React.js (with React Router, Axios)
- Material-UI (for improved UI components)

### Database:
- No database (data processing is done in-memory)

## Project Structure

topo_ai_project/ 
├── src/ 
│ ├── app.py # Flask application 
│ ├── ingestion.py # Data ingestion module 
│ ├── processing.py # Data processing module 
│ ├── requirements.txt # Python dependencies 
│── frontend/ # Frontend (React) source code 
│ ├── src/ 
│ │ ├── components/ # React components (Table, Dashboard) 
│ │ ├── App.js # Main React component 
│ │ ├── index.js # React entry point 
│ ├── package.json # Frontend dependencies 
│── README.md # Project documentation 
│── .gitignore # Git ignore file

## Setup Instructions

### Backend Setup (Flask)
1. **Clone the repository**:
   ```bash
   git clone https://github.com/JINGYANGGGGGGG/topo-ai-project.git
   cd topo-ai-project/backend
2. **Create a virtual environment & install dependencies**:
   python -m venv env
   source env/bin/activate  # Mac/Linux
   env\\Scripts\\activate   # Windows

   pip install -r requirements.txt

3. **Run the Flask backend**:
   python src/app.py

### Frontend Setup (React)
1. **Navigate to the frontend directory:**:
   cd ../frontend

2. **Install dependencies**:
   npm install

3. **Start the React development server**:
   npm start

## Usage
- Access the frontend at http://localhost:3000
- The backend API runs at http://127.0.0.1:5000/api/data
- The React app fetches and visualizes the processed data

## API Endpoints
- Method: GET
- Endpoint - /api/data
- Description - Fetches processed data

## Deployment
- For production deployment: use gunicorn for Flask, use Vite or build for React

## Troubleshooting
- if npm install fails due to dependency conflicts, try: npm install --legacy-peer-deps
- If git is not recognized, install git

Dated February 2025
