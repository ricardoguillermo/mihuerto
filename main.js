const contenedorPlantas = document.getElementById("contenedorPlantas");
const buscador = document.getElementById("buscador");
const filtroMes = document.getElementById("filtroMes");
const filtroCategoria = document.getElementById("filtroCategoria");
const resumenMes = document.getElementById("resumenMes");
const panelAltaPlanta = document.getElementById("panelAltaPlanta");
const formPlanta = document.getElementById("formPlanta");
const formPlantaTitulo = document.getElementById("formPlantaTitulo");
const plantaNombre = document.getElementById("plantaNombre");
const plantaCategoria = document.getElementById("plantaCategoria");
const plantaHumedad = document.getElementById("plantaHumedad");
const plantaSol = document.getElementById("plantaSol");
const plantaGermina = document.getElementById("plantaGermina");
const plantaCosecha = document.getElementById("plantaCosecha");
const plantaMeses = document.getElementById("plantaMeses");
const plantaMaceta = document.getElementById("plantaMaceta");
const plantaImg1 = document.getElementById("plantaImg1");
const plantaImg2 = document.getElementById("plantaImg2");
const plantaTips = document.getElementById("plantaTips");
const btnGuardarPlanta = document.getElementById("btnGuardarPlanta");
const btnCancelarEdicionPlanta = document.getElementById("btnCancelarEdicionPlanta");

const modal = document.getElementById("modal");
const modalDetalle = document.getElementById("modalDetalle");
const cerrarModal = document.getElementById("cerrarModal");
const btnInicioDesdeModal = document.getElementById("btnInicioDesdeModal");

const formHuerto = document.getElementById("formHuerto");
const huertoPlanta = document.getElementById("huertoPlanta");
const huertoFecha = document.getElementById("huertoFecha");
const btnFechaHoy = document.getElementById("btnFechaHoy");
const pronosticoHuerto = document.getElementById("pronosticoHuerto");
const huertoCantidad = document.getElementById("huertoCantidad");
const huertoLugar = document.getElementById("huertoLugar");
const huertoNotas = document.getElementById("huertoNotas");
const huertoPlantaManual = document.getElementById("huertoPlantaManual");
const huertoNoSemilla = document.getElementById("huertoNoSemilla");
const labelHuertoFecha = document.getElementById("labelHuertoFecha");
const contenedorHuerto = document.getElementById("contenedorHuerto");
const btnInicioDesdeHuerto = document.getElementById("btnInicioDesdeHuerto");

// ============================
// CONFIG
// ============================

const STORAGE_KEY_HUERTO = "miHuertoCalendarioSiembra";
const STORAGE_PLANTAS_KEY = "plantasPersonalizadasCalendarioSiembra";
const STORAGE_EDICIONES_PLANTAS_KEY = "plantasEditadasCalendarioSiembra";
const STORAGE_MIGRACION_HUERTO_KEY = "miHuertoMigradoASupabase";
const STORAGE_ANOTACIONES_HUERTO_KEY = "miHuertoAnotacionesCalendarioSiembra";

// Completá estos valores para activar persistencia en Supabase.
const SUPABASE_URL = window.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "";
const supabaseClient = window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
const usaNubeHuerto = Boolean(supabaseClient);

let plantaEnEdicionOrigen = null;
let cacheHuerto = [];

// ============================
// UTILIDADES
// ============================

function obtenerRutaImagen(imagen) {
  if (!imagen) return "";
  return imagen.trim();
}

function obtenerImagenPlanta(planta) {
  return obtenerRutaImagen(planta.imgEtapa2 || planta.imgEtapa1 || planta.imagen || "");
}

function limpiarMetadatosPlanta(planta) {
  const copia = { ...planta };
  delete copia._esPersonalizada;
  return copia;
}

function escaparTextoParaOnclick(texto) {
  return String(texto)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}

