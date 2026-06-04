from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:4000",
]

model = joblib.load("framing_ham_heart_disease_model.pkl")
scaler = joblib.load("scaler.pkl")

class PatientData(BaseModel):
    male: int
    age: int
    education: float
    currentSmoker: int
    cigsPerDay: float
    BPMeds: float
    prevalentStroke: int
    prevalentHyp: int
    diabetes: int
    totChol: float
    sysBP: float
    diaBP: float
    BMI: float
    heartRate: float
    glucose: float

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/predict")
def predict(data: PatientData):

    df = pd.DataFrame([data.dict()])

    df = scaler.transform(df)

    prediction = model.predict(df)[0]

    probability = model.predict_proba(df)[0]

    return {
        "prediction": int(prediction),
        "no_disease_percent": round(probability[0] * 100, 2),
        "disease_percent": round(probability[1] * 100, 2)
    }
