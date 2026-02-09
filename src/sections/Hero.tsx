import { FlaskConical, Atom, Microscope, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-blue-300 text-sm mb-8">
          <FlaskConical className="w-4 h-4" />
          <span>UGEL Huaylas - Gestión Pedagógica 2026</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Ciencias Para la Vida
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-blue-200 mb-4">Plan Operativo Anual 2026</p>
        
        <p className="max-w-3xl mx-auto text-gray-300 text-lg mb-12">
          Fortaleciendo la gestión pedagógica del área de Ciencia y Tecnología 
          mediante acompañamiento, formación docente e indagación científica 
          en las instituciones educativas de la UGEL Huaylas.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8" onClick={() => scrollToSection('objetivos')}>
            <Atom className="w-5 h-5 mr-2" /> Conoce los Objetivos
          </Button>
          <Button size="lg" variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-900/30 px-8" onClick={() => scrollToSection('cronograma')}>
            <Microscope className="w-5 h-5 mr-2" /> Ver Cronograma
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur rounded-xl p-6">
            <Rocket className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">9</div>
            <div className="text-sm text-gray-400">Meses de Ejecución</div>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl p-6">
            <FlaskConical className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">9</div>
            <div className="text-sm text-gray-400">Actividades</div>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl p-6">
            <Atom className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">3</div>
            <div className="text-sm text-gray-400">Concursos</div>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl p-6">
            <Microscope className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">15+</div>
            <div className="text-sm text-gray-400">IIEE Participantes</div>
          </div>
        </div>
      </div>
    </section>
  );
}
