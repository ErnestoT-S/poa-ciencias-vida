import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExternalLink, Building2, GraduationCap, BookOpen, Globe, FileText } from 'lucide-react';

const enlacesPrincipales = [
  {
    titulo: 'MINEDU',
    descripcion: 'Ministerio de Educación del Perú',
    url: 'https://www.minedu.gob.pe',
    icon: Building2,
    color: 'bg-red-600'
  },
  {
    titulo: 'UGEL Huaylas',
    descripcion: 'Unidad de Gestión Educativa Local Huaylas',
    url: '#',
    icon: GraduationCap,
    color: 'bg-blue-600'
  },
  {
    titulo: 'DRE Áncash',
    descripcion: 'Dirección Regional de Educación de Áncash',
    url: 'https://www.dreancash.gob.pe',
    icon: Building2,
    color: 'bg-green-600'
  }
];

const recursosPedagogicos = [
  {
    titulo: 'PerúEduca',
    descripcion: 'Portal educativo del MINEDU con recursos curriculares',
    url: 'https://www.perueduca.pe',
    icon: BookOpen
  },
  {
    titulo: 'RVM 036-2022',
    descripcion: 'Currículo Nacional de Educación Básica',
    url: 'https://www.minedu.gob.pe/curriculo/',
    icon: FileText
  },
  {
    titulo: 'Somos Docentes',
    descripcion: 'Comunidad de docentes del Perú',
    url: 'https://www.somosdocentes.pe',
    icon: GraduationCap
  },
  {
    titulo: 'Educación Básica Regular',
    descripcion: 'Recursos para EBR del MINEDU',
    url: 'https://www.minedu.gob.pe/ebr/',
    icon: BookOpen
  }
];

const plataformasVirtuales = [
  {
    titulo: 'Aprendo en Casa',
    descripcion: 'Plataforma de aprendizaje a distancia del MINEDU',
    url: 'https://www.aprendoencasa.pe',
    icon: Globe
  },
  {
    titulo: 'Moodle UGEL Huaylas',
    descripcion: 'Aula virtual de la UGEL Huaylas',
    url: '#',
    icon: GraduationCap
  },
  {
    titulo: 'Google Classroom',
    descripcion: 'Plataforma de Google para educación',
    url: 'https://classroom.google.com',
    icon: BookOpen
  }
];

export default function EnlacesInstitucionales() {
  return (
    <section id="enlaces" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Enlaces Institucionales</h2>
          <p className="text-xl text-gray-600">Recursos y plataformas de interés educativo</p>
        </div>

        {/* Enlaces Principales */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {enlacesPrincipales.map((enlace, index) => (
            <a
              key={index}
              href={enlace.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 ${enlace.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <enlace.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                        {enlace.titulo}
                        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{enlace.descripcion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* Dos columnas */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recursos Pedagógicos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                Recursos Pedagógicos
              </CardTitle>
              <CardDescription>
                Materiales y documentos curriculares
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recursosPedagogicos.map((recurso, index) => (
                  <a
                    key={index}
                    href={recurso.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <recurso.icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                        {recurso.titulo}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-sm text-gray-500">{recurso.descripcion}</p>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plataformas Virtuales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                Plataformas Virtuales
              </CardTitle>
              <CardDescription>
                Herramientas para la educación virtual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {plataformasVirtuales.map((plataforma, index) => (
                  <a
                    key={index}
                    href={plataforma.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <plataforma.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors flex items-center gap-2">
                        {plataforma.titulo}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-sm text-gray-500">{plataforma.descripcion}</p>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
