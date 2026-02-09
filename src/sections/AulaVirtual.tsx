import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Video, FileText, Download, ExternalLink, Lock, PlayCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const modulos = [
  {
    id: 1,
    titulo: 'Módulo 1: Introducción a Ciencias para la Vida',
    descripcion: 'Fundamentos y enfoque del área curricular',
    lecciones: [
      { id: 1, titulo: '1.1 ¿Qué es Ciencias para la Vida?', tipo: 'video', duracion: '15 min', completado: true },
      { id: 2, titulo: '1.2 Enfoque pedagógico', tipo: 'video', duracion: '20 min', completado: true },
      { id: 3, titulo: '1.3 Materiales de lectura', tipo: 'pdf', duracion: '30 min', completado: false },
    ]
  },
  {
    id: 2,
    titulo: 'Módulo 2: Competencias y Capacidades',
    descripcion: 'Desarrollo de competencias en el área',
    lecciones: [
      { id: 4, titulo: '2.1 Competencias específicas', tipo: 'video', duracion: '25 min', completado: false },
      { id: 5, titulo: '2.2 Capacidades por ciclo', tipo: 'video', duracion: '30 min', completado: false },
      { id: 6, titulo: '2.3 Matriz de competencias', tipo: 'pdf', duracion: '45 min', completado: false },
    ]
  },
  {
    id: 3,
    titulo: 'Módulo 3: Sesiones de Aprendizaje',
    descripcion: 'Diseño e implementación de sesiones',
    lecciones: [
      { id: 7, titulo: '3.1 Estructura de una sesión', tipo: 'video', duracion: '35 min', completado: false },
      { id: 8, titulo: '3.2 Ejemplos de sesiones', tipo: 'pdf', duracion: '60 min', completado: false },
      { id: 9, titulo: '3.3 Rúbricas de evaluación', tipo: 'pdf', duracion: '40 min', completado: false },
    ]
  },
  {
    id: 4,
    titulo: 'Módulo 4: Evaluación del Aprendizaje',
    descripcion: 'Instrumentos y estrategias de evaluación',
    lecciones: [
      { id: 10, titulo: '4.1 Evaluación formativa', tipo: 'video', duracion: '28 min', completado: false },
      { id: 11, titulo: '4.2 Instrumentos de evaluación', tipo: 'pdf', duracion: '50 min', completado: false },
      { id: 12, titulo: '4.3 Retroalimentación efectiva', tipo: 'video', duracion: '22 min', completado: false },
    ]
  }
];

const materialesComplementarios = [
  { id: 1, titulo: 'Guía del Docente 2025', tipo: 'PDF', tamaño: '5.2 MB' },
  { id: 2, titulo: 'Cuaderno de Trabajo del Estudiante', tipo: 'PDF', tamaño: '8.7 MB' },
  { id: 3, titulo: 'Presentaciones PowerPoint', tipo: 'ZIP', tamaño: '45.3 MB' },
  { id: 4, titulo: 'Banco de Actividades', tipo: 'PDF', tamaño: '3.1 MB' },
  { id: 5, titulo: 'Videos Explicativos', tipo: 'Lista', tamaño: '12 videos' },
];

export default function AulaVirtual() {
  const { user } = useAuth();
  const [moduloActivo, setModuloActivo] = useState(1);

  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case 'video':
        return <PlayCircle className="h-5 w-5 text-red-500" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-blue-500" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-500" />;
    }
  };

  if (!user) {
    return (
      <section id="aula-virtual" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Aula Virtual</h2>
            <p className="text-xl text-gray-600">Accede a los módulos de formación continua</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Acceso Restringido</h3>
              <p className="text-gray-600 mb-6">
                El Aula Virtual está disponible solo para docentes registrados. 
                Inicia sesión para acceder a todos los módulos de formación.
              </p>
              <Button 
                onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Iniciar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="aula-virtual" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Aula Virtual</h2>
          <p className="text-xl text-gray-600">Formación continua en Ciencias para la Vida</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar con módulos */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-semibold text-gray-900 mb-4 px-2">Módulos del Curso</h3>
            {modulos.map((modulo) => (
              <button
                key={modulo.id}
                onClick={() => setModuloActivo(modulo.id)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  moduloActivo === modulo.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white hover:bg-indigo-50 text-gray-700'
                }`}
              >
                <p className={`text-sm font-medium ${moduloActivo === modulo.id ? 'text-indigo-100' : 'text-gray-500'}`}>
                  Módulo {modulo.id}
                </p>
                <p className="font-semibold text-sm mt-1">{modulo.titulo.replace(`Módulo ${modulo.id}: `, '')}</p>
              </button>
            ))}

            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Tu Progreso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-indigo-600">16%</span>
                  <span className="text-sm text-gray-500">2 de 12 lecciones</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '16%' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="contenido" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="contenido">Contenido del Módulo</TabsTrigger>
                <TabsTrigger value="materiales">Materiales Complementarios</TabsTrigger>
              </TabsList>

              <TabsContent value="contenido">
                <Card>
                  <CardHeader>
                    <CardTitle>{modulos.find(m => m.id === moduloActivo)?.titulo}</CardTitle>
                    <CardDescription>
                      {modulos.find(m => m.id === moduloActivo)?.descripcion}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {modulos.find(m => m.id === moduloActivo)?.lecciones.map((leccion) => (
                        <div
                          key={leccion.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                              {getIconoTipo(leccion.tipo)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {leccion.titulo}
                              </h4>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  {leccion.tipo === 'video' ? <Video className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                                  {leccion.tipo.toUpperCase()}
                                </span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">{leccion.duracion}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {leccion.completado && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            <Button variant="outline" size="sm">
                              {leccion.tipo === 'video' ? 'Ver' : 'Descargar'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="materiales">
                <Card>
                  <CardHeader>
                    <CardTitle>Materiales Complementarios</CardTitle>
                    <CardDescription>
                      Recursos adicionales para tu formación
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {materialesComplementarios.map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:border-indigo-300 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                              <Download className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm">{material.titulo}</h4>
                              <p className="text-xs text-gray-500">{material.tipo} • {material.tamaño}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
