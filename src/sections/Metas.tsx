import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const metas = [
  {
    titulo: 'Docentes capacitados',
    actual: 45,
    meta: 45,
    porcentaje: 100,
    color: 'bg-green-500'
  },
  {
    titulo: 'Sesiones de aprendizaje implementadas',
    actual: 156,
    meta: 200,
    porcentaje: 78,
    color: 'bg-blue-500'
  },
  {
    titulo: 'Materiales educativos elaborados',
    actual: 89,
    meta: 150,
    porcentaje: 59,
    color: 'bg-yellow-500'
  },
  {
    titulo: 'Estudiantes beneficiados',
    actual: 850,
    meta: 900,
    porcentaje: 94,
    color: 'bg-indigo-500'
  }
];

export default function Metas() {
  return (
    <section id="metas" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Metas del POA</h2>
          <p className="text-xl text-gray-600">Avance de las metas establecidas</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {metas.map((meta, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{meta.titulo}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {meta.actual} <span className="text-sm text-gray-500">/ {meta.meta}</span>
                  </span>
                  <span className="text-lg font-semibold text-indigo-600">{meta.porcentaje}%</span>
                </div>
                <Progress value={meta.porcentaje} className="h-3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
