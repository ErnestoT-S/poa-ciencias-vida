import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Users, 
  CheckCircle2, 
  Circle, 
  Clock, 
  MapPin, 
  FileText,
  ChevronDown,
  ChevronUp,
  Edit
} from 'lucide-react';

interface Actividad {
  id: number;
  numero: string;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  lugar: string;
  responsable: string;
  participantes: string[];
  estado: 'pendiente' | 'en-progreso' | 'completada';
  progreso: number;
  evidencias: number;
  objetivos: string[];
}

const actividades: Actividad[] = [
  {
    id: 1,
    numero: 'Act. 01',
    nombre: 'Taller de Inducción sobre el Enfoque de Ciencias para la Vida',
    descripcion: 'Socialización del enfoque pedagógico y estructura del área curricular con docentes de las II.EE. participantes.',
    fechaInicio: '2025-02-15',
    fechaFin: '2025-02-28',
    lugar: 'Auditorio UGEL Huaylas',
    responsable: 'Especialista CIA',
    participantes: ['Directores', 'Docentes CIA'],
    estado: 'completada',
    progreso: 100,
    evidencias: 5,
    objetivos: ['Capacitar a 45 docentes en el enfoque de Ciencias para la Vida']
  },
  {
    id: 2,
    numero: 'Act. 02',
    nombre: 'Elaboración de Materiales Educativos',
    descripcion: 'Desarrollo de fichas, láminas y recursos didácticos para el área de Ciencias para la Vida.',
    fechaInicio: '2025-03-01',
    fechaFin: '2025-03-31',
    lugar: 'II.EE. participantes',
    responsable: 'Equipos de gestión',
    participantes: ['Docentes CIA'],
    estado: 'completada',
    progreso: 100,
    evidencias: 12,
    objetivos: ['Elaborar 100 fichas de trabajo', 'Crear 50 láminas educativas']
  },
  {
    id: 3,
    numero: 'Act. 03',
    nombre: 'Implementación de Sesiones de Aprendizaje',
    descripcion: 'Ejecución de sesiones de aprendizaje en aula con el nuevo enfoque pedagógico.',
    fechaInicio: '2025-04-01',
    fechaFin: '2025-07-31',
    lugar: 'Aulas de las II.EE.',
    responsable: 'Docentes CIA',
    participantes: ['Estudiantes'],
    estado: 'en-progreso',
    progreso: 65,
    evidencias: 28,
    objetivos: ['Implementar 200 sesiones de aprendizaje']
  },
  {
    id: 4,
    numero: 'Act. 04',
    nombre: 'Visitas de Acompañamiento Pedagógico',
    descripcion: 'Visitas a las aulas para observar y retroalimentar la implementación de sesiones.',
    fechaInicio: '2025-04-15',
    fechaFin: '2025-08-15',
    lugar: 'II.EE. participantes',
    responsable: 'Especialista CIA + Jefes de área',
    participantes: ['Docentes CIA'],
    estado: 'en-progreso',
    progreso: 45,
    evidencias: 15,
    objetivos: ['Realizar 45 visitas de acompañamiento']
  },
  {
    id: 5,
    numero: 'Act. 05',
    nombre: 'Talleres de Reflexión Pedagógica',
    descripcion: 'Espacios de reflexión sobre la práctica docente y mejora continua.',
    fechaInicio: '2025-05-01',
    fechaFin: '2025-09-30',
    lugar: 'Virtual y presencial',
    responsable: 'Especialista CIA',
    participantes: ['Docentes CIA'],
    estado: 'pendiente',
    progreso: 0,
    evidencias: 0,
    objetivos: ['Realizar 6 talleres de reflexión']
  },
  {
    id: 6,
    numero: 'Act. 06',
    nombre: 'Feria de Ciencias para la Vida',
    descripcion: 'Exposición de proyectos y productos del área curricular.',
    fechaInicio: '2025-10-01',
    fechaFin: '2025-10-31',
    lugar: 'Lugar por definir',
    responsable: 'Comité organizador',
    participantes: ['Estudiantes', 'Docentes', 'Comunidad'],
    estado: 'pendiente',
    progreso: 0,
    evidencias: 0,
    objetivos: ['Organizar 1 feria de ciencias']
  },
  {
    id: 7,
    numero: 'Act. 07',
    nombre: 'Sistematización de Experiencias',
    descripcion: 'Documentación de buenas prácticas y lecciones aprendidas.',
    fechaInicio: '2025-11-01',
    fechaFin: '2025-11-30',
    lugar: 'UGEL Huaylas',
    responsable: 'Especialista CIA',
    participantes: ['Docentes CIA'],
    estado: 'pendiente',
    progreso: 0,
    evidencias: 0,
    objetivos: ['Producir 3 documentos de sistematización']
  },
  {
    id: 8,
    numero: 'Act. 08',
    nombre: 'Evaluación de Resultados de Aprendizaje',
    descripcion: 'Aplicación de instrumentos de evaluación y análisis de resultados.',
    fechaInicio: '2025-09-01',
    fechaFin: '2025-10-31',
    lugar: 'II.EE. participantes',
    responsable: 'Equipo de evaluación',
    participantes: ['Estudiantes'],
    estado: 'pendiente',
    progreso: 0,
    evidencias: 0,
    objetivos: ['Evaluar 900 estudiantes']
  },
  {
    id: 9,
    numero: 'Act. 09',
    nombre: 'Informe Final del POA',
    descripcion: 'Elaboración del informe de cierre del Plan Operativo Anual.',
    fechaInicio: '2025-12-01',
    fechaFin: '2025-12-15',
    lugar: 'UGEL Huaylas',
    responsable: 'Especialista CIA',
    participantes: ['Equipo directivo'],
    estado: 'pendiente',
    progreso: 0,
    evidencias: 0,
    objetivos: ['Entregar informe final']
  }
];

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'completada':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'en-progreso':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getEstadoTexto = (estado: string) => {
  switch (estado) {
    case 'completada':
      return 'Completada';
    case 'en-progreso':
      return 'En Progreso';
    default:
      return 'Pendiente';
  }
};

