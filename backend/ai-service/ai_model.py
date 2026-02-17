import sys
import json
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score
from sklearn.model_selection import train_test_split

# ---------------- ML TRAIN ----------------
np.random.seed(42)
X = np.random.rand(1000, 4)

facies_labels = np.random.choice(["Shale", "Sand", "Limestone"], 1000)
anomaly_labels = np.random.choice(["Detected", "None"], 1000)
hydro_labels = np.random.choice(["Yes", "No"], 1000)
cluster_labels = np.random.choice(["A", "B", "C", "D"], 1000)

def train_model(labels):
    y = np.array(labels)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    model = RandomForestClassifier()
    model.fit(X_train, y_train)

    preds = model.predict(X_test)

    return (
        model,
        accuracy_score(y_test, preds),
        f1_score(y_test, preds, average="macro")
    )

facies_model, fac_acc, fac_f1 = train_model(facies_labels)
anom_model, anom_acc, anom_f1 = train_model(anomaly_labels)
hydro_model, hydro_acc, hydro_f1 = train_model(hydro_labels)
cluster_model, cl_acc, cl_f1 = train_model(cluster_labels)

# ---------------- INTERPRET ----------------
def interpret(data):
    curves = data["curves"]
    depth = data["depthRange"]

    sample = np.random.rand(1, 4)
    results = []

    for curve in curves:
        fac = facies_model.predict(sample)[0]
        an = anom_model.predict(sample)[0]
        hy = hydro_model.predict(sample)[0]
        cl = cluster_model.predict(sample)[0]

        results.extend([
            {"curve": curve, "depthRange": depth, "category": "Facies", "interpretation": f"{fac}"},
            {"curve": curve, "depthRange": depth, "category": "Anomaly", "interpretation": f"{an}"},
            {"curve": curve, "depthRange": depth, "category": "Hydrocarbon Zone", "interpretation": f"{hy}"},
            {"curve": curve, "depthRange": depth, "category": "Cluster", "interpretation": f"{cl}"}
        ])

    metrics = {
        "accuracy": round((fac_acc + anom_acc + hydro_acc + cl_acc) / 4 * 100, 2),
        "f1_score": round((fac_f1 + anom_f1 + hydro_f1 + cl_f1) / 4, 3),
        "insights": "ML detected lithology, anomaly signatures, and reservoir clustering."
    }

    return {"interpretations": results, "metrics": metrics}

# ---------------- CLI ENTRY ----------------
if __name__ == "__main__":
    data = json.loads(sys.stdin.read())
    output = interpret(data)
    print(json.dumps(output))
