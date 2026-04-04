const STORAGE_KEY = "miHuertoCalendarioSiembra";

function sumarDias(fechaTexto, dias) {
  const fecha = new Date(fechaTexto + "T00:00:00");
  fecha.setDate(fecha.getDate() + Number(dias || 0));
  return fecha;
}

function formatearFecha(fecha) {
  return fecha.toLocaleDateString("es-UY");
}

function hoySinHora() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return hoy;
}

function cargarHuerto() {
  const guardado = localStorage.getItem(STORAGE_KEY);
  return guardado ? JSON.parse(guardado) : [];
}

function guardarHuerto(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

function obtenerEstadoCultivo(fechaSiembra, germina, cosecha) {
  const hoy = hoySinHora();

  const fechaGerminacion = germina ? sumarDias(fechaSiembra, germina) : null;
  const fechaCosecha = cosecha ? sumarDias(fechaSiembra, cosecha) : null;

  if (fechaCosecha && hoy >= fechaCosecha) {
    return { texto: "Lista para cosechar", clase: "estado-cosecha" };
  }

  if (fechaGerminacion && hoy >= fechaGerminacion) {
    return { texto: "Germinando / creciendo", clase: "estado-germinado" };
  }

  return { texto: "Pendiente de germinación", clase: "estado-pendiente" };
}

function agregarCultivo(cultivo) {
  const lista = cargarHuerto();
  lista.push(cultivo);
  guardarHuerto(lista);
}

function eliminarCultivoPorId(id) {
  const lista = cargarHuerto().filter(item => item.id !== id);
  guardarHuerto(lista);
}

function obtenerCultivoConFechas(cultivo, plantas) {
  const plantaBase = plantas.find(p => p.nombre === cultivo.planta);
  if (!plantaBase) return null;

  const fechaGerminacion = plantaBase.germina
    ? sumarDias(cultivo.fechaSiembra, plantaBase.germina)
    : null;

  const fechaCosecha = plantaBase.cosecha
    ? sumarDias(cultivo.fechaSiembra, plantaBase.cosecha)
    : null;

  const estado = obtenerEstadoCultivo(
    cultivo.fechaSiembra,
    plantaBase.germina,
    plantaBase.cosecha
  );

  return {
    ...cultivo,
    plantaBase,
    fechaGerminacion,
    fechaCosecha,
    estado
  };
}