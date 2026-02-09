import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Noticia {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  fecha: string;
  autor: string;
  categoria: string;
  imagen?: string;
  destacada: boolean;
  vistas: number;
  etiquetas: string[];
  created_at: string;
}

export interface Recurso {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'documento' | 'presentacion' | 'video' | 'imagen' | 'audio' | 'enlace';
  categoria: string;
  autor: string;
  ie: string;
  distrito: string;
  fecha: string;
  archivo_url?: string;
  tamano?: string;
  descargas: number;
  likes: number;
  calificacion: number;
  etiquetas: string[];
  destacado: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  nombres: string;
  apellidos: string;
  ie?: string;
  distrito?: string;
  especialidad?: string;
  rol: 'docente' | 'especialista' | 'admin';
  avatar_url?: string;
  created_at: string;
}
