import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Download, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  FileArchive, 
  FileSpreadsheet,
  Upload,
  Filter,
  Eye
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Recurso {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: 'pdf' | 'imagen' | 'video' | 'zip' | 'excel' | 'word';
  categoria: string;
  autor: string;
  fecha: string;
  descargas: number;
  tamaño: string;
}

const recursos: Recurso[] = [
  {
    id: 1,
    titulo: 'Sesión de Aprendizaje - El Ciclo del Agua',
    descripcion: 'Sesión completa con actividades sobre el ciclo del agua para 2° grado',
    tipo: 'pdf',
    categoria: 'Sesiones',
    autor: 'María García - I.E. Huaylas',
    fecha: '2025-01-15',
    descargas: 145,
    tamaño: '2.3 MB'
  },
  {
    id: 2,
    titulo: 'Infografía - Sistema Digestivo',
    descripcion: 'Infografía colorida sobre las partes del sistema digestivo humano',
    tipo: 'imagen',
    categoria: 'Infografías',
    autor: 'Carlos López - I.E. Pamparomas',
    fecha: '2025-01-12',
    descargas: 89,
    tamaño: '1.8 MB'
  },
  {
    id: 3,
    titulo: 'Video - Experimento de Fotosíntesis',
    descripcion: 'Video demostrativo de experimento sobre fotosíntesis en plantas',
    tipo: 'video',
    categoria: 'Videos',
    autor: 'Ana Torres - I.E. Huata',
    fecha: '2025-01-10',
    descargas: 234,
    tamaño: '45.6 MB'
  },
  {
    id: 4,
    titulo: 'Paquete de Fichas de Trabajo',
    descripcion: '50 fichas de trabajo sobre diversos temas de Ciencias para la Vida',
    tipo: 'zip',
    categoria: 'Fichas',
    autor: 'Pedro Mamani - I.E. Colcabamba',
    fecha: '2025-01-08',
    descargas: 312,
    tamaño: '18.5 MB'
  },
  {
    id: 5,
    titulo: 'Registro de Notas - Formato Excel',
    descripcion: 'Plantilla Excel para registro de notas de Ciencias para la Vida',
    tipo: 'excel',
    categoria: 'Plantillas',
    autor: 'UGEL Huaylas',
    fecha: '2025-01-05',
    descargas: 567,
    tamaño: '125 KB'
  },
  {
    id: 6,
    titulo: 'Planificación Anual - Ciencias 2025',
    descripcion: 'Planificación anual completa con competencias y sesiones',
    tipo: 'word',
    categoria: 'Planificación',
    autor: 'Rosa Quispe - I.E. Huaylas',
    fecha: '2025-01-03',
    descargas: 423,
    tamaño: '856 KB'
  },
  {
    id: 7,
    titulo: 'Láminas Educativas - Ecosistemas',
    descripcion: 'Set de 20 láminas sobre diferentes ecosistemas del Perú',
    tipo: 'imagen',
    categoria: 'Láminas',
    autor: 'Luis Vega - I.E. Pamparomas',
    fecha: '2024-12-28',
    descargas: 178,
    tamaño: '12.3 MB'
  },
  {
    id: 8,
    titulo: 'Evaluación Diagnóstica - Inicio de Año',
    descripcion: 'Prueba de entrada para evaluar conocimientos previos',
    tipo: 'pdf',
    categoria: 'Evaluaciones',
    autor: 'Carmen Rojas - I.E. Huata',
    fecha: '2024-12-20',
    descargas: 289,
    tamaño: '456 KB'
  }
];

const categorias = ['Todas', 'Sesiones', 'Infografías', 'Videos', 'Fichas', 'Plantillas', 'Planificación', 'Láminas', 'Evaluaciones'];

const tipos = {
  pdf: { icon: FileText, color: 'text-red-500', bg: 'bg-red-100' },
  imagen: { icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-100' },
  video: { icon: Video, color: 'text-blue-500', bg: 'bg-blue-100' },
  zip: { icon: FileArchive, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  excel: { icon: FileSpreadsheet, color: 'text-green-500', bg: 'bg-green-100' },
  word: { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' }
};

export default function RecursosCompartidos() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');

  const recursosFiltrados = recursos.filter(recurso => {
    const coincideBusqueda = recurso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                            recurso.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaActiva === 'Todas' || recurso.categoria === categoriaActiva;
    return coincideBusqueda && coincideCategoria;
  });

  return (
    <section id="recursos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Recursos Compartidos</h2>
          <p className="text-xl text-gray-600">Biblioteca de materiales educativos de la comunidad</p>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar recursos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Upload className="h-4 w-4 mr-2" />
              Compartir Recurso
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  categoriaActiva === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de recursos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recursosFiltrados.map((recurso) => {
            const TipoIcon = tipos[recurso.tipo].icon;
            return (
              <Card key={recurso.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${tipos[recurso.tipo].bg} rounded-lg flex items-center justify-center`}>
                      <TipoIcon className={`h-6 w-6 ${tipos[recurso.tipo].color}`} />
                    </div>
                    <Badge variant="secondary">{recurso.categoria}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {recurso.titulo}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {recurso.descripcion}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Por: {recurso.autor.split(' - ')[0]}</span>
                      <span>{recurso.tamaño}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(recurso.fecha).toLocaleDateString('es-PE')}</span>
                      <span>{recurso.descargas} descargas</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{recurso.titulo}</DialogTitle>
                            <DialogDescription>{recurso.descripcion}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                              <div className={`w-16 h-16 ${tipos[recurso.tipo].bg} rounded-lg flex items-center justify-center`}>
                                <TipoIcon className={`h-8 w-8 ${tipos[recurso.tipo].color}`} />
                              </div>
                              <div>
                                <p className="font-medium">Información del archivo</p>
                                <p className="text-sm text-gray-500">Tipo: {recurso.tipo.toUpperCase()}</p>
                                <p className="text-sm text-gray-500">Tamaño: {recurso.tamaño}</p>
                                <p className="text-sm text-gray-500">Autor: {recurso.autor}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                                <Download className="h-4 w-4 mr-2" />
                                Descargar
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                        <Download className="h-4 w-4 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {recursosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron recursos</h3>
            <p className="text-gray-600">Intenta con otra búsqueda o categoría</p>
          </div>
        )}
      </div>
    </section>
  );
}
