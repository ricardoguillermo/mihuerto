-- Agrega columna para bitacora de acciones por cultivo en MiHuerto.
-- Ejemplo de elemento: {"id":"accion-...","fecha":"2026-04-19","texto":"Agregue fertilizante"}

alter table if exists public.huerto
  add column if not exists historial_json jsonb not null default '[]'::jsonb;

comment on column public.huerto.historial_json is 'Bitacora de acciones del cultivo (json array)';
