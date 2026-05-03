-- Tabla para plantas personalizadas y ediciones de plantas base del usuario.
-- Es idempotente: no falla si la tabla ya existe.

create table if not exists public.plantas_custom (
  origen_nombre    text        primary key,
  datos_json       jsonb       not null default '{}'::jsonb,
  es_personalizada boolean     not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

comment on table  public.plantas_custom                  is 'Plantas agregadas o editadas por el usuario en el catálogo';
comment on column public.plantas_custom.origen_nombre    is 'Nombre estable de la planta (clave, no cambia al renombrar)';
comment on column public.plantas_custom.datos_json       is 'Datos completos de la planta serializados como JSON';
comment on column public.plantas_custom.es_personalizada is 'true = planta nueva del usuario, false = edición de planta base';
