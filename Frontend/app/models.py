from django.db import models

# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=200)

class Lectura(models.Model):
    fechayHora  = models.DateTimeField()
    temperatura = models.CharField(max_length=200)
    humedadRel  = models.CharField(max_length=200)
    humedadAbs  = models.CharField(max_length=200)
    velocidadVi = models.CharField(max_length=200)
    direccionVi = models.CharField(max_length=200)
    presionBaro = models.CharField(max_length=200)
