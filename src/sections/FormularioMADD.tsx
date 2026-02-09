import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Send, Save } from 'lucide-react';

const areas = [
  'Ciencias para la Vida',
  'Matemática',
  'Comunicación',
  'Arte y Cultura',
  'Educación Física',
  'Educación para el Trabajo',
  'Desarrollo Personal y Ciudadanía',
];

const niveles = ['Inicial', 'Primaria', 'Secundaria'];

export default function FormularioMADD() {
  const [paso, setPaso] = useState(1);
  const [guardado, setGuardado] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleGuardarBorrador = () => {
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const handleEnviar = () => {
    setEnviado(true);
  };

  if (enviado) {
    return (
      <section id="ficha-madd" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Ficha MADD Enviada!</h2>
              <p className="text-gray-600 mb-6">
                Tu ficha ha sido registrada exitosamente. El equipo de UGEL Huaylas 
                la revisará y te contactará para el siguiente paso.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-500">N° de registro:</p>
                <p className="text-xl font-mono font-bold text-indigo-600">MADD-2025-0042</p>
              </div>
              <Button onClick={() => setEnviado(false)} variant="outline">
                Enviar otra ficha
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="ficha-madd" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ficha MADD</h2>
          <p className="text-xl text-gray-600">Registro de Mejoras y Adaptaciones del Diseño Didáctico</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Indicador de pasos */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((p) => (
              <div key={p} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  paso >= p ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {p}
                </div>
                {p < 3 && (
                  <div className={`w-20 h-1 ${
                    paso > p ? 'bg-indigo-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {paso === 1 && 'Información General'}
                    {paso === 2 && 'Descripción de la Mejora'}
                    {paso === 3 && 'Revisión y Envío'}
                  </CardTitle>
                  <CardDescription>
                    {paso === 1 && 'Datos básicos de la ficha MADD'}
                    {paso === 2 && 'Detalla las adaptaciones realizadas'}
                    {paso === 3 && 'Verifica la información antes de enviar'}
                  </CardDescription>
                </div>
                {guardado && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Guardado como borrador
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {paso === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="docente">Nombre del docente *</Label>
                      <Input id="docente" placeholder="Apellidos y nombres" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dni">DNI *</Label>
                      <Input id="dni" placeholder="8 dígitos" maxLength={8} required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="institucion">Institución Educativa *</Label>
                      <Input id="institucion" placeholder="Nombre de la IE" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="codigo">Código modular *</Label>
                      <Input id="codigo" placeholder="Ej: 1234567" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nivel">Nivel *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                          {niveles.map((n) => (
                            <SelectItem key={n} value={n}>{n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grado">Grado/Año *</Label>
                      <Input id="grado" placeholder="Ej: 3° primaria" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Área curricular *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                          {areas.map((a) => (
                            <SelectItem key={a} value={a}>{a}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unidad">Unidad didáctica *</Label>
                    <Input id="unidad" placeholder="Título de la unidad didáctica" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sesion">Sesión de aprendizaje *</Label>
                    <Input id="sesion" placeholder="Título de la sesión" required />
                  </div>
                </div>
              )}

              {paso === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="situacion">Situación significativa / Propósito de aprendizaje *</Label>
                    <Textarea 
                      id="situacion" 
                      placeholder="Describe la situación significativa o propósito de la sesión..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mejora">Descripción de la mejora o adaptación *</Label>
                    <Textarea 
                      id="mejora" 
                      placeholder="¿Qué mejoras realizaste al diseño original? ¿Por qué?"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estrategias">Estrategias y recursos utilizados *</Label>
                    <Textarea 
                      id="estrategias" 
                      placeholder="Describe las estrategias pedagógicas y recursos empleados..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resultados">Resultados de aprendizaje observados *</Label>
                    <Textarea 
                      id="resultados" 
                      placeholder="¿Qué logros evidenciaron los estudiantes?"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reflexion">Reflexión sobre la práctica *</Label>
                    <Textarea 
                      id="reflexion" 
                      placeholder="¿Qué aprendiste de esta experiencia? ¿Qué cambiarías?"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="compartir" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="compartir" className="text-sm font-normal">
                        Autorizo compartir esta ficha con otros docentes como buena práctica
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {paso === 3 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h4 className="font-semibold text-gray-900">Resumen de la ficha</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Docente:</span>
                        <p className="font-medium">[Nombre ingresado]</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Institución:</span>
                        <p className="font-medium">[IE ingresada]</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Nivel y grado:</span>
                        <p className="font-medium">[Nivel] - [Grado]</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Área:</span>
                        <p className="font-medium">[Área seleccionada]</p>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <span className="text-gray-500">Unidad:</span>
                      <p className="font-medium">[Unidad ingresada]</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Sesión:</span>
                      <p className="font-medium">[Sesión ingresada]</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Nota:</strong> Al enviar esta ficha, confirmas que la información 
                      proporcionada es verídica y autorizas su revisión por parte del equipo de UGEL Huaylas.
                    </p>
                  </div>
                </div>
              )}

              {/* Botones de navegación */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <div>
                  {paso > 1 && (
                    <Button type="button" variant="outline" onClick={() => setPaso(paso - 1)}>
                      Anterior
                    </Button>
                  )}
                </div>
                <div className="flex gap-3">
                  {paso < 3 && (
                    <>
                      <Button type="button" variant="outline" onClick={handleGuardarBorrador}>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar borrador
                      </Button>
                      <Button type="button" onClick={() => setPaso(paso + 1)} className="bg-indigo-600 hover:bg-indigo-700">
                        Siguiente
                      </Button>
                    </>
                  )}
                  {paso === 3 && (
                    <>
                      <Button type="button" variant="outline" onClick={handleGuardarBorrador}>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar borrador
                      </Button>
                      <Button type="button" onClick={handleEnviar} className="bg-green-600 hover:bg-green-700">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar ficha
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
