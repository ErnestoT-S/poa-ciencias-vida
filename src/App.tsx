import { AuthProvider } from './contexts/AuthContext';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { DatosGenerales } from './sections/DatosGenerales';
import { Objetivos } from './sections/Objetivos';
import { Metas } from './sections/Metas';
import { Cronograma } from './sections/Cronograma';
import { Presupuesto } from './sections/Presupuesto';
import { Instituciones } from './sections/Instituciones';
import { Productos } from './sections/Productos';
import { Evaluacion } from './sections/Evaluacion';
import { ActividadesImplementacion } from './sections/ActividadesImplementacion';
import { FormulariosActividades } from './sections/FormulariosActividades';
import { TalleresVirtuales } from './sections/TalleresVirtuales';
import { RecursosCompartidos } from './sections/RecursosCompartidos';
import { EnlacesInstitucionales } from './sections/EnlacesInstitucionales';
import { Noticias } from './sections/Noticias';
import { AulaVirtual } from './sections/AulaVirtual';
import { Footer } from './sections/Footer';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <Hero />
          <DatosGenerales />
          <Objetivos />
          <Metas />
          <Cronograma />
          <ActividadesImplementacion />
          <FormulariosActividades />
          <Noticias />
          <AulaVirtual />
          <TalleresVirtuales />
          <RecursosCompartidos />
          <EnlacesInstitucionales />
          <Presupuesto />
          <Instituciones />
          <Productos />
          <Evaluacion />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
