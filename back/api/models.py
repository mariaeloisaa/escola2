from django.db import models

class Professor(models.Model):
    ni = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    tel = models.CharField(max_length=255)
    ocupacao = models.FloatField()
    

class Disciplina(models.Model):
    disciplina = models.CharField(max_length=255)
    codigo = models.CharField(max_length=255)
    cargaHora = models.IntegerField()


class Turma(models.Model):
    codigo = models.CharField(max_length=255)
    turma = models.CharField(max_length=255)

class Curso(models.Model):

    TIPOS_CURSOS = [
        ("CT", "Curso técnico"),
        ("CAI", "Curso Aprendizagem Industrial"),
        ("CS", "Curso Superior"),
        ("FIC", "Formação Inicial e Continuada"),
    ]

    codigo = models.CharField(max_length=255)
    curso = models.CharField(max_length=255)
    tipo_curso = models.CharField(max_length=5, choices=TIPOS_CURSOS, default="CT")
    horas_aula = models.FloatField()
    sigla = models.CharField(max_length=255)

class Ambiente(models.Model):

    PERIODOS = [
        ("M", "Matutino"),
        ("T", "Vespertino"),
        ("N", "Noturno"),
        ("S", "Integral"),
    ]

    codigo = models.CharField(max_length=255)
    sala = models.CharField(max_length=255)
    capacidade = models.IntegerField()
    responsavel = models.CharField(max_length=255)
    periodo = models.CharField(max_length=1, choices=PERIODOS, default="M")
    