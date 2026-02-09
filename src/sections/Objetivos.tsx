import { Card, CardContent } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

const objetivos = [
  {
    titulo: 'Fortalecer capacidades docentes',
    descripcion: 'Capacitar a 45 docentes en el enfoque pedagógico de Ciencias para la Vida y el desarrollo de sesiones de aprendizaje.',
    icon: Target
  },
  {
    titulo: 'Mejorar prácticas pedagógicas',
    descripcion: 'Implementar estrategias didácticas innovadoras que promuevan el pensamiento científico en los estudiantes.',
    icon: CheckCircle
  },
  {
    titulo: 'Desarrollar materiales educativos',
    descripcion: 'Elaborar y sistematizar recursos didácticos para el área curricular.',
    icon: Target
  },
  {
    titulo: 'Evaluar resultados de aprendizaje',
    descripcion: 'Medir el impacto del POA en el rendimiento académico de los estudiantes.',
    icon: CheckCircle
  }
];

export default function Objetivos() {
  return (
    <section id="objetivos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Objetivos del POA</h2>
          <p className="text-xl text-gray-600">Metas que buscamos alcanzar este año</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {objetivos.map((objetivo, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <objetivo.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{objetivo.titulo}</h3>
                    <p className="text-gray-600">{objetivo.descripcion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