export default function ActividadesImplementacion() {
  const [expandida, setExpandida] = useState<number | null>(null);

  return (
    <section id="actividades" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Actividades de Implementación</h2>
          <p className="text-xl text-gray-600">Seguimiento del Plan Operativo Anual 2026</p>
        </div>

        {/* Resumen */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-700">2</p>
                  <p className="text-sm text-green-600">Completadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-700">2</p>
                  <p className="text-sm text-blue-600">En Progreso</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Circle className="h-8 w-8 text-gray-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-700">5</p>
                  <p className="text-sm text-gray-600">Pendientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-indigo-50 border-indigo-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-indigo-600" />
                <div>
                  <p className="text-2xl font-bold text-indigo-700">60</p>
                  <p className="text-sm text-indigo-600">Evidencias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de actividades */}
        <div className="space-y-4">
          {actividades.map((actividad) => (
            <Card key={actividad.id} className="overflow-hidden">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandida(expandida === actividad.id ? null : actividad.id)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="font-mono">{actividad.numero}</Badge>
                      <Badge className={getEstadoColor(actividad.estado)}>
                        {getEstadoTexto(actividad.estado)}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{actividad.nombre}</h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{actividad.descripcion}</p>
                  </div>
                  
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(actividad.fechaInicio).toLocaleDateString('es-PE')} - {new Date(actividad.fechaFin).toLocaleDateString('es-PE')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-700">{actividad.progreso}%</span>
                      </div>
                      <div className="w-24">
                        <Progress value={actividad.progreso} className="h-2" />
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {expandida === actividad.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {expandida === actividad.id && (
                <div className="px-6 pb-6 border-t bg-gray-50">
                  <div className="pt-4 grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600"><strong>Lugar:</strong> {actividad.lugar}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600"><strong>Responsable:</strong> {actividad.responsable}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600"><strong>Participantes:</strong> {actividad.participantes.join(', ')}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Objetivos:</p>
                        <ul className="space-y-1">
                          {actividad.objetivos.map((obj, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FileText className="h-4 w-4" />
                          <span>{actividad.evidencias} evidencias registradas</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Actualizar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
