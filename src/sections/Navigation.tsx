import { useState, useEffect } from 'react';
import { FlaskConical, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthSection } from './AuthSection';

const navLinks = [
  { label: 'Datos', href: '#datos' },
  { label: 'Objetivos', href: '#objetivos' },
  { label: 'Metas', href: '#metas' },
  { label: 'Cronograma', href: '#cronograma' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Talleres', href: '#talleres' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Enlaces', href: '#enlaces' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg border-b' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isScrolled ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-white/10 backdrop-blur'}`}>
                <FlaskConical className="w-6 h-6 text-white" />
              </div>
              <span className={`font-bold hidden sm:block ${isScrolled ? 'text-foreground' : 'text-white'}`}>Ciencias Para la Vida</span>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <button key={index} onClick={() => scrollToSection(link.href)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isScrolled ? 'text-muted-foreground hover:text-foreground hover:bg-muted' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden lg:block"><AuthSection /></div>

            <Button variant="ghost" size="icon" className={`lg:hidden ${isScrolled ? 'text-foreground' : 'text-white'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-background border-b shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <button key={index} onClick={() => scrollToSection(link.href)} className="px-4 py-3 rounded-lg text-left text-foreground hover:bg-muted transition-colors">
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
