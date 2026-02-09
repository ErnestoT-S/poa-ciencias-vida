import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface FichaMADD {
  id: string;
  docente_nombre: string;
  docente_dni: string;
  institucion: string;
  codigo_modular: string;
  nivel: string;
  grado: string;
  area: string;
  unidad: string;
  sesion: string;
  situacion: string;
  mejora: string;
  estrategias: string;
  resultados: string;
  reflexion: string;
  compartir: boolean;
  estado: 'borrador' | 'enviado' | 'en_revision' | 'aprobado' | 'observado';
  fecha_creacion: string;
  fecha_envio: string | null;
  observaciones: string | null;
  autor_id: string;
}

export function useFichasMADD() {
  const [fichas, setFichas] = useState<FichaMADD[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarFichas();
  }, []);

  const cargarFichas = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from('fichas_madd')
        .select('*')
        .order('fecha_creacion', { ascending: false });

      if (error) throw error;
      setFichas(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar fichas');
    } finally {
      setCargando(false);
    }
  };

  const crearFicha = async (ficha: Omit<FichaMADD, 'id' | 'fecha_creacion' | 'fecha_envio' | 'estado'>) => {
    try {
      const { data, error } = await supabase
        .from('fichas_madd')
        .insert([{
          ...ficha,
          estado: 'borrador',
          fecha_creacion: new Date().toISOString(),
          fecha_envio: null
        }])
        .select()
        .single();

      if (error) throw error;
      setFichas([data, ...fichas]);
      return { exito: true, data };
    } catch (err) {
      return { 
        exito: false, 
        error: err instanceof Error ? err.message : 'Error al crear ficha' 
      };
    }
  };

  const enviarFicha = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('fichas_madd')
        .update({ 
          estado: 'enviado',
          fecha_envio: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setFichas(fichas.map(f => f.id === id ? data : f));
      return { exito: true, data };
    } catch (err) {
      return { 
        exito: false, 
        error: err instanceof Error ? err.message : 'Error al enviar ficha' 
      };
    }
  };

  const actualizarFicha = async (id: string, cambios: Partial<FichaMADD>) => {
    try {
      const { data, error } = await supabase
        .from('fichas_madd')
        .update(cambios)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setFichas(fichas.map(f => f.id === id ? data : f));
      return { exito: true, data };
    } catch (err) {
      return { 
        exito: false, 
        error: err instanceof Error ? err.message : 'Error al actualizar ficha' 
      };
    }
  };

  const eliminarFicha = async (id: string) => {
    try {
      const { error } = await supabase
        .from('fichas_madd')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setFichas(fichas.filter(f => f.id !== id));
      return { exito: true };
    } catch (err) {
      return { 
        exito: false, 
        error: err instanceof Error ? err.message : 'Error al eliminar ficha' 
      };
    }
  };

  // Función para el administrador/evaluador
  const evaluarFicha = async (id: string, estado: 'aprobado' | 'observado', observaciones?: string) => {
    try {
      const { data, error } = await supabase
        .from('fichas_madd')
        .update({ 
          estado,
          observaciones: observaciones || null
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setFichas(fichas.map(f => f.id === id ? data : f));
      return { exito: true, data };
    } catch (err) {
      return { 
        exito: false, 
        error: err instanceof Error ? err.message : 'Error al evaluar ficha' 
      };
    }
  };

  return {
    fichas,
    cargando,
    error,
    recargar: cargarFichas,
    crearFicha,
    enviarFicha,
    actualizarFicha,
    eliminarFicha,
    evaluarFicha
  };
}
