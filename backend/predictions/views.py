# Temporary test for model predictions
if __name__ == "__main__":
    import joblib
    from pathlib import Path
    model_path = Path(__file__).resolve().parent / "models" / "crop_recommendation_model.pkl"
    model = joblib.load(model_path)
    test_inputs = [
        [90, 42, 43, 20, 80, 6.5, 200],
        [20, 20, 20, 25, 60, 7, 50]
    ]
    for i, inp in enumerate(test_inputs):
        pred = model.predict([inp])[0]
        print(f"Test input {i+1}: {inp} => Predicted crop: {pred}")
import json
from pathlib import Path
import joblib

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET


# ==============================
# Load ML Models
# ==============================

BASE_DIR = Path(__file__).resolve().parent
MODELS_DIR = BASE_DIR / "models"

crop_model_path = MODELS_DIR / "crop_recommendation_model.pkl"
yield_model_path = MODELS_DIR / "yield_prediction_model.pkl"


def load_model(path):
    try:
        return joblib.load(path)
    except Exception as e:
        print("Model load error:", e)
        return None


crop_recommendation_model = load_model(crop_model_path)
yield_prediction_model = load_model(yield_model_path)

print("Crop model loaded:", crop_recommendation_model is not None)
print("Yield model loaded:", yield_prediction_model is not None)


# ==============================
# Crop Prediction API
# ==============================

@csrf_exempt
@require_POST
def predict_crop_view(request):
    try:
        print("Predict crop API called")
        print("Raw request body:", request.body)
        data = json.loads(request.body.decode("utf-8"))

        nitrogen = float(data["nitrogen"])
        phosphorus = float(data["phosphorus"])
        potassium = float(data["potassium"])
        ph = float(data["ph"])
        temperature = float(data["temperature"])
        humidity = float(data["humidity"])
        rainfall = float(data["rainfall"])

        print(f"Parsed values: N={nitrogen}, P={phosphorus}, K={potassium}, Temp={temperature}, Humidity={humidity}, pH={ph}, Rainfall={rainfall}")

        model_input = [[
            nitrogen,
            phosphorus,
            potassium,
            temperature,
            humidity,
            ph,
            rainfall
        ]]
        print("Model input:", model_input)

        if crop_recommendation_model is None:
            print("Prediction error: Crop recommendation model not loaded")
            return JsonResponse({
                "success": False,
                "error": "Crop recommendation model not loaded"
            }, status=500)

        # Get probability scores for all crops
        proba = crop_recommendation_model.predict_proba(model_input)[0]
        # Get class labels
        class_labels = crop_recommendation_model.classes_
        # Pair labels with probabilities
        label_proba = list(zip(class_labels, proba))
        # Sort by probability descending
        label_proba_sorted = sorted(label_proba, key=lambda x: x[1], reverse=True)
        # Select top 3 crop labels
        top_crops = [label for label, _ in label_proba_sorted[:3]]
        print("Top 3 predicted crops:", top_crops)

        return JsonResponse({
            "success": True,
            "top_crops": top_crops
        })

    except Exception as e:
        print("Prediction error:", e)
        return JsonResponse({
            "success": False,
            "error": str(e)
        }, status=500)


# ==============================
# Yield Prediction API
# ==============================

@csrf_exempt
@require_POST
def predict_yield_view(request):
    try:
        data = json.loads(request.body.decode("utf-8"))

        nitrogen = float(data["nitrogen"])
        phosphorus = float(data["phosphorus"])
        potassium = float(data["potassium"])
        temperature = float(data["temperature"])
        humidity = float(data["humidity"])
        ph = float(data["ph"])
        rainfall = float(data["rainfall"])

        if yield_prediction_model is None:
            return JsonResponse({
                "success": False,
                "error": "Yield prediction model not loaded"
            }, status=500)

        model_input = [[
            nitrogen,
            phosphorus,
            potassium,
            temperature,
            humidity,
            ph,
            rainfall
        ]]

        yield_pred = yield_prediction_model.predict(model_input)[0]

        yield_min = round(yield_pred - 1.5, 1)
        yield_max = round(yield_pred + 1.5, 1)

        return JsonResponse({
            "success": True,
            "yield_min": yield_min,
            "yield_max": yield_max,
            "unit": "quintal/hectare"
        })

    except Exception as e:
        return JsonResponse({
            "success": False,
            "error": str(e)
        }, status=500)


# ==============================
# Health Check API
# ==============================

@require_GET
def health_check_view(request):
    models_loaded = (
        crop_recommendation_model is not None and
        yield_prediction_model is not None
    )

    return JsonResponse({
        "status": "healthy",
        "models_loaded": models_loaded
    })