function escaparHtml(texto) {
  return String(texto || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizarNombrePlanta(nombre) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function crearMediaPlanta(planta, nombre) {
  const imagen = planta ? obtenerImagenPlanta(planta) : "";

  if (imagen) {
    if (planta) {
      return `
        <button class="card-link-media" type="button" onclick="irACatalogo('${nombre}')">
          <img src="${imagen}" alt="${nombre}">
        </button>
      `;
    }

    return `<img src="${imagen}" alt="${nombre}">`;
  }

  return `<div class="card-placeholder">Sin imagen disponible</div>`;
}

function obtenerMesActual() {
  return new Date().getMonth() + 1;
}

function nombreMes(numero) {
  const meses = [
    "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return meses[numero] || "";
}

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

function diasEntreFechas(fechaObjetivo, fechaBase = hoySinHora()) {
  const msPorDia = 1000 * 60 * 60 * 24;
  return Math.round((fechaObjetivo.getTime() - fechaBase.getTime()) / msPorDia);
}

function obtenerEstadoPronostico(fechaObjetivo) {
  const diferencia = diasEntreFechas(fechaObjetivo);

  if (diferencia < 0) {
    return {
      clase: "pronostico-item--vencido",
      textoDias: `hace ${Math.abs(diferencia)} día${Math.abs(diferencia) === 1 ? "" : "s"}`
    };
  }

  if (diferencia === 0) {
    return {
      clase: "pronostico-item--hoy",
      textoDias: "hoy"
    };
  }

  if (diferencia <= 7) {
    return {
      clase: "pronostico-item--cerca",
      textoDias: `en ${diferencia} día${diferencia === 1 ? "" : "s"}`
    };
  }

  return {
    clase: "pronostico-item--pendiente",
    textoDias: `en ${diferencia} día${diferencia === 1 ? "" : "s"}`
  };
}

// ============================
// LOCAL STORAGE
// ============================

function cargarHuertoLocal() {
  const guardado = localStorage.getItem(STORAGE_KEY_HUERTO);
  return guardado ? JSON.parse(guardado) : [];
}

function guardarHuertoLocal(lista) {
  localStorage.setItem(STORAGE_KEY_HUERTO, JSON.stringify(lista));
}

function cargarAnotacionesHuerto() {
  const guardado = localStorage.getItem(STORAGE_ANOTACIONES_HUERTO_KEY);
  if (!guardado) return {};

  try {
    const mapa = JSON.parse(guardado);
    return mapa && typeof mapa === "object" ? mapa : {};
  } catch {
    return {};
  }
}

function guardarAnotacionesHuerto(mapa) {
  localStorage.setItem(STORAGE_ANOTACIONES_HUERTO_KEY, JSON.stringify(mapa));
}

function normalizarHistorialAnotaciones(historial) {
  if (!Array.isArray(historial)) return [];

  return historial
    .map((item, index) => {
      const texto = String(item?.texto || "").trim();
      if (!texto) return null;

      const fecha = String(item?.fecha || "").trim();
      return {
        id: String(item?.id || `accion-${index}`),
        fecha,
        texto
      };
    })
    .filter(Boolean);
}

function obtenerAnotacionHuertoPorId(id) {
  const mapa = cargarAnotacionesHuerto();
  const guardada = mapa[String(id)] || {};

  return {
    fechaAnotacion: guardada.fechaAnotacion || "",
    foto: guardada.foto || "",
    historial: normalizarHistorialAnotaciones(guardada.historial)
  };
}

function guardarAnotacionHuertoPorId(id, datos) {
  const mapa = cargarAnotacionesHuerto();
  const clave = String(id);
  const anterior = mapa[clave] || {};
  const actualizado = {
    ...anterior,
    ...datos
  };

  const sinFecha = !actualizado.fechaAnotacion;
  const sinFoto = !actualizado.foto;
  const historial = normalizarHistorialAnotaciones(actualizado.historial);
  const sinHistorial = historial.length === 0;

  if (sinFecha && sinFoto && sinHistorial) {
    delete mapa[clave];
  } else {
    mapa[clave] = {
      fechaAnotacion: actualizado.fechaAnotacion || "",
      foto: actualizado.foto || "",
      historial
    };
  }

  guardarAnotacionesHuerto(mapa);
}

function eliminarAnotacionHuertoPorId(id) {
  const mapa = cargarAnotacionesHuerto();
  delete mapa[String(id)];
  guardarAnotacionesHuerto(mapa);
}

function cultivoDesdeFilaHuerto(fila) {
  return {
    id: fila.id,
    planta: fila.planta,
    fechaInicio: fila.fecha_inicio,
    cantidad: fila.cantidad,
    esPorSemilla: fila.es_por_semilla,
    lugar: fila.lugar || "",
    notas: fila.notas || "",
    fechaAnotacion: fila.fecha_anotacion || "",
    foto: fila.foto_url || "",
    historial: normalizarHistorialAnotaciones(fila.historial_json)
  };
}

function filaDesdeCultivo(cultivo) {
  return {
    planta: cultivo.planta,
    fecha_inicio: cultivo.fechaInicio || cultivo.fechaSiembra,
    cantidad: cultivo.cantidad,
    es_por_semilla: cultivo.esPorSemilla !== false,
    lugar: cultivo.lugar || "",
    notas: cultivo.notas || "",
    fecha_anotacion: cultivo.fechaAnotacion || null,
    foto_url: cultivo.foto || null,
    historial_json: normalizarHistorialAnotaciones(cultivo.historial)
  };
}

async function cargarHuertoPersistido() {
  if (!usaNubeHuerto) {
    return cargarHuertoLocal();
  }

  const { data, error } = await supabaseClient
    .from("huerto")
    .select("id, planta, fecha_inicio, cantidad, es_por_semilla, lugar, notas, fecha_anotacion, foto_url, historial_json, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    const esErrorColumnasAnotacion = /fecha_anotacion|foto_url|historial_json/i.test(error.message || "");

    if (esErrorColumnasAnotacion) {
      const { data: dataBase, error: errorBase } = await supabaseClient
        .from("huerto")
        .select("id, planta, fecha_inicio, cantidad, es_por_semilla, lugar, notas, created_at")
        .order("created_at", { ascending: false });

      if (errorBase) {
        console.error("No se pudo cargar MiHuerto desde Supabase:", errorBase.message);
        return cargarHuertoLocal();
      }

      return dataBase.map(cultivoDesdeFilaHuerto);
    }

    console.error("No se pudo cargar MiHuerto desde Supabase:", error.message);
    return cargarHuertoLocal();
  }

  return data.map(cultivoDesdeFilaHuerto);
}

async function guardarCultivoPersistido(cultivo) {
  if (!usaNubeHuerto) {
    const lista = cargarHuertoLocal();
    lista.push(cultivo);
    guardarHuertoLocal(lista);
    return;
  }

  const { error } = await supabaseClient
    .from("huerto")
    .insert(filaDesdeCultivo(cultivo));

  if (error) {
    throw new Error(error.message);
  }
}

async function eliminarCultivoPersistido(id) {
  if (!usaNubeHuerto) {
    const lista = cargarHuertoLocal().filter(item => String(item.id) !== String(id));
    guardarHuertoLocal(lista);
    return;
  }

  const { error } = await supabaseClient
    .from("huerto")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

function mapearCambiosCultivoAFila(cambios) {
  const fila = {};

  if (Object.prototype.hasOwnProperty.call(cambios, "planta")) {
    fila.planta = cambios.planta;
  }

  if (Object.prototype.hasOwnProperty.call(cambios, "fechaInicio")
    || Object.prototype.hasOwnProperty.call(cambios, "fechaSiembra")) {
    fila.fecha_inicio = cambios.fechaInicio || cambios.fechaSiembra;
  }

  if (Object.prototype.hasOwnProperty.call(cambios, "cantidad")) {
    fila.cantidad = cambios.cantidad;
  }

  if (Object.prototype.hasOwnProperty.call(cambios, "esPorSemilla")) {
    fila.es_por_semilla = cambios.esPorSemilla !== false;
  }

  if (Object.prototype.hasOwnProperty.call(cambios, "lugar")) {
    fila.lugar = cambios.lugar || "";
  }

  if (Object.prototype.hasOwnProperty.call(cambios, "notas")) {
    fila.notas = cambios.notas || "";
  }

  if (Object.prototype.hasOwnProperty.call(cambios, "fechaAnotacion")) {
    fila.fecha_anotacion = cambios.fechaAnotacion || null;
  }

  if (Object.prototype.hasOwnProperty.call(cambios, "foto")) {
    fila.foto_url = cambios.foto || null;
  }

  if (Object.prototype.hasOwnProperty.call(cambios, "historial")) {
    fila.historial_json = normalizarHistorialAnotaciones(cambios.historial);
  }

  return fila;
}

async function actualizarCultivoPersistido(id, cambios) {
  if (!usaNubeHuerto) {
    const lista = cargarHuertoLocal().map(item => (
      String(item.id) === String(id)
        ? { ...item, ...cambios }
        : item
    ));
    guardarHuertoLocal(lista);
    return;
  }

  const filaCambios = mapearCambiosCultivoAFila(cambios);
  let { error } = await supabaseClient
    .from("huerto")
    .update(filaCambios)
    .eq("id", id);

  const requiereColumnasAnotacion = Object.prototype.hasOwnProperty.call(filaCambios, "fecha_anotacion")
    || Object.prototype.hasOwnProperty.call(filaCambios, "foto_url")
    || Object.prototype.hasOwnProperty.call(filaCambios, "historial_json");

  if (error && requiereColumnasAnotacion && /fecha_anotacion|foto_url|historial_json/i.test(error.message || "")) {
    const sinAnotaciones = { ...filaCambios };
    delete sinAnotaciones.fecha_anotacion;
    delete sinAnotaciones.foto_url;
    delete sinAnotaciones.historial_json;

    if (Object.keys(sinAnotaciones).length > 0) {
      const resultado = await supabaseClient
        .from("huerto")
        .update(sinAnotaciones)
        .eq("id", id);

      error = resultado.error;
      if (error) {
        throw new Error(error.message);
      }
    }

    throw new Error("Tu tabla huerto todavía no tiene fecha_anotacion/foto_url/historial_json. Ejecutá la migración SQL para guardar fecha, foto y bitácora en Supabase.");
  }

  if (error) {
    throw new Error(error.message);
  }
}

async function renombrarCultivosPersistidos(nombreAnterior, nombreNuevo) {
  if (!nombreAnterior || !nombreNuevo || nombreAnterior === nombreNuevo) return;

  if (!usaNubeHuerto) {
    const huerto = cargarHuertoLocal();
    let huboCambios = false;

    const actualizado = huerto.map(item => {
      if (item.planta !== nombreAnterior) return item;
      huboCambios = true;
      return { ...item, planta: nombreNuevo };
    });

    if (huboCambios) {
      guardarHuertoLocal(actualizado);
    }
    return;
  }

  const { error } = await supabaseClient
    .from("huerto")
    .update({ planta: nombreNuevo })
    .eq("planta", nombreAnterior);

  if (error) {
    console.error("No se pudieron renombrar cultivos en Supabase:", error.message);
  }
}

async function migrarHuertoLocalASupabaseSiCorresponde() {
  if (!usaNubeHuerto) return;
  if (localStorage.getItem(STORAGE_MIGRACION_HUERTO_KEY) === "ok") return;

  const local = cargarHuertoLocal();
  if (!local.length) {
    localStorage.setItem(STORAGE_MIGRACION_HUERTO_KEY, "ok");
    return;
  }

  const { count, error: errorConteo } = await supabaseClient
    .from("huerto")
    .select("id", { count: "exact", head: true });

  if (errorConteo) {
    console.error("No se pudo verificar migración de MiHuerto:", errorConteo.message);
    return;
  }

  if ((count || 0) > 0) {
    localStorage.setItem(STORAGE_MIGRACION_HUERTO_KEY, "ok");
    return;
  }

  const filas = local.map(filaDesdeCultivo);
  const { error } = await supabaseClient
    .from("huerto")
    .insert(filas);

  if (error) {
    console.error("No se pudo migrar MiHuerto a Supabase:", error.message);
    return;
  }

  localStorage.setItem(STORAGE_MIGRACION_HUERTO_KEY, "ok");
}

async function refrescarMiHuerto() {
  const base = await cargarHuertoPersistido();
  cacheHuerto = base.map(cultivo => {
    const extra = obtenerAnotacionHuertoPorId(cultivo.id);
    return {
      ...cultivo,
      fechaAnotacion: cultivo.fechaAnotacion || extra.fechaAnotacion || "",
      foto: cultivo.foto || extra.foto || "",
      historial: normalizarHistorialAnotaciones(cultivo.historial).length
        ? normalizarHistorialAnotaciones(cultivo.historial)
        : normalizarHistorialAnotaciones(extra.historial)
    };
  });

  renderMiHuerto();
}

function cargarPlantasPersonalizadas() {
  const guardado = localStorage.getItem(STORAGE_PLANTAS_KEY);
  if (!guardado) return [];

  try {
    const lista = JSON.parse(guardado);
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

function guardarPlantasPersonalizadas(lista) {
  localStorage.setItem(STORAGE_PLANTAS_KEY, JSON.stringify(lista));
}

function cargarEdicionesPlantas() {
  const guardado = localStorage.getItem(STORAGE_EDICIONES_PLANTAS_KEY);
  if (!guardado) return [];

  try {
    const lista = JSON.parse(guardado);
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

function guardarEdicionesPlantas(lista) {
  localStorage.setItem(STORAGE_EDICIONES_PLANTAS_KEY, JSON.stringify(lista));
}

function inicializarMetadatosPlantasBase() {
  plantas.forEach(planta => {
    if (!planta._origenNombre) {
      planta._origenNombre = planta.nombre;
    }

    if (planta._esPersonalizada !== true) {
      planta._esPersonalizada = false;
    }
  });
}

function combinarPlantasBaseYCustom() {
  const personalizadas = cargarPlantasPersonalizadas();
  if (!personalizadas.length) return;

  personalizadas.forEach(plantaCustom => {
    const origenNombre = String(plantaCustom._origenNombre || plantaCustom.nombre || "");
    const existe = plantas.some(
      planta => String(planta._origenNombre || planta.nombre || "").toLowerCase() === origenNombre.toLowerCase()
    );

    if (!existe) {
      plantas.push({
        ...plantaCustom,
        _origenNombre: origenNombre,
        _esPersonalizada: true
      });
    }
  });
}

function aplicarEdicionesDePlantas() {
  const ediciones = cargarEdicionesPlantas();
  if (!ediciones.length) return;

  ediciones.forEach(edicion => {
    const origen = String(edicion?.origenNombre || "").trim();
    if (!origen || !edicion?.planta) return;

    const index = plantas.findIndex(planta =>
      String(planta._origenNombre || planta.nombre || "").toLowerCase() === origen.toLowerCase()
    );

    if (index === -1) return;

    const base = plantas[index];
    plantas[index] = {
      ...base,
      ...edicion.planta,
      _origenNombre: origen,
      _esPersonalizada: base._esPersonalizada === true
    };
  });
}

// ============================
// ESTADO CULTIVO
// ============================

function obtenerEstadoCultivo(fechaSiembra, germina, cosecha, esPorSemilla = true, tieneCalendario = true) {
  if (!tieneCalendario) {
    return { texto: "Seguimiento manual", clase: "estado-manual" };
  }

  const hoy = hoySinHora();

  const fechaGerminacion = germina ? sumarDias(fechaSiembra, germina) : null;
  const fechaCosecha = cosecha ? sumarDias(fechaSiembra, cosecha) : null;

  if (fechaCosecha && hoy >= fechaCosecha) {
    return { texto: "Lista para cosechar", clase: "estado-cosecha" };
  }

  if (fechaGerminacion && hoy >= fechaGerminacion) {
    return { texto: "Germinando / creciendo", clase: "estado-germinado" };
  }

  if (!esPorSemilla) {
    return { texto: "En crecimiento", clase: "estado-germinado" };
  }

  return { texto: "Pendiente de germinación", clase: "estado-pendiente" };
}

function obtenerNombreCultivo() {
  if (huertoPlanta.value === "__manual__") {
    return huertoPlantaManual.value.trim();
  }

  return huertoPlanta.value;
}

function fechaISOHoy() {
  return new Date().toISOString().split("T")[0];
}

function asegurarFechaHuertoInicial() {
  if (!huertoFecha.value) {
    huertoFecha.value = fechaISOHoy();
  }
}

function obtenerPlantaSeleccionadaHuerto() {
  if (!huertoPlanta.value || huertoPlanta.value === "__manual__") return null;
  return plantas.find(planta => planta.nombre === huertoPlanta.value) || null;
}

function actualizarPronosticoHuerto() {
  const fechaInicio = huertoFecha.value;
  const esPorSemilla = !huertoNoSemilla.checked;
  const plantaBase = obtenerPlantaSeleccionadaHuerto();
  pronosticoHuerto.classList.remove("pronostico-huerto--manual");

  if (!huertoPlanta.value) {
    pronosticoHuerto.innerHTML = `<p>Seleccioná una planta para ver fechas estimadas de germinación y cosecha.</p>`;
    return;
  }

  if (!fechaInicio) {
    pronosticoHuerto.innerHTML = `<p>Elegí una fecha para calcular el pronóstico.</p>`;
    return;
  }

  if (!plantaBase) {
    pronosticoHuerto.classList.add("pronostico-huerto--manual");
    pronosticoHuerto.innerHTML = `<p>Para plantas manuales, el seguimiento de fechas se hace de forma manual.</p>`;
    return;
  }

  const fechaGerminacion = esPorSemilla && plantaBase.germina
    ? sumarDias(fechaInicio, plantaBase.germina)
    : null;
  const fechaCosecha = plantaBase.cosecha
    ? sumarDias(fechaInicio, plantaBase.cosecha)
    : null;

  const etiquetaInicio = esPorSemilla ? "siembra" : "incorporación";
  const inicioTexto = formatearFecha(new Date(fechaInicio + "T00:00:00"));

  const chips = [];

  if (fechaGerminacion) {
    const estado = obtenerEstadoPronostico(fechaGerminacion);
    chips.push(`
      <span class="pronostico-item ${estado.clase}">
        Germinación: ${formatearFecha(fechaGerminacion)} (${estado.textoDias})
      </span>
    `);
  }

  if (fechaCosecha) {
    const estado = obtenerEstadoPronostico(fechaCosecha);
    chips.push(`
      <span class="pronostico-item ${estado.clase}">
        Cosecha: ${formatearFecha(fechaCosecha)} (${estado.textoDias})
      </span>
    `);
  }

  const items = chips.length
    ? chips.join("")
    : `<span class="pronostico-item pronostico-item--pendiente">No hay datos de calendario para esta planta.</span>`;

  pronosticoHuerto.innerHTML = `
    <p><strong>Si la ${etiquetaInicio} es el ${inicioTexto}</strong>, estas son las fechas aproximadas:</p>
    <div class="pronostico-items">${items}</div>
  `;
}

function actualizarFormularioHuerto() {
  const esManual = huertoPlanta.value === "__manual__";
  const esPorSemilla = !huertoNoSemilla.checked;

  huertoPlantaManual.classList.toggle("hidden", !esManual);
  huertoPlantaManual.required = esManual;
  labelHuertoFecha.textContent = esPorSemilla ? "Fecha de siembra" : "Fecha de incorporación";
  actualizarPronosticoHuerto();
}

// ============================
// SELECT PLANTAS
// ============================

function poblarSelectPlantas() {
  huertoPlanta.innerHTML = `
    <option value="">Seleccionar planta</option>
    <option value="__manual__">Otra planta no listada</option>
  `;

  plantas
    .slice()
    .sort((a, b) => a.nombre.localeCompare(b.nombre))
    .forEach(planta => {
      const option = document.createElement("option");
      option.value = planta.nombre;
      option.textContent = planta.nombre;
      huertoPlanta.appendChild(option);
    });
}

function poblarFiltroCategorias() {
  const categorias = Array.from(
    new Set(
      plantas
        .map(planta => (planta.categoria || "").trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));

  filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>';

  categorias.forEach(categoria => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    filtroCategoria.appendChild(option);
  });
}

function parsearMeses(textoMeses) {
  const numeros = textoMeses
    .split(",")
    .map(valor => Number(valor.trim()))
    .filter(valor => Number.isInteger(valor) && valor >= 1 && valor <= 12);

  return Array.from(new Set(numeros)).sort((a, b) => a - b);
}

function buscarIndicePorOrigen(origenNombre) {
  return plantas.findIndex(
    planta => String(planta._origenNombre || planta.nombre || "").toLowerCase() === String(origenNombre || "").toLowerCase()
  );
}

function actualizarTextoFormularioPlanta() {
  const enEdicion = Boolean(plantaEnEdicionOrigen);
  formPlantaTitulo.textContent = enEdicion ? "Modo edición de planta" : "Modo alta de planta";
  btnGuardarPlanta.textContent = enEdicion ? "Guardar cambios" : "Guardar planta en catálogo";
  btnCancelarEdicionPlanta.classList.toggle("hidden", !enEdicion);
}

function limpiarModoEdicionPlanta() {
  plantaEnEdicionOrigen = null;
  formPlanta.reset();
  actualizarTextoFormularioPlanta();
}

function actualizarPersonalizadasEnStorage(plantaActualizada) {
  const personalizadas = cargarPlantasPersonalizadas();
  const origen = String(plantaActualizada._origenNombre || plantaActualizada.nombre || "").toLowerCase();
  const index = personalizadas.findIndex(
    planta => String(planta._origenNombre || planta.nombre || "").toLowerCase() === origen
  );

  const datos = {
    ...limpiarMetadatosPlanta(plantaActualizada),
    _origenNombre: plantaActualizada._origenNombre || plantaActualizada.nombre
  };

  if (index === -1) {
    personalizadas.push(datos);
  } else {
    personalizadas[index] = datos;
  }

  guardarPlantasPersonalizadas(personalizadas);
}

function actualizarEdicionesBaseEnStorage(plantaActualizada) {
  const origen = plantaActualizada._origenNombre || plantaActualizada.nombre;
  const ediciones = cargarEdicionesPlantas();
  const index = ediciones.findIndex(
    item => String(item.origenNombre || "").toLowerCase() === String(origen).toLowerCase()
  );

  const nuevaEdicion = {
    origenNombre: origen,
    planta: limpiarMetadatosPlanta(plantaActualizada)
  };

  if (index === -1) {
    ediciones.push(nuevaEdicion);
  } else {
    ediciones[index] = nuevaEdicion;
  }

  guardarEdicionesPlantas(ediciones);
}

async function renombrarCultivos(nombreAnterior, nombreNuevo) {
  await renombrarCultivosPersistidos(nombreAnterior, nombreNuevo);
}

function editarPlanta(origenNombre) {
  const index = buscarIndicePorOrigen(origenNombre);
  if (index === -1) return;

  const planta = plantas[index];
  plantaEnEdicionOrigen = planta._origenNombre || planta.nombre;

  plantaNombre.value = planta.nombre || "";
  plantaCategoria.value = planta.categoria || "";
  plantaHumedad.value = planta.humedad || "";
  plantaSol.value = planta.sol || "";
  plantaGermina.value = planta.germina || "";
  plantaCosecha.value = planta.cosecha || "";
  plantaMeses.value = (planta.meses || []).join(",");
  plantaMaceta.value = planta.macetaMin || "";
  plantaImg1.value = planta.imgEtapa1 || "";
  plantaImg2.value = planta.imgEtapa2 || "";
  plantaTips.value = planta.tips || "";

  actualizarTextoFormularioPlanta();

  panelAltaPlanta.open = true;
  formPlanta.scrollIntoView({ behavior: "smooth", block: "center" });
  plantaNombre.focus();
}

// ============================
// RENDER CATÁLOGO
// ============================

function renderPlantas(lista) {
  contenedorPlantas.innerHTML = "";

  if (!lista.length) {
    contenedorPlantas.innerHTML = `<p>No se encontraron plantas.</p>`;
    return;
  }

  lista.forEach(planta => {
    const nombreSeguro = escaparTextoParaOnclick(planta.nombre);
    const origenSeguro = escaparTextoParaOnclick(planta._origenNombre || planta.nombre);
    const card = document.createElement("div");
    card.className = "card";
    card.id = `catalogo-${normalizarNombrePlanta(planta.nombre)}`;

    card.innerHTML = `
      <img src="${obtenerImagenPlanta(planta)}" alt="${planta.nombre}">
      <div class="card-body">
        <h3>${planta.nombre}</h3>
        <p><strong>Categoría:</strong> ${planta.categoria || "-"}</p>
        <p><strong>Germina en:</strong> ${planta.germina || "-"} días</p>
        <p><strong>Cosecha en:</strong> ${planta.cosecha || "-"} días</p>
        <p><strong>Sol:</strong> ${planta.sol || "-"}</p>
        <div class="acciones">
          <button class="btn-secundario" onclick="abrirModal('${nombreSeguro}')">
            Ver detalle
          </button>
          <button class="btn-secundario" onclick="editarPlanta('${origenSeguro}')">
            Editar
          </button>
        </div>
      </div>
    `;

    contenedorPlantas.appendChild(card);
  });
}

// ============================
// FILTROS
// ============================

function actualizarResumen(lista) {
  const mes = Number(filtroMes.value) || obtenerMesActual();

  resumenMes.innerHTML = `
    <strong>Resumen:</strong> hay <strong>${lista.length}</strong> plantas recomendadas para <strong>${nombreMes(mes)}</strong>.
  `;
}

function filtrarPlantas() {
  const texto = buscador.value.toLowerCase().trim();
  const mes = Number(filtroMes.value);
  const categoria = filtroCategoria.value;

  const filtradas = plantas.filter(planta => {
    const coincideNombre = planta.nombre.toLowerCase().includes(texto);
    const coincideMes = !mes || (Array.isArray(planta.meses) && planta.meses.includes(mes));
    const coincideCategoria = !categoria || planta.categoria === categoria;

    return coincideNombre && coincideMes && coincideCategoria;
  });

  renderPlantas(filtradas);
  actualizarResumen(filtradas);
}

// ============================
// MODAL
// ============================

function abrirModal(nombrePlanta) {
  const planta = plantas.find(p => p.nombre === nombrePlanta);
  if (!planta) return;

  modalDetalle.innerHTML = `
    <img class="modal-img" src="${obtenerImagenPlanta(planta)}" alt="${planta.nombre}">
    <h2>${planta.nombre}</h2>
    <p><strong>Categoría:</strong> ${planta.categoria || "-"}</p>
    <p><strong>Humedad:</strong> ${planta.humedad || "-"}</p>
    <p><strong>Meses:</strong> ${(planta.meses || []).map(nombreMes).join(", ")}</p>
    <p><strong>Germinación:</strong> ${planta.germina || "-"} días</p>
    <p><strong>Cosecha:</strong> ${planta.cosecha || "-"} días</p>
    <p><strong>Maceta mínima:</strong> ${planta.macetaMin || "-"}</p>
    <p><strong>Sol:</strong> ${planta.sol || "-"}</p>
  `;

  modal.classList.remove("hidden");
}

function cerrarVentanaModal() {
  modal.classList.add("hidden");
}

function enfocarInicio() {
  const tituloPrincipal = document.querySelector(".header h1");
  if (!tituloPrincipal) return;

  if (!tituloPrincipal.hasAttribute("tabindex")) {
    tituloPrincipal.setAttribute("tabindex", "-1");
  }

  tituloPrincipal.focus({ preventScroll: true });
}

function volverAlInicio(cerrarModalAntes = false) {
  if (cerrarModalAntes) {
    cerrarVentanaModal();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  window.setTimeout(enfocarInicio, 350);
}

function irACatalogo(nombrePlanta) {
  const plantaExiste = plantas.some(planta => planta.nombre === nombrePlanta);
  if (!plantaExiste) return;

  buscador.value = nombrePlanta;
  filtroMes.value = "";
  filtroCategoria.value = "";
  filtrarPlantas();

  const destino = document.getElementById(`catalogo-${normalizarNombrePlanta(nombrePlanta)}`);
  if (!destino) return;

  destino.scrollIntoView({ behavior: "smooth", block: "center" });
  destino.classList.add("card-destacada");

  window.setTimeout(() => {
    destino.classList.remove("card-destacada");
  }, 1800);
}

async function manejarSubmitPlanta(e) {
  e.preventDefault();

  const nombre = plantaNombre.value.trim();
  const categoria = plantaCategoria.value.trim();
  const meses = parsearMeses(plantaMeses.value);
  const enEdicion = Boolean(plantaEnEdicionOrigen);
  const origenActual = plantaEnEdicionOrigen;

  if (!nombre) {
    plantaNombre.focus();
    return;
  }

  if (!categoria) {
    plantaCategoria.focus();
    return;
  }

  if (!meses.length) {
    plantaMeses.focus();
    return;
  }

  const yaExiste = plantas.some(planta => {
    if (planta.nombre.toLowerCase() !== nombre.toLowerCase()) return false;

    if (!enEdicion) return true;

    const origenDePlanta = planta._origenNombre || planta.nombre;
    return String(origenDePlanta).toLowerCase() !== String(origenActual).toLowerCase();
  });

  if (yaExiste) {
    alert("Ya existe una planta con ese nombre en el catálogo.");
    plantaNombre.focus();
    return;
  }

  const datosPlanta = {
    nombre,
    categoria,
    humedad: plantaHumedad.value.trim() || "",
    meses,
    germina: plantaGermina.value ? Number(plantaGermina.value) : "",
    cosecha: plantaCosecha.value ? Number(plantaCosecha.value) : "",
    macetaMin: plantaMaceta.value.trim() || "",
    tips: plantaTips.value.trim() || "",
    sol: plantaSol.value.trim() || "",
    imgEtapa1: plantaImg1.value.trim() || "",
    imgEtapa2: plantaImg2.value.trim() || ""
  };

  if (enEdicion) {
    const index = buscarIndicePorOrigen(origenActual);
    if (index === -1) {
      alert("No se encontró la planta a editar.");
      return;
    }

    const plantaPrev = plantas[index];
    const plantaActualizada = {
      ...plantaPrev,
      ...datosPlanta,
      _origenNombre: origenActual,
      _esPersonalizada: plantaPrev._esPersonalizada === true
    };

    plantas[index] = plantaActualizada;

    if (plantaActualizada._esPersonalizada) {
      actualizarPersonalizadasEnStorage(plantaActualizada);
    } else {
      actualizarEdicionesBaseEnStorage(plantaActualizada);
    }

    await renombrarCultivos(plantaPrev.nombre, plantaActualizada.nombre);
    limpiarModoEdicionPlanta();
  } else {
    const nuevaPlanta = {
      ...datosPlanta,
      _origenNombre: nombre,
      _esPersonalizada: true
    };

    plantas.push(nuevaPlanta);

    const personalizadas = cargarPlantasPersonalizadas();
    personalizadas.push({
      ...datosPlanta,
      _origenNombre: nombre
    });
    guardarPlantasPersonalizadas(personalizadas);
    formPlanta.reset();
  }

  poblarFiltroCategorias();
  poblarSelectPlantas();
  buscador.value = nombre;
  filtrarPlantas();
  await refrescarMiHuerto();
}

// ============================
// MI HUERTO
// ============================

function renderMiHuerto() {
  const lista = cacheHuerto;
  contenedorHuerto.innerHTML = "";

  if (!lista.length) {
    contenedorHuerto.innerHTML = `<p>No hay cultivos todavía.</p>`;
    return;
  }

  lista.forEach(cultivo => {
    const plantaBase = plantas.find(p => p.nombre === cultivo.planta);
    const fechaInicio = cultivo.fechaInicio || cultivo.fechaSiembra;
    const esPorSemilla = cultivo.esPorSemilla !== false;
    const fechaAnotacion = cultivo.fechaAnotacion || "";
    const fotoPersonalizada = cultivo.foto || "";
    const historial = normalizarHistorialAnotaciones(cultivo.historial);

    if (!fechaInicio) return;

    const fechaGerminacion = esPorSemilla && plantaBase?.germina
      ? sumarDias(fechaInicio, plantaBase.germina)
      : null;

    const fechaCosecha = plantaBase?.cosecha
      ? sumarDias(fechaInicio, plantaBase.cosecha)
      : null;

    const estado = obtenerEstadoCultivo(
      fechaInicio,
      esPorSemilla ? plantaBase?.germina : null,
      plantaBase?.cosecha,
      esPorSemilla,
      Boolean(plantaBase)
    );

    const cantidadTexto = cultivo.cantidad ? `<p><strong>Cantidad:</strong> ${cultivo.cantidad}</p>` : "";
    const germinacionTexto = esPorSemilla
      ? `<p><strong>Germina:</strong> ${fechaGerminacion ? formatearFecha(fechaGerminacion) : "-"}</p>`
      : "";
    const cosechaTexto = fechaCosecha
      ? `<p><strong>Cosecha:</strong> ${formatearFecha(fechaCosecha)}</p>`
      : `<p><strong>Cosecha:</strong> -</p>`;
    const calendarioTexto = plantaBase ? "" : `<p><strong>Calendario:</strong> cultivo agregado manualmente</p>`;
    const notasTexto = cultivo.notas
      ? `<p><strong>Notas:</strong> ${escaparHtml(cultivo.notas)}</p>`
      : `<p><strong>Notas:</strong> -</p>`;
    const fechaAnotacionTexto = fechaAnotacion
      ? `<p><strong>Fecha anotación:</strong> ${formatearFecha(new Date(fechaAnotacion + "T00:00:00"))}</p>`
      : `<p><strong>Fecha anotación:</strong> -</p>`;
    const imagenCultivo = obtenerRutaImagen(fotoPersonalizada) || (plantaBase ? obtenerImagenPlanta(plantaBase) : "");

    const card = document.createElement("div");
    card.className = "card";
    const nombreSeguro = escaparTextoParaOnclick(cultivo.planta);
    const idSeguro = escaparTextoParaOnclick(String(cultivo.id));
    const notasSeguro = escaparHtml(cultivo.notas || "");
    const fechaAnotacionSeguro = escaparHtml(fechaAnotacion);
    const fotoSeguro = escaparHtml(fotoPersonalizada);
    const historialHtml = historial.length
      ? `
        <ul class="historial-lista">
          ${historial.map(accion => {
            const accionIdSeguro = escaparTextoParaOnclick(String(accion.id));
            const textoAccion = escaparHtml(accion.texto || "");
            const fechaAccion = accion.fecha
              ? formatearFecha(new Date(accion.fecha + "T00:00:00"))
              : "Sin fecha";

            return `
              <li class="historial-item">
                <div class="historial-texto">
                  <strong>${fechaAccion}:</strong> ${textoAccion}
                </div>
                <div class="acciones">
                  <button type="button" class="btn-secundario btn-mini" onclick="editarAccionCultivo('${idSeguro}', '${accionIdSeguro}')">Editar</button>
                  <button type="button" class="btn-danger btn-mini" onclick="eliminarAccionCultivo('${idSeguro}', '${accionIdSeguro}')">Eliminar</button>
                </div>
              </li>
            `;
          }).join("")}
        </ul>
      `
      : `<p class="historial-vacio">Sin acciones registradas todavía.</p>`;
    const tituloCultivo = plantaBase
      ? `<button class="card-link-titulo" type="button" onclick="irACatalogo('${nombreSeguro}')">${cultivo.planta}</button>`
      : escaparHtml(cultivo.planta);

    const mediaCultivo = imagenCultivo
      ? `<img src="${imagenCultivo}" alt="${escaparHtml(cultivo.planta)}">`
      : `<div class="card-placeholder">Sin imagen disponible</div>`;

    card.innerHTML = `
      ${mediaCultivo}
      <div class="card-body">
        <h3>${tituloCultivo}</h3>
        <p><strong>${esPorSemilla ? "Siembra" : "Incorporación"}:</strong> ${formatearFecha(new Date(fechaInicio))}</p>
        ${germinacionTexto}
        ${cosechaTexto}
        ${cantidadTexto}
        <p><strong>Lugar:</strong> ${escaparHtml(cultivo.lugar || "-")}</p>
        ${calendarioTexto}
        ${notasTexto}
        ${fechaAnotacionTexto}
        <span class="estado ${estado.clase}">${estado.texto}</span>

        <details class="editor-anotacion">
          <summary>Editar nota y foto</summary>
          <form class="form-anotacion" data-id="${idSeguro}" data-foto-actual="${fotoSeguro}" onsubmit="guardarAnotacionCultivo(event, '${idSeguro}')">
            <label>
              Fecha de anotación
              <input type="date" name="fechaAnotacion" value="${fechaAnotacionSeguro}">
            </label>

            <label>
              Nota
              <textarea name="notas" placeholder="Ej: Hoy la vi más grande, regué menos...">${notasSeguro}</textarea>
            </label>

            <label>
              Foto (URL o ruta)
              <input type="text" name="fotoUrl" value="${fotoSeguro}" placeholder="/img/mi-planta.jpg o https://...">
            </label>

            <label>
              O subir una foto
              <input type="file" name="fotoArchivo" accept="image/*">
            </label>

            <label class="opcion-check opcion-check-anotacion" for="quitarFoto-${idSeguro}">
              <input type="checkbox" name="quitarFoto" id="quitarFoto-${idSeguro}">
              Quitar foto personalizada
            </label>

            <div class="acciones">
              <button type="submit" class="btn-secundario">Guardar anotación</button>
            </div>
          </form>
        </details>

        <details class="editor-anotacion">
          <summary>Bitácora de acciones (fertilizante, poda, etc.)</summary>
          <form class="form-anotacion" onsubmit="agregarAccionCultivo(event, '${idSeguro}')">
            <label>
              Fecha de la acción
              <input type="date" name="fechaAccion" value="${fechaISOHoy()}">
            </label>

            <label>
              Acción realizada
              <textarea name="textoAccion" placeholder="Ej: Agregué fertilizante líquido 10-10-10"></textarea>
            </label>

            <div class="acciones">
              <button type="submit" class="btn-secundario">Agregar acción</button>
            </div>
          </form>

          <div class="historial-anotaciones">
            ${historialHtml}
          </div>
        </details>

        <div class="acciones">
          <button class="btn-danger" onclick="eliminarCultivo('${idSeguro}')">
            Eliminar
          </button>
        </div>
      </div>
    `;

    contenedorHuerto.appendChild(card);
  });
}

async function eliminarCultivo(id) {
  try {
    await eliminarCultivoPersistido(id);
    eliminarAnotacionHuertoPorId(id);
    await refrescarMiHuerto();
  } catch (error) {
    alert(`No se pudo eliminar el cultivo: ${error.message}`);
  }
}

function leerArchivoComoDataURL(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(String(lector.result || ""));
    lector.onerror = () => reject(new Error("No se pudo leer la imagen seleccionada."));
    lector.readAsDataURL(archivo);
  });
}

async function guardarAnotacionCultivo(event, id) {
  event.preventDefault();
  const formulario = event.currentTarget;

  const notas = String(formulario.elements.notas?.value || "").trim();
  const fechaAnotacion = String(formulario.elements.fechaAnotacion?.value || "").trim();
  const fotoUrl = String(formulario.elements.fotoUrl?.value || "").trim();
  const quitarFoto = Boolean(formulario.elements.quitarFoto?.checked);
  const archivo = formulario.elements.fotoArchivo?.files?.[0];
  const fotoActual = String(formulario.dataset.fotoActual || "").trim();

  let fotoFinal = fotoUrl || fotoActual;

  if (quitarFoto) {
    fotoFinal = "";
  }

  if (archivo) {
    try {
      fotoFinal = await leerArchivoComoDataURL(archivo);
    } catch (error) {
      alert(error.message);
      return;
    }
  }

  try {
    await actualizarCultivoPersistido(id, {
      notas,
      fechaAnotacion,
      foto: fotoFinal
    });

    guardarAnotacionHuertoPorId(id, {
      fechaAnotacion,
      foto: fotoFinal
    });
    await refrescarMiHuerto();
  } catch (error) {
    alert(`No se pudo guardar la anotación: ${error.message}`);
  }
}

async function agregarAccionCultivo(event, id) {
  event.preventDefault();
  const formulario = event.currentTarget;
  const fecha = String(formulario.elements.fechaAccion?.value || "").trim() || fechaISOHoy();
  const texto = String(formulario.elements.textoAccion?.value || "").trim();

  if (!texto) {
    formulario.elements.textoAccion?.focus();
    return;
  }

  const anotacion = obtenerAnotacionHuertoPorId(id);
  const historial = normalizarHistorialAnotaciones(anotacion.historial);

  historial.unshift({
    id: `accion-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    fecha,
    texto
  });

  const cultivo = cacheHuerto.find(item => String(item.id) === String(id));
  if (cultivo && usaNubeHuerto) {
    try {
      await actualizarCultivoPersistido(id, { historial });
    } catch (error) {
      alert(`No se pudo guardar la acción en la nube: ${error.message}`);
      return;
    }
  }

  guardarAnotacionHuertoPorId(id, { historial });
  await refrescarMiHuerto();
}

async function editarAccionCultivo(id, accionId) {
  const anotacion = obtenerAnotacionHuertoPorId(id);
  const historial = normalizarHistorialAnotaciones(anotacion.historial);
  const index = historial.findIndex(accion => String(accion.id) === String(accionId));
  if (index === -1) return;

  const actual = historial[index];
  const textoNuevo = window.prompt("Editar anotación:", actual.texto || "");
  if (textoNuevo === null) return;

  const texto = String(textoNuevo).trim();
  if (!texto) {
    alert("La anotación no puede quedar vacía.");
    return;
  }

  const fechaNueva = window.prompt("Fecha (AAAA-MM-DD):", actual.fecha || "");
  if (fechaNueva === null) return;

  const fecha = String(fechaNueva).trim();
  if (fecha && !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    alert("La fecha debe tener formato AAAA-MM-DD.");
    return;
  }

  historial[index] = {
    ...actual,
    texto,
    fecha
  };

  const cultivo = cacheHuerto.find(item => String(item.id) === String(id));
  if (cultivo && usaNubeHuerto) {
    try {
      await actualizarCultivoPersistido(id, { historial });
    } catch (error) {
      alert(`No se pudo editar la acción en la nube: ${error.message}`);
      return;
    }
  }

  guardarAnotacionHuertoPorId(id, { historial });
  await refrescarMiHuerto();
}

async function eliminarAccionCultivo(id, accionId) {
  const confirmar = window.confirm("¿Eliminar esta acción de la bitácora?");
  if (!confirmar) return;

  const anotacion = obtenerAnotacionHuertoPorId(id);
  const historial = normalizarHistorialAnotaciones(anotacion.historial)
    .filter(accion => String(accion.id) !== String(accionId));

  const cultivo = cacheHuerto.find(item => String(item.id) === String(id));
  if (cultivo && usaNubeHuerto) {
    try {
      await actualizarCultivoPersistido(id, { historial });
    } catch (error) {
      alert(`No se pudo eliminar la acción en la nube: ${error.message}`);
      return;
    }
  }

  guardarAnotacionHuertoPorId(id, { historial });
  await refrescarMiHuerto();
}

async function manejarSubmitHuerto(e) {
  e.preventDefault();

  const nombreCultivo = obtenerNombreCultivo();

  if (!nombreCultivo) {
    if (!huertoPlanta.value) {
      huertoPlanta.focus();
      return;
    }

    huertoPlantaManual.focus();
    return;
  }

  const cantidad = huertoCantidad.value ? Number(huertoCantidad.value) : null;

  const nuevaSiembra = {
    id: usaNubeHuerto ? undefined : Date.now(),
    planta: nombreCultivo,
    fechaInicio: huertoFecha.value,
    cantidad,
    esPorSemilla: !huertoNoSemilla.checked,
    lugar: huertoLugar.value.trim(),
    notas: huertoNotas.value.trim()
  };

  try {
    await guardarCultivoPersistido(nuevaSiembra);
  } catch (error) {
    alert(`No se pudo guardar en MiHuerto: ${error.message}`);
    return;
  }

  formHuerto.reset();
  asegurarFechaHuertoInicial();
  actualizarFormularioHuerto();
  await refrescarMiHuerto();
}

// ============================
// INIT
// ============================

async function init() {
  inicializarMetadatosPlantasBase();
  combinarPlantasBaseYCustom();
  aplicarEdicionesDePlantas();
  filtroMes.value = obtenerMesActual();

  poblarSelectPlantas();
  poblarFiltroCategorias();
  filtrarPlantas();
  await migrarHuertoLocalASupabaseSiCorresponde();
  await refrescarMiHuerto();
  asegurarFechaHuertoInicial();

  buscador.addEventListener("input", filtrarPlantas);
  filtroMes.addEventListener("change", filtrarPlantas);
  filtroCategoria.addEventListener("change", filtrarPlantas);
  huertoPlanta.addEventListener("change", actualizarFormularioHuerto);
  huertoNoSemilla.addEventListener("change", actualizarFormularioHuerto);
  huertoFecha.addEventListener("change", actualizarPronosticoHuerto);
  huertoPlantaManual.addEventListener("input", actualizarPronosticoHuerto);
  btnFechaHoy.addEventListener("click", () => {
    huertoFecha.value = fechaISOHoy();
    actualizarPronosticoHuerto();
  });

  cerrarModal.addEventListener("click", cerrarVentanaModal);
  btnInicioDesdeModal.addEventListener("click", () => volverAlInicio(true));
  btnInicioDesdeHuerto.addEventListener("click", () => volverAlInicio(false));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarVentanaModal();
  });

  formHuerto.addEventListener("submit", manejarSubmitHuerto);
  formPlanta.addEventListener("submit", manejarSubmitPlanta);
  btnCancelarEdicionPlanta.addEventListener("click", limpiarModoEdicionPlanta);
  actualizarTextoFormularioPlanta();
  actualizarFormularioHuerto();
  actualizarPronosticoHuerto();
}

window.abrirModal = abrirModal;
window.editarPlanta = editarPlanta;
window.eliminarCultivo = eliminarCultivo;
window.irACatalogo = irACatalogo;
window.guardarAnotacionCultivo = guardarAnotacionCultivo;
window.agregarAccionCultivo = agregarAccionCultivo;
window.editarAccionCultivo = editarAccionCultivo;
window.eliminarAccionCultivo = eliminarAccionCultivo;

init().catch((error) => {
  console.error("Error al iniciar la app:", error);
});