from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np

app = FastAPI(
    title="Heart Disease Prediction API",
    description="API dự đoán phần trăm nguy cơ mắc bệnh tim bằng Machine Learning",
    version="1.0"
)

try:
    model = joblib.load('../TrainingModel/best_heart_disease_model.pkl')
    scaler = joblib.load('../TrainingModel/scaler.pkl')
except Exception as e:
    print(f"Lỗi khi tải file pkl: {e}. Đảm bảo các file pkl nằm cùng thư mục với app.py")

class PatientData(BaseModel):
    age: float
    trestbps: float
    chol: float
    thalach: float
    oldpeak: float
    # Thêm các cột phân loại (category) của bạn vào đây dưới dạng số hoặc chữ tùy tập dữ liệu gốc
    sex: int
    cp: int
    fbs: int
    restecg: int
    exang: int
    slope: int
    ca: int  # <-- THÊM DÒNG NÀY VÀO ĐÂY
    thal: int

# 4. Tạo Endpoint chính để dự đoán nguy cơ bệnh
@app.post("/predict")
def predict_heart_disease(patient: PatientData):
    # 1. Chuyển JSON thành Dictionary
    data_dict = patient.model_dump()
    
    # 2. Tạo thành DataFrame ban đầu
    df_input = pd.DataFrame([data_dict])
    
    # 3. ÉP THỨ TỰ CỘT TRÙNG KHỚP 100% VỚI LÚC TRAIN
    # (Đoạn này cực kỳ quan trọng để sửa dứt điểm lỗi của bạn)
    correct_mapping_cols = [
        'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 
        'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
    ]
    df_input = df_input[correct_mapping_cols]
    
    # 4. Chỉ định danh sách cột cần scale
    num_cols = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
    
    # 5. Thực hiện scale dữ liệu số liên tục
    df_input[num_cols] = scaler.transform(df_input[num_cols])
    
    # 6. Đưa vào mô hình dự đoán xác suất (Dòng 54 cũ của bạn)
    probabilities = model.predict_proba(df_input)
    
    # 7. Tính phần trăm và làm tròn 2 chữ số thập phân
    risk_percent = round(probabilities[0][1] * 100, 2)
    
    return {
        "status": "success",
        "risk_percentage": risk_percent,
        "message": f"Bệnh nhân có {risk_percent}% nguy cơ mắc bệnh tim."
    }
# Endpoint kiểm tra trạng thái API
@app.get("/")
def read_root():
    return {"message": "API dự đoán bệnh tim đang hoạt động ổn định!"}