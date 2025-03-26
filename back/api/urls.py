from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # PROFESSORES
    path('professores', listar_professores),
    path('prof', ProfessoresView.as_view()),
    path('professor/<int:pk>', ProfessoresDetailView.as_view()),
    path('professor', ProfessoresDetailView.as_view()),

    # TOKEN
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # DISCIPLINA
    path('disciplina/<int:pk>', DisciplinasDetailView.as_view()),
    path('disciplinas', DisciplinasView.as_view()),

    # TURMA
    path('turma/<int:pk>', TurmasDetailView.as_view()),
    path('turmas', TurmasView.as_view()),

    # CURSO
    path('curso/<int:pk>', CursosDetailView.as_view()),
    path('cursos', CursosView.as_view()),
    path('tipo_curso_choices', get_tipo_curso_choices),

    # AMBIENTE
    path('ambiente/<int:pk>', AmbientesDetailView.as_view()),
    path('ambientes', AmbientesView.as_view()),
    path('periodo_choices', get_periodo_choices),
    
]

