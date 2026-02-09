import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Upload, FileText, CheckCircle, Plus } from 'lucide-react';

const actividades = [
  { id: 'act-01', nombre: 'Act. 01 - Taller de Inducción' },
  { id: 'act-02', nombre: 'Act. 02 - Elaboración de Materiales' },
  { id: 'act-03', nombre: 'Act. 03 - Implementación de Sesiones' },
  { id: 'act-04', nombre: 'Act. 04 - Visitas de Acompañamiento' },
  { id: 'act-05', nombre: 'Act. 05 - Talleres de Reflexión' },
  { id: 'act-06', nombre: 'Act. 06 - Feria de Ciencias' },
  { id: 'act-07', nombre: 'Act. 07 - Sistematización' },
  { id: 'act-08', nombre: 'Act. 08 - Evaluación de Resultados' },
  { id: 'act-09', nombre: 'Act. 09 - Informe Final' },
];

const instituciones = [
  'I.E. Huaylas',
  'I.E. Pamparomas',
  'I.E. Huata',
  'I.E. Colcabamba',
  'I.E. La Libertad',
];

export default function FormulariosActividades() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <section id="formularios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Registro de Actividades</h2>
          <p className="text-xl text-gray-600">Reporta el avance de las actividades del POA</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="nuevo" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="nuevo">Nuevo Registro</TabsTrigger>
              <TabsTrigger value="historial">Mis Registros</TabsTrigger>
            </TabsList>

            <TabsContent value="nuevo">
              <Card>
                <CardHeader>
                  <CardTitle>Formulario de Reporte</CardTitle>
                  <CardDescription>
                    Completa los datos del avance de tu actividad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {enviado ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Registro Guardado!</h3>
                      <p className="text-gray-600">Tu reporte ha sido registrado exitosamente.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="actividad">Actividad *</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una actividad" />
                            </SelectTrigger>
                            <SelectContent>
                              {actividades.map((act) => (
                                <SelectItem key={act.id} value={act.id}>
                                  {act.nombre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="institucion">Institución Educativa *</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu IE" />
                            </SelectTrigger>
                            <SelectContent>
                              {instituciones.map((inst) => (
                                <SelectItem key={inst} value={inst}>
                                  {inst}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fecha">Fecha de ejecución *</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input id="fecha" type="date" className="pl-10" required />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="participantes">N° de participantes *</Label>
                          <Input id="participantes" type="number" min="1" placeholder="Ej: 25" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="descripcion">Descripción de la actividad *</Label>
                        <Textarea 
                          id="descripcion" 
                          placeholder="Describe lo realizado en la actividad..."
                          rows={4}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="resultados">Resultados alcanzados *</Label>
                        <Textarea 
                          id="resultados" 
                          placeholder="Indica los resultados y logros obtenidos..."
                          rows={3}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dificultades">Dificultades y soluciones</Label>
                        <Textarea 
                          id="dificultades" 
                          placeholder="Describe las dificultades encontradas y cómo las resolviste..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Evidencias (fotos, documentos)</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors cursor-pointer">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Arrastra archivos aquí o haz clic para seleccionar</p>
                          <p className="text-xs text-gray-400 mt-1">Máximo 5 archivos (PDF, JPG, PNG) - 10MB cada uno</p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline">Cancelar</Button>
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                          Guardar Registro
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historial">
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <Card key={item}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">Act. 0{item}</Badge>
                            <span className="text-sm text-gray-500">15/01/2025</span>
                          </div>
                          <h4 className="font-semibold text-gray-900">Taller de Inducción - Sesión {item}</h4>
                          <p className="text-sm text-gray-600 mt-1">I.E. Huaylas - 25 participantes</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Aprobado</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <FileText className="h-4 w-4" />
                          <span>3 archivos adjuntos</span>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          Ver detalle
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Ver más registros
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
