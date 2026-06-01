"""
FastAPI backend for Telco Customer Churn Prediction (Pure Python Inference).
Endpoint: POST /api/predict
"""

import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional

# ─── Paths ───────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_EXPORT_PATH = os.path.join(SCRIPT_DIR, "model", "model_export.json")

# ─── Load JSON model ────────────────────────────────────────────────
if not os.path.exists(MODEL_EXPORT_PATH):
    raise RuntimeError(f"Model export file not found at: {MODEL_EXPORT_PATH}")

with open(MODEL_EXPORT_PATH, "r") as f:
    model_data = json.load(f)

feature_columns = model_data["feature_columns"]
categorical_cols = model_data["categorical_cols"]
numerical_cols = model_data["numerical_cols"]
label_encoders = model_data["label_encoders"]
scaler_info = model_data["scaler"]
trees = model_data["trees"]

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


# Helper function for traversing a tree
def predict_tree(tree, x):
    node = 0
    children_left = tree["children_left"]
    children_right = tree["children_right"]
    feature = tree["feature"]
    threshold = tree["threshold"]
    value = tree["value"]
    
    while True:
        left = children_left[node]
        right = children_right[node]
        if left == -1 and right == -1:
            return value[node][0]
        
        feat = feature[node]
        val = x[feat]
        thresh = threshold[node]
        if val <= thresh:
            node = left
        else:
            node = right


# ─── Endpoints ───────────────────────────────────────────────────────
@app.get("/api/health")
def health_check():
    return {"status": "healthy", "model": "RandomForestClassifier", "version": "1.0.0"}


@app.post("/api/predict", response_model=PredictionResponse)
def predict_churn(customer: CustomerData):
    try:
        # Build dict from input
        data = customer.model_dump()

        # Preprocess features into a flat list in the correct order
        x_features = []
        for col in feature_columns:
            if col in numerical_cols:
                val = float(data[col])
                # Scale
                idx = numerical_cols.index(col)
                mean = scaler_info["mean"][idx]
                scale = scaler_info["scale"][idx]
                scaled = (val - mean) / scale
                x_features.append(scaled)
            else:
                val_str = str(data[col])
                encoded_dict = label_encoders[col]
                # Default to 0 or first class value if category is unseen
                encoded = encoded_dict.get(val_str, 0)
                x_features.append(encoded)

        # Predict churn probability by averaging the predictions from all trees
        probs = []
        for tree in trees:
            val = predict_tree(tree, x_features)
            # val is [prob_class_0, prob_class_1]
            probs.append(val[1])

        churn_prob = (sum(probs) / len(probs)) * 100  # percentage

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
        "n_estimators": len(trees),
        "features": feature_columns,
        "categorical_features": categorical_cols,
        "numerical_features": numerical_cols,
        "total_features": len(feature_columns),
    }

