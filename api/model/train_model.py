"""
Train a Random Forest Classifier for Telco Customer Churn Prediction.
Saves the model pipeline as churn_model.pkl.
"""

import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.metrics import classification_report, accuracy_score
import joblib

# ─── Paths ───────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", ".."))
DATA_PATH = os.path.join(PROJECT_ROOT, "telco_customer_churn.csv")
MODEL_PATH = os.path.join(SCRIPT_DIR, "churn_model.pkl")
ENCODERS_PATH = os.path.join(SCRIPT_DIR, "label_encoders.pkl")
SCALER_PATH = os.path.join(SCRIPT_DIR, "scaler.pkl")
COLUMNS_PATH = os.path.join(SCRIPT_DIR, "columns.pkl")


def train():
    print("=" * 60)
    print("  Telco Customer Churn — Model Training")
    print("=" * 60)

    # ─── Load data ───────────────────────────────────────────────
    df = pd.read_csv(DATA_PATH)
    print(f"\n✓ Loaded dataset: {df.shape[0]} rows, {df.shape[1]} columns")

    # ─── Drop customerID ─────────────────────────────────────────
    df = df.drop("customerID", axis=1)

    # ─── Handle TotalCharges (has some spaces → missing) ─────────
    df["TotalCharges"] = pd.to_numeric(df["TotalCharges"], errors="coerce")
    df["TotalCharges"].fillna(df["TotalCharges"].median(), inplace=True)

    # ─── Encode target ───────────────────────────────────────────
    df["Churn"] = df["Churn"].map({"Yes": 1, "No": 0})

    # ─── Separate features and target ────────────────────────────
    X = df.drop("Churn", axis=1)
    y = df["Churn"]

    # ─── Identify column types ───────────────────────────────────
    categorical_cols = X.select_dtypes(include=["object"]).columns.tolist()
    numerical_cols = X.select_dtypes(include=["int64", "float64"]).columns.tolist()

    print(f"  Categorical features ({len(categorical_cols)}): {categorical_cols}")
    print(f"  Numerical features ({len(numerical_cols)}): {numerical_cols}")

    # ─── Label encode categorical columns ────────────────────────
    label_encoders = {}
    for col in categorical_cols:
        le = LabelEncoder()
        X[col] = le.fit_transform(X[col].astype(str))
        label_encoders[col] = le

    # ─── Scale numerical columns ─────────────────────────────────
    scaler = StandardScaler()
    X[numerical_cols] = scaler.fit_transform(X[numerical_cols])

    # ─── Save column order ───────────────────────────────────────
    feature_columns = X.columns.tolist()

    # ─── Train/test split ────────────────────────────────────────
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"\n✓ Split: {X_train.shape[0]} train, {X_test.shape[0]} test")

    # ─── Train Random Forest ─────────────────────────────────────
    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=15,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1,
    )
    model.fit(X_train, y_train)
    print("\n✓ Model trained: RandomForestClassifier (200 trees)")

    # ─── Evaluate ────────────────────────────────────────────────
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\n{'─' * 40}")
    print(f"  Accuracy: {accuracy:.4f} ({accuracy * 100:.2f}%)")
    print(f"{'─' * 40}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=["Not Churn", "Churn"]))

    # ─── Feature importance ──────────────────────────────────────
    importances = model.feature_importances_
    feat_imp = sorted(
        zip(feature_columns, importances), key=lambda x: x[1], reverse=True
    )
    print("\nTop 10 Feature Importances:")
    for feat, imp in feat_imp[:10]:
        print(f"  {feat:25s} → {imp:.4f}")

    # ─── Save artifacts ──────────────────────────────────────────
    joblib.dump(model, MODEL_PATH)
    joblib.dump(label_encoders, ENCODERS_PATH)
    joblib.dump(scaler, SCALER_PATH)
    joblib.dump(
        {
            "feature_columns": feature_columns,
            "categorical_cols": categorical_cols,
            "numerical_cols": numerical_cols,
        },
        COLUMNS_PATH,
    )

    print(f"\n✓ Model saved to:    {MODEL_PATH}")
    print(f"✓ Encoders saved to: {ENCODERS_PATH}")
    print(f"✓ Scaler saved to:   {SCALER_PATH}")
    print(f"✓ Columns saved to:  {COLUMNS_PATH}")
    print("\n" + "=" * 60)
    print("  Training complete!")
    print("=" * 60)


if __name__ == "__main__":
    train()
