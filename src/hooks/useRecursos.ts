import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Recurso {
  id: string;
  titulo: string;
  descripcion: string;
  archivo_url: string;
  tipo: 'pdf' | 'imagen' | 'video' | 'zip' | 'excel' | 'word';
  categoria: string;
  autor_id: string;
  autor_nombre: string;
  fecha_subida: string;
  descargas: number;
  tamaño: string;
}

export function useRecursos() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarRecursos();
  }, []);

  const cargarRecursos = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from('recursos')
        .select('*')
        .order('fecha_subida', { ascending: false });

      if (error) throw error;
      setRecursos(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar recursos');
    } finally {
      setCargando(false);
    }
  };

  const subirRecurso = async (
    archivo: File, 
    metadata: Omit<Recurso, 'id' | 'archivo_url' | 'fecha_subida' | 'descargas'>
  ) => {
    try {
      // Subir archivo a Storage
      const nombreArchivo = `${Date.now()}_${archivo.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('recursos')
        .upload(nombreArchivo, archivo);

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('recursos')
        .getPublicUrl(nombreArchivo);

      // Guardar metadatos en la base de datos
      const { data, error } = await supabase
        .from('recursos')
        .insert([{
          ...metadata,
          archivo_url: publicUrl,
          fecha_subida: new Date().toISOString(),
          descargas: 0
        }])
        .select()
        .single();

      if (error) throw error;
      setRecursos([data, ...recursos]);
      return { exito: true, data };
    } catch (err) {
      return { 
        exito: false, 
        error: err instanceof Error ? err.message : 'Error al subir recurso' 
      };
    }
  };

  const incrementarDescargas = async (id: string) => {
    try {
      const recurso = recursos.find(r => r.id === id);
      if (!recurso) return;

      const { error } = await supabase
        .from('recursos')
        .update({ descargas: recurso.descargas + 1 })
        .eq('id', id);

      if (error) throw error;
      
      setRecursos(recursos.map(r => 
        r.id === id ? { ...r, descargas: r.descargas + 1 } : r
      ));
    } catch (err) {
      console.error('Error al incrementar descargas:', err);
    }
  };

  const eliminarRecurso = async (id: string, archivoUrl: string) => {
    try {
      // Extraer nombre del archivo de la URL
      const nombreArchivo = archivoUrl.split('/').pop();
      
      if (nombreArchivo) {
        // Eliminar archivo de Storage
        await supabase.storage
          .from('recursos')
          .remove([nombreArchivo]);
      }

      // Eliminar registro de la base de datos
      const { error } = await supabase
        .from('recursos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setRecursos(recursos.filter(r => r.id !== id));
      return { exito: true };
    } catch (err) {
      return { 
        exito: false, 
        error: err instanceof Error ? err.message : 'Error al eliminar recurso' 
      };
    }
  };

  return {
    recursos,
    cargando,
    error,
    recargar: cargarRecursos,
    subirRecurso,
    incrementarDescargas,
    eliminarRecurso
  };
}
