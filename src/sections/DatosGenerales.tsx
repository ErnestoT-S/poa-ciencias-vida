import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Target, Calendar } from 'lucide-react';

export default function DatosGenerales() {
  return (
    <section id="datos-generales" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Datos Generales del POA</h2>
          <p className="text-xl text-gray-600">Plan Operativo Anual 2026 - UGEL Huaylas</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Área Curricular</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <span className="text-xl font-bold">Ciencias para la Vida</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Nivel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold">Educación Básica Regular</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Ciclo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-orange-600" />
                <span className="text-xl font-bold">II y III Ciclo</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Periodo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold">2026</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Información del Proyecto</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Unidad de Gestión</h4>
              <p className="text-gray-600">UGEL Huaylas - Áncash</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Especialista Responsable</h4>
              <p className="text-gray-600">Área de Ciencias para la Vida</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">II.EE. Participantes</h4>
              <p className="text-gray-600">5 Instituciones Educativas de la provincia de Huaylas</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Docentes Beneficiados</h4>
              <p className="text-gray-600">45 docentes del área de Ciencias para la Vida</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
