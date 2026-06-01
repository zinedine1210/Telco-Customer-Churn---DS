"""
FastAPI backend for Telco Customer Churn Prediction.
Endpoint: POST /api/predict
"""

import os
import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional

# ─── Paths ───────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(SCRIPT_DIR, "model")
MODEL_PATH = os.path.join(MODEL_DIR, "churn_model.pkl")
ENCODERS_PATH = os.path.join(MODEL_DIR, "label_encoders.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")
COLUMNS_PATH = os.path.join(MODEL_DIR, "columns.pkl")

# ─── Load model artifacts ───────────────────────────────────────────
model = joblib.load(MODEL_PATH)
label_encoders = joblib.load(ENCODERS_PATH)
scaler = joblib.load(SCALER_PATH)
columns_info = joblib.load(COLUMNS_PATH)

feature_columns = columns_info["feature_columns"]
categorical_cols = columns_info["categorical_cols"]
numerical_cols = columns_info["numerical_cols"]

# ─── FastAPI App ─────────────────────────────────────────────────────
app = FastAPI(
    title="Telco Churn Prediction API",
    description="Predict customer churn probability based on customer attributes.",
    version="1.0.0",
)

# CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Request Schema ─────────────────────────────────────────────────
class CustomerData(BaseModel):
    gender: str = Field(..., description="Male or Female")
    SeniorCitizen: int = Field(..., description="0 or 1")
    Partner: str = Field(..., description="Yes or No")
    Dependents: str = Field(..., description="Yes or No")
    tenure: int = Field(..., ge=0, description="Months as customer")
    PhoneService: str = Field(..., description="Yes or No")
    MultipleLines: str = Field(..., description="Yes, No, or No phone service")
    InternetService: str = Field(..., description="DSL, Fiber optic, or No")
    OnlineSecurity: str = Field(..., description="Yes, No, or No internet service")
    OnlineBackup: str = Field(..., description="Yes, No, or No internet service")
    DeviceProtection: str = Field(..., description="Yes, No, or No internet service")
    TechSupport: str = Field(..., description="Yes, No, or No internet service")
    StreamingTV: str = Field(..., description="Yes, No, or No internet service")
    StreamingMovies: str = Field(..., description="Yes, No, or No internet service")
    Contract: str = Field(..., description="Month-to-month, One year, or Two year")
    PaperlessBilling: str = Field(..., description="Yes or No")
    PaymentMethod: str = Field(
        ...,
        description="Electronic check, Mailed check, Bank transfer (automatic), or Credit card (automatic)",
    )
    MonthlyCharges: float = Field(..., ge=0, description="Monthly charges amount")
    TotalCharges: float = Field(..., ge=0, description="Total charges amount")


# ─── Response Schema ────────────────────────────────────────────────
class PredictionResponse(BaseModel):
    churn_probability: float
    prediction: str
    risk_level: str
    recommendation: str


# ─── Endpoints ───────────────────────────────────────────────────────
@app.get("/api/health")
def health_check():
    return {"status": "healthy", "model": "RandomForestClassifier", "version": "1.0.0"}


@app.post("/api/predict", response_model=PredictionResponse)
def predict_churn(customer: CustomerData):
    try:
        # Build dataframe from input
        data = customer.model_dump()
        df = pd.DataFrame([data])

        # Encode categorical columns
        for col in categorical_cols:
            if col in df.columns:
                le = label_encoders[col]
                try:
                    df[col] = le.transform(df[col].astype(str))
                except ValueError:
                    # Handle unseen labels — use the most common class
                    df[col] = le.transform([le.classes_[0]])[0]

        # Scale numerical columns
        df[numerical_cols] = scaler.transform(df[numerical_cols])

        # Ensure column order matches training
        df = df[feature_columns]

        # Predict
        proba = model.predict_proba(df)[0]
        churn_prob = float(proba[1]) * 100  # percentage

        # Determine risk level
        if churn_prob < 30:
            risk_level = "Low"
            recommendation = "Customer ini memiliki risiko churn yang rendah. Pertahankan kualitas layanan saat ini dan berikan penawaran loyalitas untuk menjaga kepuasan pelanggan."
        elif churn_prob < 60:
            risk_level = "Medium"
            recommendation = "Customer ini memiliki risiko churn sedang. Pertimbangkan untuk menawarkan diskon atau upgrade layanan untuk meningkatkan retensi. Hubungi customer untuk mengetahui keluhannya."
        else:
            risk_level = "High"
            recommendation = "⚠️ Customer ini berisiko tinggi untuk churn! Segera lakukan intervensi: tawarkan kontrak jangka panjang dengan diskon, upgrade layanan gratis, atau hubungi langsung untuk menyelesaikan masalah."

        prediction = "Churn" if churn_prob >= 50 else "Not Churn"

        return PredictionResponse(
            churn_probability=round(churn_prob, 2),
            prediction=prediction,
            risk_level=risk_level,
            recommendation=recommendation,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


@app.get("/api/model-info")
def model_info():
    """Return model metadata and feature information."""
    return {
        "model_type": "RandomForestClassifier",
        "n_estimators": 200,
        "features": feature_columns,
        "categorical_features": categorical_cols,
        "numerical_features": numerical_cols,
        "total_features": len(feature_columns),
    }
