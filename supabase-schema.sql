-- ============================================================
-- ESQUEMA DE BASE DE DATOS PARA POA CIENCIAS PARA LA VIDA
-- UGEL Huaylas - 2026
-- ============================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLA: PERFILES DE USUARIO
-- ============================================================
CREATE TABLE IF NOT EXISTS perfiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    nombre_completo TEXT NOT NULL,
    dni TEXT UNIQUE,
    institucion TEXT,
    cargo TEXT,
    telefono TEXT,
    rol TEXT DEFAULT 'docente' CHECK (rol IN ('admin', 'especialista', 'docente', 'director')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- TABLA: NOTICIAS
-- ============================================================
CREATE TABLE IF NOT EXISTS noticias (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo TEXT NOT NULL,
    contenido TEXT NOT NULL,
    imagen_url TEXT,
    categoria TEXT DEFAULT 'general',
    fecha_publicacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    autor_id UUID REFERENCES perfiles(id),
    autor TEXT NOT NULL,
    destacada BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- TABLA: RECURSOS COMPARTIDOS
-- ============================================================
CREATE TABLE IF NOT EXISTS recursos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    archivo_url TEXT NOT NULL,
    tipo TEXT CHECK (tipo IN ('pdf', 'imagen', 'video', 'zip', 'excel', 'word')),
    categoria TEXT DEFAULT 'general',
    autor_id UUID REFERENCES perfiles(id),
    autor_nombre TEXT NOT NULL,
    fecha_subida TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    descargas INTEGER DEFAULT 0,
    tamaño TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- TABLA: TALLERES VIRTUALES
-- ============================================================
CREATE TABLE IF NOT EXISTS talleres (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    fecha_inicio TIMESTAMP WITH TIME ZONE,
    fecha_fin TIMESTAMP WITH TIME ZONE,
    modalidad TEXT CHECK (modalidad IN ('virtual', 'presencial', 'hibrido')),
    enlace_meet TEXT,
    cupos INTEGER DEFAULT 0,
    inscritos INTEGER DEFAULT 0,
    estado TEXT DEFAULT 'proximo' CHECK (estado IN ('proximo', 'en_curso', 'finalizado', 'cancelado')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- TABLA: INSCRIPCIONES A TALLERES
-- ============================================================
CREATE TABLE IF NOT EXISTS inscripciones_talleres (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    taller_id UUID REFERENCES talleres(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES perfiles(id) ON DELETE CASCADE,
    fecha_inscripcion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    asistencia BOOLEAN DEFAULT FALSE,
    certificado_emitido BOOLEAN DEFAULT FALSE,
    UNIQUE(taller_id, usuario_id)
);

-- ============================================================
-- TABLA: FICHAS MADD
-- ============================================================
CREATE TABLE IF NOT EXISTS fichas_madd (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    docente_nombre TEXT NOT NULL,
    docente_dni TEXT NOT NULL,
    institucion TEXT NOT NULL,
    codigo_modular TEXT NOT NULL,
    nivel TEXT NOT NULL,
    grado TEXT NOT NULL,
    area TEXT NOT NULL,
    unidad TEXT NOT NULL,
    sesion TEXT NOT NULL,
    situacion TEXT NOT NULL,
    mejora TEXT NOT NULL,
    estrategias TEXT NOT NULL,
    resultados TEXT NOT NULL,
    reflexion TEXT NOT NULL,
    compartir BOOLEAN DEFAULT FALSE,
    estado TEXT DEFAULT 'borrador' CHECK (estado IN ('borrador', 'enviado', 'en_revision', 'aprobado', 'observado')),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fecha_envio TIMESTAMP WITH TIME ZONE,
    observaciones TEXT,
    autor_id UUID REFERENCES perfiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- TABLA: REGISTRO DE ACTIVIDADES POA
-- ============================================================
CREATE TABLE IF NOT EXISTS registros_actividades (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    actividad_id TEXT NOT NULL,
    actividad_nombre TEXT NOT NULL,
    institucion TEXT NOT NULL,
    fecha_ejecucion DATE NOT NULL,
    participantes INTEGER NOT NULL,
    descripcion TEXT NOT NULL,
    resultados TEXT NOT NULL,
    dificultades TEXT,
    evidencias TEXT[],
    autor_id UUID REFERENCES perfiles(id),
    autor_nombre TEXT NOT NULL,
    estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'revisado', 'aprobado')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- TABLA: MÓDULOS DEL AULA VIRTUAL
-- ============================================================
CREATE TABLE IF NOT EXISTS modulos_aula (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    orden INTEGER DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- TABLA: LECCIONES DEL AULA VIRTUAL
-- ============================================================
CREATE TABLE IF NOT EXISTS lecciones (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    modulo_id UUID REFERENCES modulos_aula(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    tipo TEXT CHECK (tipo IN ('video', 'pdf', 'articulo', 'cuestionario')),
    contenido_url TEXT,
    duracion TEXT,
    orden INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- TABLA: PROGRESO DE ESTUDIANTES EN AULA VIRTUAL
-- ============================================================
CREATE TABLE IF NOT EXISTS progreso_lecciones (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    leccion_id UUID REFERENCES lecciones(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES perfiles(id) ON DELETE CASCADE,
    completado BOOLEAN DEFAULT FALSE,
    fecha_completado TIMESTAMP WITH TIME ZONE,
    UNIQUE(leccion_id, usuario_id)
);

-- ============================================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- ============================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE noticias ENABLE ROW LEVEL SECURITY;
ALTER TABLE recursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE talleres ENABLE ROW LEVEL SECURITY;
ALTER TABLE inscripciones_talleres ENABLE ROW LEVEL SECURITY;
ALTER TABLE fichas_madd ENABLE ROW LEVEL SECURITY;
ALTER TABLE registros_actividades ENABLE ROW LEVEL SECURITY;
ALTER TABLE modulos_aula ENABLE ROW LEVEL SECURITY;
ALTER TABLE lecciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE progreso_lecciones ENABLE ROW LEVEL SECURITY;

-- Políticas para perfiles
CREATE POLICY "Perfiles visibles para todos autenticados" ON perfiles
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Usuarios pueden editar su propio perfil" ON perfiles
    FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Políticas para noticias
CREATE POLICY "Noticias visibles para todos" ON noticias
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin y especialistas pueden crear noticias" ON noticias
    FOR INSERT TO authenticated WITH CHECK (
        EXISTS (SELECT 1 FROM perfiles WHERE id = auth.uid() AND rol IN ('admin', 'especialista'))
    );

-- Políticas para recursos
CREATE POLICY "Recursos visibles para todos" ON recursos
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Usuarios autenticados pueden subir recursos" ON recursos
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = autor_id);
CREATE POLICY "Autores pueden eliminar sus recursos" ON recursos
    FOR DELETE TO authenticated USING (auth.uid() = autor_id);

-- Políticas para fichas MADD
CREATE POLICY "Usuarios ven sus propias fichas" ON fichas_madd
    FOR SELECT TO authenticated USING (auth.uid() = autor_id);
CREATE POLICY "Admin ve todas las fichas" ON fichas_madd
    FOR SELECT TO authenticated USING (
        EXISTS (SELECT 1 FROM perfiles WHERE id = auth.uid() AND rol = 'admin')
    );
CREATE POLICY "Usuarios pueden crear fichas" ON fichas_madd
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = autor_id);

-- Políticas para registros de actividades
CREATE POLICY "Usuarios ven sus propios registros" ON registros_actividades
    FOR SELECT TO authenticated USING (auth.uid() = autor_id);
CREATE POLICY "Admin ve todos los registros" ON registros_actividades
    FOR SELECT TO authenticated USING (
        EXISTS (SELECT 1 FROM perfiles WHERE id = auth.uid() AND rol = 'admin')
    );

-- ============================================================
-- FUNCIONES Y TRIGGERS
-- ============================================================

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_perfiles_updated_at BEFORE UPDATE ON perfiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para crear perfil automáticamente al registrar usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.perfiles (id, nombre_completo, rol)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'docente');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil al registrar usuario
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- DATOS INICIALES
-- ============================================================

-- Insertar módulos del aula virtual
INSERT INTO modulos_aula (titulo, descripcion, orden) VALUES
('Módulo 1: Introducción a Ciencias para la Vida', 'Fundamentos y enfoque del área curricular', 1),
('Módulo 2: Competencias y Capacidades', 'Desarrollo de competencias en el área', 2),
('Módulo 3: Sesiones de Aprendizaje', 'Diseño e implementación de sesiones', 3),
('Módulo 4: Evaluación del Aprendizaje', 'Instrumentos y estrategias de evaluación', 4);

-- Insertar talleres iniciales
INSERT INTO talleres (titulo, descripcion, fecha_inicio, fecha_fin, modalidad, cupos, estado) VALUES
('Taller: Implementación del Currículo de Ciencias para la Vida', 'Socialización del enfoque y estructura del área', '2025-02-15 09:00:00+00', '2025-02-15 13:00:00+00', 'presencial', 45, 'proximo'),
('Webinar: Estrategias de Evaluación Formativa', 'Técnicas y instrumentos para evaluar en Ciencias para la Vida', '2025-03-10 15:00:00+00', '2025-03-10 17:00:00+00', 'virtual', 100, 'proximo');

-- Insertar noticias iniciales
INSERT INTO noticias (titulo, contenido, categoria, autor, destacada) VALUES
('Inicio del POA Ciencias para la Vida 2026', 'Damos inicio al Plan Operativo Anual del área de Ciencias para la Vida. Todos los docentes están invitados a participar activamente.', 'general', 'Especialista CIA', true),
('Cronograma de Talleres Febrero', 'Se publica el cronograma de talleres para el mes de febrero. Inscripciones abiertas desde el 10 de febrero.', 'talleres', 'UGEL Huaylas', false);
