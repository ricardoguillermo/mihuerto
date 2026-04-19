-- Agrega campos para guardar anotaciones avanzadas por ficha en MiHuerto.
-- Es idempotente: no falla si las columnas ya existen.

alter table if exists public.huerto
  add column if not exists fecha_anotacion date;

alter table if exists public.huerto
  add column if not exists foto_url text;

comment on column public.huerto.fecha_anotacion is 'Fecha de la anotacion manual del cultivo';
comment on column public.huerto.foto_url is 'URL, ruta o Data URL de foto personalizada del cultivo';
