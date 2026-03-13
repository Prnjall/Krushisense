from django.db import models

class Prediction(models.Model):
	timestamp = models.DateTimeField(auto_now_add=True)
	state = models.CharField(max_length=50)
	district = models.CharField(max_length=50)
	season = models.CharField(max_length=10)
	nitrogen = models.FloatField()
	phosphorus = models.FloatField()
	potassium = models.FloatField()
	ph = models.FloatField()
	top_crop = models.CharField(max_length=50)
	top_crop_suitability = models.FloatField()
	expected_yield_min = models.FloatField(null=True, blank=True)
	expected_yield_max = models.FloatField(null=True, blank=True)

	def __str__(self):
		return f"{self.timestamp} - {self.top_crop} ({self.state}, {self.district})"
