
import os
import joblib
from django.apps import AppConfig



class PredictionsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'predictions'

    # Class variables to hold model and status
    model = None
    model_loaded = False

    def ready(self):
        model_path = os.path.join(os.path.dirname(__file__), 'models', 'crop_model.pkl')
        try:
            self.model = joblib.load(model_path)
            self.model_loaded = True
        except Exception:
            self.model = None
            self.model_loaded = False
