"""
Export the trained Random Forest model to a lightweight JSON format.
This allows inference without scikit-learn, pandas, numpy at runtime.
"""

import os
import json
import joblib
import numpy as np

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(SCRIPT_DIR, "churn_model.pkl")
ENCODERS_PATH = os.path.join(SCRIPT_DIR, "label_encoders.pkl")
SCALER_PATH = os.path.join(SCRIPT_DIR, "scaler.pkl")
COLUMNS_PATH = os.path.join(SCRIPT_DIR, "columns.pkl")
OUTPUT_PATH = os.path.join(SCRIPT_DIR, "model_export.json")


def export():
    print("Loading model artifacts...")
    model = joblib.load(MODEL_PATH)
    label_encoders = joblib.load(ENCODERS_PATH)
    scaler = joblib.load(SCALER_PATH)
    columns_info = joblib.load(COLUMNS_PATH)

    # ─── Export label encoders ───────────────────────────────────
    encoders_export = {}
    for col, le in label_encoders.items():
        encoders_export[col] = {
            cls: int(idx) for idx, cls in enumerate(le.classes_)
        }

    # ─── Export scaler ───────────────────────────────────────────
    scaler_export = {
        "mean": scaler.mean_.tolist(),
        "scale": scaler.scale_.tolist(),
        "feature_names": columns_info["numerical_cols"],
    }

    # ─── Export Random Forest trees ──────────────────────────────
    trees_export = []
    for estimator in model.estimators_:
        tree = estimator.tree_
        tree_data = {
            "children_left": tree.children_left.tolist(),
            "children_right": tree.children_right.tolist(),
            "feature": tree.feature.tolist(),
            "threshold": tree.threshold.tolist(),
            "value": [
                [v[0].tolist(), v[1].tolist()] if len(v) > 1 else [v[0].tolist()]
                for v in tree.value
            ],
            "n_classes": int(tree.n_classes[0]) if hasattr(tree.n_classes, '__len__') else int(tree.n_classes),
        }
        trees_export.append(tree_data)

    # ─── Build full export ───────────────────────────────────────
    export_data = {
        "model_type": "RandomForestClassifier",
        "n_estimators": len(trees_export),
        "feature_columns": columns_info["feature_columns"],
        "categorical_cols": columns_info["categorical_cols"],
        "numerical_cols": columns_info["numerical_cols"],
        "label_encoders": encoders_export,
        "scaler": scaler_export,
        "trees": trees_export,
    }

    # ─── Save ────────────────────────────────────────────────────
    with open(OUTPUT_PATH, "w") as f:
        json.dump(export_data, f)

    file_size = os.path.getsize(OUTPUT_PATH)
    print(f"\n✓ Exported to: {OUTPUT_PATH}")
    print(f"✓ File size: {file_size / 1024 / 1024:.2f} MB")
    print(f"✓ Trees: {len(trees_export)}")
    print(f"✓ Features: {len(columns_info['feature_columns'])}")
    print("\nDone! Now api/index.py can run without scikit-learn.")


if __name__ == "__main__":
    export()
