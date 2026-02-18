# One Geo Project — Well Log Visualization & AI Interpretation

## Overview

This project implements a simplified full-stack engineering system for analyzing subsurface well-log data from LAS (Log ASCII Standard) files.

The system ingests well data, visualizes depth-indexed curves, performs AI-assisted interpretation, and provides a conversational chatbot interface for querying insights.

The focus is on software engineering architecture, data pipelines, and interactive AI-assisted analytics — not geology domain knowledge.

---

## Live Demo

Deployment URL:
Frontend (demo UI):
👉 **https://one-geo-project-1.onrender.com/**

Local Demo:
Runs fully on local machine using Node + Python backend.

---

## Tech Stack

Frontend

* React.js
* Plotly.js (interactive visualization)
* Axios

Backend

* Node.js (API gateway)
* Python AI service (Flask + ML models)

AI / ML

* Scikit-learn
* Random Forest classifiers
* Synthetic training pipeline
* Live inference

---

## Architecture

Frontend ↔ Node API ↔ Python AI Service

* Frontend handles visualization + UI
* Node backend manages API orchestration
* Python AI service runs ML inference + chatbot logic
* Services communicate via structured JSON APIs

Sensitive logic stays server-side.

---

## Step 1 — Architecture

The application is built with a clean separation of concerns:

* React frontend for visualization & user interaction
* Node backend for routing & orchestration
* Python AI microservice for ML interpretation
* Chatbot module integrated into the AI service

All communication happens through REST APIs.

---

## Step 2 — File Ingestion & Storage

The system supports LAS file ingestion.

Workflow:

1. LAS file uploaded via UI
2. Parsed into structured curve data
3. Stored in backend memory/database format
4. Curves exposed via API for visualization

Design choice:

* JSON curve storage optimized for fast depth lookup
* Lightweight structure suited for real-time visualization
* Can be extended to S3 + database persistence

---

## Step 3 — Visualization

Interactive well-log plotting:

* Select curves dynamically
* Filter by depth range
* Zoom / pan supported
* Depth-indexed Plotly rendering
* Scrollable depth table

Visualization updates live from backend API.

---

## Step 4 — AI-Assisted Interpretation

User selects:

* Curves
* Depth range

AI pipeline performs:

* Facies classification
* Anomaly detection
* Hydrocarbon prediction
* Cluster analysis

Outputs:

* Interpreted zones
* Model metrics (accuracy, F1 score)
* AI confidence summary
* Colored interpretation table

Inference is performed live on request.

---

## Step 5 — Chatbot Interface

A conversational AI chatbot answers data-driven questions.

It understands queries about:

* Facies zones
* Anomalies
* Hydrocarbon indicators
* Cluster groupings
* Model accuracy
* F1 score
* Confidence explanation

Example questions:

> How many facies zones are detected?
> Are there anomalies?
> What is the model accuracy?
> Explain hydrocarbon zones.

The chatbot uses interpretation results as context.

---

## Step 6 — Deployment

The system is fully deployed using Render cloud hosting.

Deployment architecture:

*React frontend → Render Static Site

*Node backend → Render Web Service

*Python AI service → integrated inside backend container

Frontend:
https://one-geo-project-1.onrender.com

CORS configured for cross-service communication.

The deployed system supports:

*File ingestion

*Visualization APIs

*AI interpretation

*Chatbot interface

The demo runs entirely in the cloud.

---

## Local Setup Instructions

### Backend

```bash
cd backend
npm install
node server.js
```

Runs on:

http://localhost:5000

---

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs on:

http://localhost:3000

---

## API Endpoints

POST /api/interpret
Runs AI interpretation

POST /api/chatbot
Chatbot question answering

GET /api/visualization/*
Curve visualization data

---


---

## Author

Tanisha M.
Full-stack AI well-log analytics system

---

## License

Academic / educational use
