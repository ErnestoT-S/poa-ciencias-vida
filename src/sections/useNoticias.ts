import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Noticia {
  id: string;
  titulo: string;
  contenido: string;
  imagen_url: string | null;
  categoria: string;
  fecha_publicacion: string;
  autor: string;
  destacada: boolean;
}

export function useNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarNoticias();
  }, []);

  const cargarNoticias = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .order('fecha_publicacion', { ascending: false });

      if (error) throw error;
      setNoticias(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar noticias');
    } finally {
      setCargando(false);
    }
  };

  const crearNoticia = async (noticia: Omit<Noticia, 'id' | 'fecha_publicacion'>) => {
    try {
      const { data, error } = await supabase
        .from('noticias')
        .insert([{ ...noticia, fecha_publicacion: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      setNoticias([data, ...noticias]);
      return { exito: true, data };
    } catch (err) {
      return { 
        exito: false, 
        error: err instanceof Error ? err.message : 'Error al crear noticia' 
      };
    }
  };

  const actualizarNoticia = async (id: string, cambios: Partial<Noticia>) => {
    try {
      const { data, error } = await supabase
        .from('noticias')
        .update(cambios)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setNoticias(noticias.map(n => n.id === id ? data : n));
      return { exito: true, data };
    } catch (err) {
      return { 
        exito: false, 
        error: err instanceof Error ? err.message : 'Error al actualizar noticia' 
      };
    }
  };

  const eliminarNoticia = async (id: string) => {
    try {
      const { error } = await supabase
        .from('noticias')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setNoticias(noticias.filter(n => n.id !== id));
      return { exito: true };
    } catch (err) {
      return { 
        exito: false, 
        error: err instanceof Error ? err.message : 'Error al eliminar noticia' 
      };
    }
  };

  return {
    noticias,
    cargando,
    error,
    recargar: cargarNoticias,
    crearNoticia,
    actualizarNoticia,
    eliminarNoticia
  };
}
