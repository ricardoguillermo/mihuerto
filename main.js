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
const botonesIrSeccion = document.querySelectorAll("[data-ir-seccion]");
const seccionCatalogo = document.getElementById("seccionCatalogo");
const seccionHuerto = document.getElementById("seccionHuerto");
const seccionNotas = document.getElementById("seccionNotas");
const seccionPlano = document.getElementById("seccionPlano");

const formPlano = document.getElementById("formPlano");
const planoUrl = document.getElementById("planoUrl");
const planoArchivo = document.getElementById("planoArchivo");
const planoOpacidad = document.getElementById("planoOpacidad");
const planoNotas = document.getElementById("planoNotas");
const planoMapa = document.getElementById("planoMapa");
const planoCoordenadas = document.getElementById("planoCoordenadas");
const btnCentrarPlano = document.getElementById("btnCentrarPlano");
const btnRestaurarPlano = document.getElementById("btnRestaurarPlano");
const btnAjustarImagenPlano = document.getElementById("btnAjustarImagenPlano");
const btnResetAjusteImagenPlano = document.getElementById("btnResetAjusteImagenPlano");
const estadoImagenPlano = document.getElementById("estadoImagenPlano");
const previewImagenPlano = document.getElementById("previewImagenPlano");
const previewImagenPlanoImg = document.getElementById("previewImagenPlanoImg");
const previewImagenPlanoTexto = document.getElementById("previewImagenPlanoTexto");
const planoZonaNombre = document.getElementById("planoZonaNombre");
const planoZonaTipo = document.getElementById("planoZonaTipo");
const btnIniciarDibujoPlano = document.getElementById("btnIniciarDibujoPlano");
const btnFinalizarDibujoPlano = document.getElementById("btnFinalizarDibujoPlano");
const btnCancelarDibujoPlano = document.getElementById("btnCancelarDibujoPlano");
const estadoDibujoPlano = document.getElementById("estadoDibujoPlano");
const contenedorPlano = document.getElementById("contenedorPlano");

const formMisNotas = document.getElementById("formMisNotas");
const misNotasFecha = document.getElementById("misNotasFecha");
const misNotasTexto = document.getElementById("misNotasTexto");
const misNotasFotoUrl = document.getElementById("misNotasFotoUrl");
const misNotasFotosArchivo = document.getElementById("misNotasFotosArchivo");
const btnDictarNota = document.getElementById("btnDictarNota");
const btnGrabarAudioNota = document.getElementById("btnGrabarAudioNota");
const estadoAudioNota = document.getElementById("estadoAudioNota");
const previewAudioNota = document.getElementById("previewAudioNota");
const btnMesNotasPrev = document.getElementById("btnMesNotasPrev");
const btnMesNotasNext = document.getElementById("btnMesNotasNext");
const misNotasMesActual = document.getElementById("misNotasMesActual");
const misNotasGrid = document.getElementById("misNotasGrid");
const misNotasSeleccionInfo = document.getElementById("misNotasSeleccionInfo");
const contenedorMisNotasDia = document.getElementById("contenedorMisNotasDia");

// ============================
// CONFIG
// ============================

const STORAGE_KEY_HUERTO = "miHuertoCalendarioSiembra";
const STORAGE_PLANTAS_KEY = "plantasPersonalizadasCalendarioSiembra";
const STORAGE_EDICIONES_PLANTAS_KEY = "plantasEditadasCalendarioSiembra";
const STORAGE_MIGRACION_HUERTO_KEY = "miHuertoMigradoASupabase";
const STORAGE_MIGRACION_PLANTAS_KEY = "miPlantasMigradosASupabase";
const STORAGE_ANOTACIONES_HUERTO_KEY = "miHuertoAnotacionesCalendarioSiembra";
const STORAGE_MIS_NOTAS_KEY = "misNotasCalendarioSiembra";
const STORAGE_PLANO_KEY = "planoSolarCalendarioSiembra";

// Completá estos valores para activar persistencia en Supabase.
const SUPABASE_URL = window.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "";
const supabaseClient = window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
const usaNubeHuerto = Boolean(supabaseClient);
let nubeHuertoDisponible = usaNubeHuerto;
let avisoNubeNoDisponibleMostrado = false;

let plantaEnEdicionOrigen = null;
let cacheHuerto = [];
let cacheMisNotas = [];
let fechaMisNotasSeleccionada = "";
let mesMisNotasActual = new Date().getMonth();
let anioMisNotasActual = new Date().getFullYear();
let reconocimientoVozNotaActivo = null;
let grabadoraAudioNota = null;
let temporizadorAudioNota = null;
let audioNotaTemporal = "";
let estadoPlano = null;
let mapaPlano = null;
let capaLimiteSolar = null;
let capaCasaPrincipal = null;
let capaPergola = null;
let capaCasaAnibal = null;
let capaImagenPlano = null;
let marcadoresPlano = {};
let capasZonasCustom = [];
let marcadoresDibujoPlano = [];
let capaDibujoPlano = null;
let dibujoPlanoActivo = null;
let indiceColorZona = 0;
let ajustandoImagenPlano = false;
let puntosAjusteImagen = [];
let capaRectanguloAjusteImagen = null;
let previewImagenPlanoObjectUrl = "";

const COLORES_ZONAS = ["#3b82f6", "#f97316", "#7c3aed", "#059669", "#dc2626", "#0891b2"];

const PUNTOS_POR_ESTRUCTURA = {
  limiteSolar: ["A", "B", "C", "D"],
  casaPrincipal: ["e", "f", "g", "h", "i", "j", "k", "l"],
  pergola: ["k", "l", "m", "n"],
  casaAnibal: ["o", "p", "q", "r"]
};

const PLANO_BASE = {
  centro: [-34.76513632472459, -55.64704034899056],
  zoom: 20,
  opacidadImagen: 0.65,
  notas: "",
  imagenUrl: "",
  imagenBounds: null,
  zonasCustom: [],
  puntos: {
    A: [-34.76514658125373, -55.64712791388836],
    B: [-34.76512606819545, -55.64695278409277],
    C: [-34.765607, -55.646948],
    D: [-34.765632, -55.647136],
    e: [-34.765312, -55.647042],
    f: [-34.765306, -55.646999],
    g: [-34.765259, -55.646993],
    h: [-34.765238, -55.646963],
    i: [-34.765372, -55.646936],
    j: [-34.765423, -55.646972],
    k: [-34.765452, -55.647026],
    l: [-34.765362, -55.647068],
    m: [-34.765507, -55.647014],
    n: [-34.765511, -55.647085],
    o: [-34.765531, -55.647003],
    p: [-34.765520, -55.646926],
    q: [-34.765584, -55.646913],
    r: [-34.765596, -55.646993]
  }
};

function debeUsarNubeHuerto() {
  return usaNubeHuerto && nubeHuertoDisponible;
}

function mensajeDesdeError(error, fallback = "Error desconocido") {
  if (!error) return fallback;
  if (typeof error.message === "string" && error.message.trim()) return error.message;
  if (typeof error === "string" && error.trim()) return error;
  return fallback;
}

function esErrorDeRed(error) {
  const mensaje = mensajeDesdeError(error, "");
  if (!mensaje) return false;

  return /failed to fetch|networkerror|load failed|network request failed/i.test(mensaje);
}

function desactivarNubePorErrorDeRed(error, contexto) {
  if (!debeUsarNubeHuerto() || !esErrorDeRed(error)) {
    return false;
  }

  nubeHuertoDisponible = false;
  console.warn(`MiHuerto: Supabase no disponible (${contexto}). Se usa almacenamiento local.`, error);

  if (!avisoNubeNoDisponibleMostrado) {
    avisoNubeNoDisponibleMostrado = true;
    alert("No se pudo conectar con la nube de MiHuerto. Se guardará en este dispositivo (localStorage) hasta que vuelva la conexión.");
  }

  return true;
}

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

function clonarPlanoBase() {
  return JSON.parse(JSON.stringify(PLANO_BASE));
}

function esCoordenadaValida(valor) {
  return Array.isArray(valor)
    && valor.length === 2
    && Number.isFinite(Number(valor[0]))
    && Number.isFinite(Number(valor[1]));
}

function normalizarEstadoPlano(estado) {
  const base = clonarPlanoBase();
  if (!estado || typeof estado !== "object") return base;

  const puntos = { ...base.puntos };
  Object.entries(estado.puntos || {}).forEach(([clave, coords]) => {
    if (puntos[clave] && esCoordenadaValida(coords)) {
      puntos[clave] = [Number(coords[0]), Number(coords[1])];
    }
  });

  const centroValido = esCoordenadaValida(estado.centro)
    ? [Number(estado.centro[0]), Number(estado.centro[1])]
    : base.centro;

  const zoom = Number.isFinite(Number(estado.zoom))
    ? Number(estado.zoom)
    : base.zoom;

  const opacidadImagen = Number.isFinite(Number(estado.opacidadImagen))
    ? Math.min(1, Math.max(0.1, Number(estado.opacidadImagen)))
    : base.opacidadImagen;

  let imagenBounds = null;
  if (
    Array.isArray(estado.imagenBounds)
    && estado.imagenBounds.length === 2
    && esCoordenadaValida(estado.imagenBounds[0])
    && esCoordenadaValida(estado.imagenBounds[1])
  ) {
    imagenBounds = [
      [Number(estado.imagenBounds[0][0]), Number(estado.imagenBounds[0][1])],
      [Number(estado.imagenBounds[1][0]), Number(estado.imagenBounds[1][1])]
    ];
  }

  const zonasCustom = Array.isArray(estado.zonasCustom)
    ? estado.zonasCustom
      .map((zona, index) => normalizarZonaCustom(zona, index))
      .filter(Boolean)
    : [];

  return {
    centro: centroValido,
    zoom,
    opacidadImagen,
    notas: String(estado.notas || ""),
    imagenUrl: String(estado.imagenUrl || ""),
    imagenBounds,
    zonasCustom,
    puntos
  };
}

function normalizarZonaCustom(zona, index = 0) {
  if (!zona || typeof zona !== "object") return null;

  const tipo = String(zona.tipo || "poligono").toLowerCase() === "polilinea"
    ? "polilinea"
    : "poligono";

  const puntos = Array.isArray(zona.puntos)
    ? zona.puntos
      .filter(esCoordenadaValida)
      .map(([lat, lng]) => [Number(lat), Number(lng)])
    : [];

  const minPuntos = tipo === "polilinea" ? 2 : 3;
  if (puntos.length < minPuntos) return null;

  return {
    id: String(zona.id || `zona-${Date.now()}-${index}`),
    nombre: String(zona.nombre || `Zona ${index + 1}`),
    tipo,
    color: String(zona.color || COLORES_ZONAS[index % COLORES_ZONAS.length]),
    puntos
  };
}

function cargarPlanoLocal() {
  const guardado = localStorage.getItem(STORAGE_PLANO_KEY);
  if (!guardado) return clonarPlanoBase();

  try {
    return normalizarEstadoPlano(JSON.parse(guardado));
  } catch {
    return clonarPlanoBase();
  }
}

function guardarPlanoLocal(estado) {
  guardarEnStorageSeguro(STORAGE_PLANO_KEY, JSON.stringify(estado), "el plano del solar");
}

function aLatLng(punto) {
  return window.L.latLng(Number(punto[0]), Number(punto[1]));
}

function calcularDistanciaMetros(puntos, cerrar = false) {
  const latLngs = (puntos || []).filter(esCoordenadaValida).map(aLatLng);
  if (latLngs.length < 2) return 0;

  let distancia = 0;
  for (let i = 1; i < latLngs.length; i += 1) {
    distancia += latLngs[i - 1].distanceTo(latLngs[i]);
  }

  if (cerrar) {
    distancia += latLngs[latLngs.length - 1].distanceTo(latLngs[0]);
  }

  return distancia;
}

function calcularAreaM2(puntos) {
  if (!mapaPlano || !Array.isArray(puntos) || puntos.length < 3) return 0;

  const proyectados = puntos
    .filter(esCoordenadaValida)
    .map((coord) => mapaPlano.options.crs.project(aLatLng(coord)));

  if (proyectados.length < 3) return 0;

  let suma = 0;
  for (let i = 0; i < proyectados.length; i += 1) {
    const actual = proyectados[i];
    const siguiente = proyectados[(i + 1) % proyectados.length];
    suma += (actual.x * siguiente.y) - (siguiente.x * actual.y);
  }

  return Math.abs(suma / 2);
}

function formatearMetros(valor) {
  if (valor >= 1000) return `${(valor / 1000).toFixed(2)} km`;
  return `${valor.toFixed(1)} m`;
}

function formatearArea(valor) {
  if (valor >= 1000000) return `${(valor / 1000000).toFixed(3)} km²`;
  if (valor >= 10000) return `${(valor / 10000).toFixed(2)} ha`;
  return `${valor.toFixed(1)} m²`;
}

function obtenerMetricasPlano() {
  if (!estadoPlano) return [];

  const metricasBase = [
    {
      etiqueta: "Límite del solar",
      tipo: "polilinea",
      puntos: PUNTOS_POR_ESTRUCTURA.limiteSolar.map((nombre) => estadoPlano.puntos[nombre]).filter(esCoordenadaValida)
    },
    {
      etiqueta: "Casa principal",
      tipo: "poligono",
      puntos: PUNTOS_POR_ESTRUCTURA.casaPrincipal.map((nombre) => estadoPlano.puntos[nombre]).filter(esCoordenadaValida)
    },
    {
      etiqueta: "Pérgola",
      tipo: "poligono",
      puntos: PUNTOS_POR_ESTRUCTURA.pergola.map((nombre) => estadoPlano.puntos[nombre]).filter(esCoordenadaValida)
    },
    {
      etiqueta: "Casa de Aníbal",
      tipo: "poligono",
      puntos: PUNTOS_POR_ESTRUCTURA.casaAnibal.map((nombre) => estadoPlano.puntos[nombre]).filter(esCoordenadaValida)
    }
  ];

  const metricasCustom = (estadoPlano.zonasCustom || []).map((zona) => ({
    etiqueta: zona.nombre,
    tipo: zona.tipo,
    idZona: zona.id,
    puntos: zona.puntos
  }));

  return [...metricasBase, ...metricasCustom].map((item) => {
    const esPoligono = item.tipo === "poligono";
    const perimetro = calcularDistanciaMetros(item.puntos, esPoligono);
    const area = esPoligono ? calcularAreaM2(item.puntos) : 0;
    return {
      ...item,
      perimetro,
      area
    };
  });
}

function tipoPuntoPlano(nombrePunto) {
  if (PUNTOS_POR_ESTRUCTURA.limiteSolar.includes(nombrePunto)) return "limite";
  if (PUNTOS_POR_ESTRUCTURA.casaAnibal.includes(nombrePunto)) return "anibal";
  if (["m", "n"].includes(nombrePunto)) return "pergola";
  return "casa";
}

function iconoPuntoPlano(tipo) {
  return window.L.divIcon({
    className: "",
    html: `<span class="punto-icon punto-icon--${tipo}"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
}

function boundsDePlano() {
  const coordenadas = Object.values(estadoPlano?.puntos || {})
    .filter(esCoordenadaValida)
    .map(([lat, lng]) => window.L.latLng(lat, lng));

  if (!coordenadas.length) return null;
  return window.L.latLngBounds(coordenadas);
}

function renderCoordenadasPlano() {
  if (!planoCoordenadas || !estadoPlano) return;

  const formatear = (nombre) => {
    const [lat, lng] = estadoPlano.puntos[nombre] || [0, 0];
    return `${nombre}: ${lat.toFixed(12)}, ${lng.toFixed(12)}`;
  };

  const texto = [
    "Limite del solar (polilinea)",
    ...PUNTOS_POR_ESTRUCTURA.limiteSolar.map(formatear),
    "",
    "Casa principal (poligono)",
    ...PUNTOS_POR_ESTRUCTURA.casaPrincipal.map(formatear),
    "",
    "Pergola (poligono)",
    ...PUNTOS_POR_ESTRUCTURA.pergola.map(formatear),
    "",
    "Casa de Anibal (poligono)",
    ...PUNTOS_POR_ESTRUCTURA.casaAnibal.map(formatear),
    "",
    "Zonas personalizadas"
  ].join("\n");

  const zonasTexto = (estadoPlano.zonasCustom || []).flatMap((zona) => {
    const cabecera = `- ${zona.nombre} (${zona.tipo})`;
    const puntos = zona.puntos.map((coord, index) => {
      const prefijo = zona.tipo === "polilinea" ? "L" : "Z";
      return `  ${prefijo}${index + 1}: ${Number(coord[0]).toFixed(12)}, ${Number(coord[1]).toFixed(12)}`;
    });
    return [cabecera, ...puntos];
  });

  planoCoordenadas.textContent = zonasTexto.length ? `${texto}\n${zonasTexto.join("\n")}` : `${texto}\n- Sin zonas aún.`;
}

function renderResumenPlano() {
  if (!contenedorPlano || !estadoPlano) return;

  const nota = estadoPlano.notas.trim()
    ? escaparHtml(estadoPlano.notas.trim())
    : "Sin notas guardadas.";

  const imagen = estadoPlano.imagenUrl
    ? `<img src="${estadoPlano.imagenUrl}" alt="Plano de referencia">`
    : "<div class=\"card-placeholder\">Sin imagen aérea cargada</div>";

  const metricas = obtenerMetricasPlano();
  const metricasHtml = metricas
    .map((item) => {
      const areaTexto = item.tipo === "poligono" ? ` | Área: ${formatearArea(item.area)}` : "";
      const botonEliminar = item.idZona
        ? `<button type="button" class="btn-mini btn-danger" onclick="eliminarZonaPlano('${escaparTextoParaOnclick(item.idZona)}')">Eliminar</button>`
        : "";

      return `
        <div class="plano-metricas">
          <p><strong>${escaparHtml(item.etiqueta)}</strong></p>
          <p>Perímetro: ${formatearMetros(item.perimetro)}${areaTexto}</p>
          ${botonEliminar ? `<div class="plano-zonas-acciones">${botonEliminar}</div>` : ""}
        </div>
      `;
    })
    .join("");

  contenedorPlano.innerHTML = `
    <article class="card nota-card">
      ${imagen}
      <div class="card-body">
        <h3>Plano del solar</h3>
        <p><strong>Puntos:</strong> ${Object.keys(estadoPlano.puntos).length}</p>
        <p><strong>Zonas personalizadas:</strong> ${(estadoPlano.zonasCustom || []).length}</p>
        <p><strong>Opacidad imagen:</strong> ${Math.round((estadoPlano.opacidadImagen || 0.65) * 100)}%</p>
        <p><strong>Notas:</strong> ${nota}</p>
        ${metricasHtml}
      </div>
    </article>
  `;
}

function actualizarImagenPlanoEnMapa() {
  if (!mapaPlano || !window.L) return;

  if (capaImagenPlano) {
    mapaPlano.removeLayer(capaImagenPlano);
    capaImagenPlano = null;
  }

  if (!estadoPlano?.imagenUrl) return;

  const bounds = estadoPlano?.imagenBounds
    ? window.L.latLngBounds(estadoPlano.imagenBounds)
    : boundsDePlano();

  if (!bounds || !bounds.isValid()) return;

  const boundsFinal = estadoPlano?.imagenBounds ? bounds : bounds.pad(0.22);

  capaImagenPlano = window.L.imageOverlay(estadoPlano.imagenUrl, boundsFinal, {
    opacity: estadoPlano.opacidadImagen || 0.65,
    interactive: false
  });
  capaImagenPlano.addTo(mapaPlano);

  capaImagenPlano.on("load", () => {
    if (!estadoImagenPlano) return;
    if (ajustandoImagenPlano) return;
    estadoImagenPlano.textContent = estadoPlano?.imagenBounds
      ? "Imagen cargada con encuadre manual activo."
      : "Imagen cargada con encuadre automático por defecto.";
  });

  capaImagenPlano.on("error", () => {
    if (!estadoImagenPlano) return;
    estadoImagenPlano.textContent = "No se pudo renderizar la imagen en el mapa. Probá con otro archivo o reseteá el encuadre.";
  });
}

function actualizarEstadoImagenPlano() {
  if (!estadoImagenPlano || !estadoPlano) return;

  if (ajustandoImagenPlano) {
    estadoImagenPlano.textContent = `Ajuste activo: seleccioná dos esquinas sobre el mapa (${puntosAjusteImagen.length}/2).`;
    return;
  }

  if (estadoPlano.imagenBounds) {
    estadoImagenPlano.textContent = "Encuadre manual activo para la imagen aérea.";
    return;
  }

  estadoImagenPlano.textContent = estadoPlano.imagenUrl
    ? "Imagen cargada con encuadre automático por defecto."
    : "Encuadre automático por defecto.";
}

function limpiarVistaPreviaImagenPlano() {
  if (previewImagenPlanoObjectUrl) {
    URL.revokeObjectURL(previewImagenPlanoObjectUrl);
    previewImagenPlanoObjectUrl = "";
  }
}

function mostrarVistaPreviaImagenPlano(url, texto) {
  if (!previewImagenPlano || !previewImagenPlanoImg || !previewImagenPlanoTexto) return;

  if (!url) {
    previewImagenPlano.classList.add("hidden");
    previewImagenPlanoImg.removeAttribute("src");
    previewImagenPlanoTexto.textContent = "Sin imagen seleccionada.";
    limpiarVistaPreviaImagenPlano();
    return;
  }

  previewImagenPlano.classList.remove("hidden");
  previewImagenPlanoImg.src = url;
  previewImagenPlanoTexto.textContent = texto || "Vista previa lista.";
}

function limpiarRectanguloAjusteImagen() {
  if (!mapaPlano || !capaRectanguloAjusteImagen) return;
  mapaPlano.removeLayer(capaRectanguloAjusteImagen);
  capaRectanguloAjusteImagen = null;
}

function boundsDesdeDosPuntos(p1, p2) {
  const latMin = Math.min(p1.lat, p2.lat);
  const latMax = Math.max(p1.lat, p2.lat);
  const lngMin = Math.min(p1.lng, p2.lng);
  const lngMax = Math.max(p1.lng, p2.lng);
  return [[latMin, lngMin], [latMax, lngMax]];
}

function alternarAjusteImagenPlano() {
  if (!estadoPlano || !mapaPlano) return;

  if (!estadoPlano.imagenUrl) {
    alert("Primero cargá o pegá una imagen aérea y guardá el plano.");
    return;
  }

  ajustandoImagenPlano = !ajustandoImagenPlano;
  puntosAjusteImagen = [];
  limpiarRectanguloAjusteImagen();
  if (btnAjustarImagenPlano) {
    btnAjustarImagenPlano.textContent = ajustandoImagenPlano
      ? "Cancelar ajuste superposición"
      : "Ajustar superposición (2 clics)";
  }
  actualizarEstadoImagenPlano();
}

function resetAjusteImagenPlano() {
  if (!estadoPlano) return;

  estadoPlano.imagenBounds = null;
  guardarPlanoLocal(estadoPlano);
  actualizarImagenPlanoEnMapa();
  actualizarEstadoImagenPlano();
}

function capturarClickAjusteImagenPlano(latlng) {
  if (!ajustandoImagenPlano || !estadoPlano || !mapaPlano) return false;

  puntosAjusteImagen.push(latlng);
  if (puntosAjusteImagen.length === 1) {
    limpiarRectanguloAjusteImagen();
    capaRectanguloAjusteImagen = window.L.rectangle(window.L.latLngBounds(latlng, latlng), {
      color: "#f59e0b",
      weight: 2,
      dashArray: "6 4",
      fillOpacity: 0.05
    }).addTo(mapaPlano);
    actualizarEstadoImagenPlano();
    return true;
  }

  const bounds = boundsDesdeDosPuntos(puntosAjusteImagen[0], puntosAjusteImagen[1]);
  estadoPlano.imagenBounds = bounds;
  guardarPlanoLocal(estadoPlano);

  if (capaRectanguloAjusteImagen) {
    capaRectanguloAjusteImagen.setBounds(window.L.latLngBounds(bounds));
  }

  ajustandoImagenPlano = false;
  puntosAjusteImagen = [];
  if (btnAjustarImagenPlano) {
    btnAjustarImagenPlano.textContent = "Ajustar superposición (2 clics)";
  }
  limpiarRectanguloAjusteImagen();
  actualizarImagenPlanoEnMapa();
  actualizarEstadoImagenPlano();
  return true;
}

function colorSiguienteZona() {
  const color = COLORES_ZONAS[indiceColorZona % COLORES_ZONAS.length];
  indiceColorZona += 1;
  return color;
}

function limpiarDibujoTemporal() {
  if (!mapaPlano) return;

  if (capaDibujoPlano) {
    mapaPlano.removeLayer(capaDibujoPlano);
    capaDibujoPlano = null;
  }

  marcadoresDibujoPlano.forEach((marker) => mapaPlano.removeLayer(marker));
  marcadoresDibujoPlano = [];
}

function renderEstadoDibujoPlano() {
  if (!estadoDibujoPlano) return;

  if (!dibujoPlanoActivo) {
    estadoDibujoPlano.textContent = "Sin dibujo activo.";
    return;
  }

  const tipoTexto = dibujoPlanoActivo.tipo === "poligono" ? "polígono" : "polilínea";
  estadoDibujoPlano.textContent = `Dibujo activo (${tipoTexto}): ${dibujoPlanoActivo.nombre}. Puntos: ${dibujoPlanoActivo.puntos.length}. Hacé clic en el mapa para agregar vértices.`;
}

function actualizarControlesDibujoPlano() {
  const activo = Boolean(dibujoPlanoActivo);
  if (btnIniciarDibujoPlano) btnIniciarDibujoPlano.disabled = activo;
  if (btnFinalizarDibujoPlano) btnFinalizarDibujoPlano.disabled = !activo;
  if (btnCancelarDibujoPlano) btnCancelarDibujoPlano.disabled = !activo;
  renderEstadoDibujoPlano();
}

function redibujarDibujoTemporal() {
  if (!mapaPlano || !dibujoPlanoActivo) return;

  limpiarDibujoTemporal();
  const latLngs = dibujoPlanoActivo.puntos.map((coord) => aLatLng(coord));
  if (!latLngs.length) return;

  if (dibujoPlanoActivo.tipo === "poligono" && latLngs.length >= 3) {
    capaDibujoPlano = window.L.polygon(latLngs, {
      color: dibujoPlanoActivo.color,
      weight: 3,
      fillColor: dibujoPlanoActivo.color,
      fillOpacity: 0.2,
      dashArray: "6 5"
    }).addTo(mapaPlano);
  } else {
    capaDibujoPlano = window.L.polyline(latLngs, {
      color: dibujoPlanoActivo.color,
      weight: 3,
      dashArray: "6 5"
    }).addTo(mapaPlano);
  }

  marcadoresDibujoPlano = latLngs.map((latLng, index) => {
    const marker = window.L.circleMarker(latLng, {
      radius: 5,
      color: "#ffffff",
      weight: 2,
      fillColor: dibujoPlanoActivo.color,
      fillOpacity: 0.95
    }).addTo(mapaPlano);

    marker.bindTooltip(`P${index + 1}`, {
      permanent: true,
      direction: "right",
      offset: [6, 0],
      className: "punto-etiqueta"
    });

    return marker;
  });
}

function cancelarDibujoPlano() {
  dibujoPlanoActivo = null;
  limpiarDibujoTemporal();
  actualizarControlesDibujoPlano();
}

function iniciarDibujoPlano() {
  if (!mapaPlano || dibujoPlanoActivo) return;

  const nombreBase = String(planoZonaNombre?.value || "").trim();
  const nombre = nombreBase || `Zona ${((estadoPlano?.zonasCustom || []).length + 1)}`;
  const tipo = String(planoZonaTipo?.value || "poligono") === "polilinea" ? "polilinea" : "poligono";

  dibujoPlanoActivo = {
    id: `zona-${Date.now()}`,
    nombre,
    tipo,
    color: colorSiguienteZona(),
    puntos: []
  };

  actualizarControlesDibujoPlano();
}

function agregarPuntoDibujoPlano(latlng) {
  if (!dibujoPlanoActivo) return;

  dibujoPlanoActivo.puntos.push([latlng.lat, latlng.lng]);
  redibujarDibujoTemporal();
  renderEstadoDibujoPlano();
}

function finalizarDibujoPlano() {
  if (!dibujoPlanoActivo || !estadoPlano) return;

  const minPuntos = dibujoPlanoActivo.tipo === "polilinea" ? 2 : 3;
  if (dibujoPlanoActivo.puntos.length < minPuntos) {
    alert(`La zona necesita al menos ${minPuntos} puntos.`);
    return;
  }

  estadoPlano.zonasCustom = estadoPlano.zonasCustom || [];
  estadoPlano.zonasCustom.push({
    id: dibujoPlanoActivo.id,
    nombre: dibujoPlanoActivo.nombre,
    tipo: dibujoPlanoActivo.tipo,
    color: dibujoPlanoActivo.color,
    puntos: dibujoPlanoActivo.puntos.map((coord) => [Number(coord[0]), Number(coord[1])])
  });

  guardarPlanoLocal(estadoPlano);
  cancelarDibujoPlano();
  actualizarCapasPlano();
}

function renderZonasCustomEnMapa() {
  if (!mapaPlano || !estadoPlano) return;

  capasZonasCustom.forEach((layer) => mapaPlano.removeLayer(layer));
  capasZonasCustom = [];

  (estadoPlano.zonasCustom || []).forEach((zona) => {
    const latLngs = zona.puntos.filter(esCoordenadaValida).map((coord) => aLatLng(coord));
    if (latLngs.length < (zona.tipo === "polilinea" ? 2 : 3)) return;

    const opciones = {
      color: zona.color,
      weight: 3,
      fillColor: zona.color,
      fillOpacity: zona.tipo === "poligono" ? 0.18 : 0,
      dashArray: zona.tipo === "polilinea" ? "8 4" : ""
    };

    const layer = zona.tipo === "polilinea"
      ? window.L.polyline(latLngs, opciones)
      : window.L.polygon(latLngs, opciones);

    const medida = zona.tipo === "polilinea"
      ? `Longitud: ${formatearMetros(calcularDistanciaMetros(zona.puntos, false))}`
      : `Perímetro: ${formatearMetros(calcularDistanciaMetros(zona.puntos, true))} | Área: ${formatearArea(calcularAreaM2(zona.puntos))}`;

    layer.bindTooltip(`${escaparHtml(zona.nombre)}\n${medida}`, {
      sticky: true,
      className: "punto-etiqueta"
    });

    layer.addTo(mapaPlano);
    capasZonasCustom.push(layer);
  });
}

function eliminarZonaPlano(idZona) {
  if (!estadoPlano) return;

  const confirmar = window.confirm("¿Eliminar esta zona personalizada?");
  if (!confirmar) return;

  estadoPlano.zonasCustom = (estadoPlano.zonasCustom || [])
    .filter((zona) => String(zona.id) !== String(idZona));
  guardarPlanoLocal(estadoPlano);
  actualizarCapasPlano();
}

function actualizarCapasPlano() {
  if (!mapaPlano || !estadoPlano || !window.L) return;

  if (capaLimiteSolar) mapaPlano.removeLayer(capaLimiteSolar);
  if (capaCasaPrincipal) mapaPlano.removeLayer(capaCasaPrincipal);
  if (capaPergola) mapaPlano.removeLayer(capaPergola);
  if (capaCasaAnibal) mapaPlano.removeLayer(capaCasaAnibal);

  Object.values(marcadoresPlano).forEach((marcador) => {
    mapaPlano.removeLayer(marcador);
  });
  marcadoresPlano = {};

  const p = estadoPlano.puntos;
  const latLngs = (nombres) => nombres.map((nombre) => p[nombre]);

  capaLimiteSolar = window.L.polyline(latLngs(PUNTOS_POR_ESTRUCTURA.limiteSolar), {
    color: "#f0c419",
    weight: 4,
    opacity: 0.95
  }).addTo(mapaPlano);

  capaCasaPrincipal = window.L.polygon(latLngs(PUNTOS_POR_ESTRUCTURA.casaPrincipal), {
    color: "#d64541",
    weight: 3,
    fillColor: "#d64541",
    fillOpacity: 0.22
  }).addTo(mapaPlano);

  capaPergola = window.L.polygon(latLngs(PUNTOS_POR_ESTRUCTURA.pergola), {
    color: "#2ca25f",
    weight: 3,
    fillColor: "#2ca25f",
    fillOpacity: 0.28
  }).addTo(mapaPlano);

  capaCasaAnibal = window.L.polygon(latLngs(PUNTOS_POR_ESTRUCTURA.casaAnibal), {
    color: "#2a8f6b",
    weight: 3,
    fillColor: "#2a8f6b",
    fillOpacity: 0.23
  }).addTo(mapaPlano);

  Object.entries(p).forEach(([nombre, coordenada]) => {
    const tipo = tipoPuntoPlano(nombre);
    const marcador = window.L.marker(coordenada, {
      draggable: true,
      icon: iconoPuntoPlano(tipo),
      title: `Punto ${nombre}`
    });

    marcador.bindTooltip(nombre, {
      permanent: true,
      direction: "top",
      className: "punto-etiqueta",
      offset: [0, -12]
    });

    marcador.on("dragend", () => {
      const { lat, lng } = marcador.getLatLng();
      estadoPlano.puntos[nombre] = [lat, lng];
      guardarPlanoLocal(estadoPlano);
      actualizarCapasPlano();
      renderCoordenadasPlano();
      renderResumenPlano();
    });

    marcador.addTo(mapaPlano);
    marcadoresPlano[nombre] = marcador;
  });

  renderZonasCustomEnMapa();
  actualizarImagenPlanoEnMapa();
  renderCoordenadasPlano();
  renderResumenPlano();
  actualizarControlesDibujoPlano();
}

function centrarPlanoEnVista() {
  if (!mapaPlano) return;

  if (estadoPlano?.imagenUrl) {
    const boundsImagen = estadoPlano?.imagenBounds
      ? window.L.latLngBounds(estadoPlano.imagenBounds)
      : boundsDePlano()?.pad(0.22);

    if (boundsImagen && boundsImagen.isValid()) {
      mapaPlano.fitBounds(boundsImagen.pad(0.2));
      return;
    }
  }

  const bounds = boundsDePlano();
  if (bounds && bounds.isValid()) {
    mapaPlano.fitBounds(bounds.pad(0.35));
    return;
  }

  mapaPlano.setView(estadoPlano?.centro || PLANO_BASE.centro, estadoPlano?.zoom || PLANO_BASE.zoom);
}

async function manejarSubmitPlano(evento) {
  evento.preventDefault();
  if (!estadoPlano) return;

  let imagenFinal = String(planoUrl?.value || "").trim();

  const archivoPlano = planoArchivo?.files?.[0];
  if (archivoPlano) {
    imagenFinal = await leerArchivoComoDataURL(archivoPlano);
  }

  estadoPlano.notas = String(planoNotas?.value || "").trim();
  estadoPlano.opacidadImagen = Number(planoOpacidad?.value || estadoPlano.opacidadImagen || 0.65);
  const cambioImagen = imagenFinal && imagenFinal !== estadoPlano.imagenUrl;
  estadoPlano.imagenUrl = imagenFinal || estadoPlano.imagenUrl || "";

  if (cambioImagen) {
    // Al cargar una imagen nueva la hacemos visible ocupando la vista actual.
    const boundsVisibles = mapaPlano?.getBounds();
    estadoPlano.imagenBounds = boundsVisibles && boundsVisibles.isValid()
      ? [
        [boundsVisibles.getSouth(), boundsVisibles.getWest()],
        [boundsVisibles.getNorth(), boundsVisibles.getEast()]
      ]
      : null;
  }

  guardarPlanoLocal(estadoPlano);
  mostrarVistaPreviaImagenPlano(
    estadoPlano.imagenUrl,
    estadoPlano.imagenUrl.startsWith("data:") ? "Imagen cargada desde archivo local." : "Imagen cargada desde URL."
  );
  actualizarImagenPlanoEnMapa();
  centrarPlanoEnVista();
  renderResumenPlano();

  if (planoArchivo) {
    planoArchivo.value = "";
  }
}

async function manejarCambioArchivoPlano(evento) {
  const archivo = evento.target.files && evento.target.files[0];

  if (!archivo) {
    mostrarVistaPreviaImagenPlano(
      estadoPlano?.imagenUrl || "",
      estadoPlano?.imagenUrl ? "Imagen guardada en el plano." : "Sin imagen seleccionada."
    );
    return;
  }

  limpiarVistaPreviaImagenPlano();
  previewImagenPlanoObjectUrl = URL.createObjectURL(archivo);
  mostrarVistaPreviaImagenPlano(previewImagenPlanoObjectUrl, `Archivo listo para guardar: ${archivo.name}`);
}

function restaurarPlanoBase() {
  const confirmar = window.confirm("Se restauraran los puntos base del plano. ¿Continuar?");
  if (!confirmar) return;

  cancelarDibujoPlano();
  estadoPlano = clonarPlanoBase();
  if (planoUrl) planoUrl.value = estadoPlano.imagenUrl;
  if (planoNotas) planoNotas.value = estadoPlano.notas;
  if (planoOpacidad) planoOpacidad.value = String(estadoPlano.opacidadImagen);
  if (planoZonaNombre) planoZonaNombre.value = "";
  if (planoZonaTipo) planoZonaTipo.value = "poligono";
  guardarPlanoLocal(estadoPlano);
  actualizarCapasPlano();
  centrarPlanoEnVista();
  actualizarEstadoImagenPlano();
}

function inicializarPlanoSolar() {
  if (!formPlano || !planoMapa) return;

  if (!window.L) {
    if (contenedorPlano) {
      contenedorPlano.innerHTML = "<p class=\"resumen\">No se pudo cargar Leaflet en este momento.</p>";
    }
    return;
  }

  estadoPlano = cargarPlanoLocal();
  if (planoUrl) planoUrl.value = estadoPlano.imagenUrl;
  if (planoNotas) planoNotas.value = estadoPlano.notas;
  if (planoOpacidad) planoOpacidad.value = String(estadoPlano.opacidadImagen || 0.65);
  if (planoZonaTipo) planoZonaTipo.value = "poligono";
  mostrarVistaPreviaImagenPlano(
    estadoPlano.imagenUrl,
    estadoPlano.imagenUrl ? "Imagen guardada en el plano." : "Sin imagen seleccionada."
  );

  mapaPlano = window.L.map(planoMapa, {
    zoomControl: true,
    preferCanvas: true
  });

  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 21,
    attribution: "&copy; OpenStreetMap"
  }).addTo(mapaPlano);

  actualizarCapasPlano();
  centrarPlanoEnVista();

  mapaPlano.on("moveend", () => {
    if (!estadoPlano) return;
    const centro = mapaPlano.getCenter();
    estadoPlano.centro = [centro.lat, centro.lng];
    estadoPlano.zoom = mapaPlano.getZoom();
    guardarPlanoLocal(estadoPlano);
  });

  mapaPlano.on("click", (evento) => {
    if (capturarClickAjusteImagenPlano(evento.latlng)) return;
    if (!dibujoPlanoActivo) return;
    agregarPuntoDibujoPlano(evento.latlng);
  });

  formPlano.addEventListener("submit", (e) => {
    manejarSubmitPlano(e).catch((error) => {
      alert(`No se pudo guardar el plano: ${mensajeDesdeError(error)}`);
    });
  });

  if (planoOpacidad) {
    planoOpacidad.addEventListener("input", () => {
      if (!estadoPlano) return;
      estadoPlano.opacidadImagen = Number(planoOpacidad.value || 0.65);
      guardarPlanoLocal(estadoPlano);
      actualizarImagenPlanoEnMapa();
      renderResumenPlano();
    });
  }

  if (planoArchivo) {
    planoArchivo.addEventListener("change", manejarCambioArchivoPlano);
  }

  if (btnCentrarPlano) {
    btnCentrarPlano.addEventListener("click", centrarPlanoEnVista);
  }

  if (btnRestaurarPlano) {
    btnRestaurarPlano.addEventListener("click", restaurarPlanoBase);
  }

  if (btnAjustarImagenPlano) {
    btnAjustarImagenPlano.addEventListener("click", alternarAjusteImagenPlano);
  }

  if (btnResetAjusteImagenPlano) {
    btnResetAjusteImagenPlano.addEventListener("click", resetAjusteImagenPlano);
  }

  if (btnIniciarDibujoPlano) {
    btnIniciarDibujoPlano.addEventListener("click", iniciarDibujoPlano);
  }

  if (btnFinalizarDibujoPlano) {
    btnFinalizarDibujoPlano.addEventListener("click", finalizarDibujoPlano);
  }

  if (btnCancelarDibujoPlano) {
    btnCancelarDibujoPlano.addEventListener("click", cancelarDibujoPlano);
  }

  if (seccionPlano) {
    seccionPlano.addEventListener("toggle", () => {
      if (!seccionPlano.open || !mapaPlano) return;

      setTimeout(() => {
        mapaPlano.invalidateSize();
      }, 120);
    });
  }

  actualizarControlesDibujoPlano();
  actualizarEstadoImagenPlano();
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

function guardarEnStorageSeguro(clave, valorSerializado, nombreRecurso = "datos") {
  try {
    localStorage.setItem(clave, valorSerializado);
  } catch (error) {
    const esCuota = error
      && (error.name === "QuotaExceededError" || error.code === 22 || error.code === 1014);

    if (esCuota) {
      throw new Error(`No hay espacio local para guardar ${nombreRecurso}. Eliminá fotos o datos antiguos e intentá de nuevo.`);
    }

    throw new Error(`No se pudo guardar ${nombreRecurso} en este navegador.`);
  }
}

function guardarHuertoLocal(lista) {
  guardarEnStorageSeguro(STORAGE_KEY_HUERTO, JSON.stringify(lista), "MiHuerto");
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
  guardarEnStorageSeguro(STORAGE_ANOTACIONES_HUERTO_KEY, JSON.stringify(mapa), "las anotaciones de MiHuerto");
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

function normalizarGaleriaFotos(galeria) {
  if (!Array.isArray(galeria)) return [];

  return galeria
    .map((item, index) => {
      const url = obtenerRutaImagen(item?.url || item?.foto || "");
      if (!url) return null;

      const fecha = String(item?.fecha || "").trim();
      return {
        id: String(item?.id || `foto-${index}`),
        fecha,
        url
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
    historial: normalizarHistorialAnotaciones(guardada.historial),
    galeriaFotos: normalizarGaleriaFotos(guardada.galeriaFotos)
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
  const galeriaFotos = normalizarGaleriaFotos(actualizado.galeriaFotos);
  const sinGaleria = galeriaFotos.length === 0;

  if (sinFecha && sinFoto && sinHistorial && sinGaleria) {
    delete mapa[clave];
  } else {
    mapa[clave] = {
      fechaAnotacion: actualizado.fechaAnotacion || "",
      foto: actualizado.foto || "",
      historial,
      galeriaFotos
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
  if (!debeUsarNubeHuerto()) {
    return cargarHuertoLocal();
  }

  let data;
  let error;

  try {
    const resultado = await supabaseClient
      .from("huerto")
      .select("id, planta, fecha_inicio, cantidad, es_por_semilla, lugar, notas, fecha_anotacion, foto_url, historial_json, created_at")
      .order("created_at", { ascending: false });
    data = resultado.data;
    error = resultado.error;
  } catch (errorDeRed) {
    if (desactivarNubePorErrorDeRed(errorDeRed, "carga de cultivos")) {
      return cargarHuertoLocal();
    }

    console.error("No se pudo cargar MiHuerto desde Supabase:", mensajeDesdeError(errorDeRed));
    return cargarHuertoLocal();
  }

  if (error) {
    const esErrorColumnasAnotacion = /fecha_anotacion|foto_url|historial_json/i.test(error.message || "");

    if (esErrorColumnasAnotacion) {
      let dataBase;
      let errorBase;

      try {
        const resultadoBase = await supabaseClient
          .from("huerto")
          .select("id, planta, fecha_inicio, cantidad, es_por_semilla, lugar, notas, created_at")
          .order("created_at", { ascending: false });
        dataBase = resultadoBase.data;
        errorBase = resultadoBase.error;
      } catch (errorDeRedBase) {
        if (desactivarNubePorErrorDeRed(errorDeRedBase, "carga de cultivos base")) {
          return cargarHuertoLocal();
        }

        console.error("No se pudo cargar MiHuerto desde Supabase:", mensajeDesdeError(errorDeRedBase));
        return cargarHuertoLocal();
      }

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
  if (!debeUsarNubeHuerto()) {
    const lista = cargarHuertoLocal();
    lista.push({
      ...cultivo,
      id: cultivo.id ?? Date.now()
    });
    guardarHuertoLocal(lista);
    return;
  }

  try {
    const { error } = await supabaseClient
      .from("huerto")
      .insert(filaDesdeCultivo(cultivo));

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    if (desactivarNubePorErrorDeRed(error, "alta de cultivo")) {
      const lista = cargarHuertoLocal();
      lista.push({
        ...cultivo,
        id: cultivo.id ?? Date.now()
      });
      guardarHuertoLocal(lista);
      return;
    }

    throw new Error(mensajeDesdeError(error, "No se pudo guardar el cultivo"));
  }
}

async function eliminarCultivoPersistido(id) {
  if (!debeUsarNubeHuerto()) {
    const lista = cargarHuertoLocal().filter(item => String(item.id) !== String(id));
    guardarHuertoLocal(lista);
    return;
  }

  try {
    const { error } = await supabaseClient
      .from("huerto")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    if (desactivarNubePorErrorDeRed(error, "eliminación de cultivo")) {
      const lista = cargarHuertoLocal().filter(item => String(item.id) !== String(id));
      guardarHuertoLocal(lista);
      return;
    }

    throw new Error(mensajeDesdeError(error, "No se pudo eliminar el cultivo"));
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
  if (!debeUsarNubeHuerto()) {
    const lista = cargarHuertoLocal().map(item => (
      String(item.id) === String(id)
        ? { ...item, ...cambios }
        : item
    ));
    guardarHuertoLocal(lista);
    return;
  }

  const filaCambios = mapearCambiosCultivoAFila(cambios);
  let error;

  try {
    const resultado = await supabaseClient
      .from("huerto")
      .update(filaCambios)
      .eq("id", id);
    error = resultado.error;
  } catch (errorDeRed) {
    if (desactivarNubePorErrorDeRed(errorDeRed, "actualización de cultivo")) {
      const lista = cargarHuertoLocal().map(item => (
        String(item.id) === String(id)
          ? { ...item, ...cambios }
          : item
      ));
      guardarHuertoLocal(lista);
      return;
    }

    throw new Error(mensajeDesdeError(errorDeRed, "No se pudo actualizar el cultivo"));
  }

  const requiereColumnasAnotacion = Object.prototype.hasOwnProperty.call(filaCambios, "fecha_anotacion")
    || Object.prototype.hasOwnProperty.call(filaCambios, "foto_url")
    || Object.prototype.hasOwnProperty.call(filaCambios, "historial_json");

  if (error && requiereColumnasAnotacion && /fecha_anotacion|foto_url|historial_json/i.test(error.message || "")) {
    const sinAnotaciones = { ...filaCambios };
    delete sinAnotaciones.fecha_anotacion;
    delete sinAnotaciones.foto_url;
    delete sinAnotaciones.historial_json;

    if (Object.keys(sinAnotaciones).length > 0) {
      let resultado;
      try {
        resultado = await supabaseClient
          .from("huerto")
          .update(sinAnotaciones)
          .eq("id", id);
      } catch (errorDeRedSecundario) {
        if (desactivarNubePorErrorDeRed(errorDeRedSecundario, "actualización secundaria de cultivo")) {
          const lista = cargarHuertoLocal().map(item => (
            String(item.id) === String(id)
              ? { ...item, ...cambios }
              : item
          ));
          guardarHuertoLocal(lista);
          return;
        }

        throw new Error(mensajeDesdeError(errorDeRedSecundario, "No se pudo actualizar el cultivo"));
      }

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

  if (!debeUsarNubeHuerto()) {
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

  let error;
  try {
    const resultado = await supabaseClient
      .from("huerto")
      .update({ planta: nombreNuevo })
      .eq("planta", nombreAnterior);
    error = resultado.error;
  } catch (errorDeRed) {
    if (desactivarNubePorErrorDeRed(errorDeRed, "renombre de cultivos")) {
      return;
    }

    console.error("No se pudieron renombrar cultivos en Supabase:", mensajeDesdeError(errorDeRed));
    return;
  }

  if (error) {
    console.error("No se pudieron renombrar cultivos en Supabase:", error.message);
  }
}

async function migrarHuertoLocalASupabaseSiCorresponde() {
  if (!debeUsarNubeHuerto()) return;
  if (localStorage.getItem(STORAGE_MIGRACION_HUERTO_KEY) === "ok") return;

  const local = cargarHuertoLocal();
  if (!local.length) {
    localStorage.setItem(STORAGE_MIGRACION_HUERTO_KEY, "ok");
    return;
  }

  let count;
  let errorConteo;

  try {
    const conteo = await supabaseClient
      .from("huerto")
      .select("id", { count: "exact", head: true });
    count = conteo.count;
    errorConteo = conteo.error;
  } catch (errorDeRed) {
    if (desactivarNubePorErrorDeRed(errorDeRed, "verificación de migración")) {
      return;
    }

    console.error("No se pudo verificar migración de MiHuerto:", mensajeDesdeError(errorDeRed));
    return;
  }

  if (errorConteo) {
    console.error("No se pudo verificar migración de MiHuerto:", errorConteo.message);
    return;
  }

  if ((count || 0) > 0) {
    localStorage.setItem(STORAGE_MIGRACION_HUERTO_KEY, "ok");
    return;
  }

  const filas = local.map(filaDesdeCultivo);
  let error;
  try {
    const resultado = await supabaseClient
      .from("huerto")
      .insert(filas);
    error = resultado.error;
  } catch (errorDeRed) {
    if (desactivarNubePorErrorDeRed(errorDeRed, "migración inicial")) {
      return;
    }

    console.error("No se pudo migrar MiHuerto a Supabase:", mensajeDesdeError(errorDeRed));
    return;
  }

  if (error) {
    console.error("No se pudo migrar MiHuerto a Supabase:", error.message);
    return;
  }

  localStorage.setItem(STORAGE_MIGRACION_HUERTO_KEY, "ok");
}

async function cargarPlantasCustomDesdeNube() {
  if (!debeUsarNubeHuerto()) return null;

  try {
    const { data, error } = await supabaseClient
      .from("plantas_custom")
      .select("origen_nombre, datos_json, es_personalizada");

    if (error) {
      console.error("No se pudo cargar plantas custom desde Supabase:", error.message);
      return null;
    }

    return data || [];
  } catch (errorDeRed) {
    desactivarNubePorErrorDeRed(errorDeRed, "carga de plantas custom");
    return null;
  }
}

async function guardarPlantaCustomEnNube(origenNombre, datosJson, esPersonalizada) {
  if (!debeUsarNubeHuerto()) return;

  try {
    const { error } = await supabaseClient
      .from("plantas_custom")
      .upsert(
        {
          origen_nombre: origenNombre,
          datos_json: datosJson,
          es_personalizada: esPersonalizada,
          updated_at: new Date().toISOString()
        },
        { onConflict: "origen_nombre" }
      );

    if (error) {
      throw new Error(error.message);
    }
  } catch (errorDeRed) {
    if (desactivarNubePorErrorDeRed(errorDeRed, "guardado de planta custom")) return;
    throw new Error(mensajeDesdeError(errorDeRed, "No se pudo guardar la planta en la nube"));
  }
}

async function migrarPlantasLocalesASupabaseSiCorresponde() {
  if (!debeUsarNubeHuerto()) return;
  if (localStorage.getItem(STORAGE_MIGRACION_PLANTAS_KEY) === "ok") return;

  const personalizadas = cargarPlantasPersonalizadas();
  const ediciones = cargarEdicionesPlantas();

  if (!personalizadas.length && !ediciones.length) {
    localStorage.setItem(STORAGE_MIGRACION_PLANTAS_KEY, "ok");
    return;
  }

  const filas = [];

  personalizadas.forEach(planta => {
    const origen = String(planta._origenNombre || planta.nombre || "").trim();
    if (!origen) return;
    filas.push({
      origen_nombre: origen,
      datos_json: limpiarMetadatosPlanta(planta),
      es_personalizada: true,
      updated_at: new Date().toISOString()
    });
  });

  ediciones.forEach(edicion => {
    const origen = String(edicion.origenNombre || "").trim();
    if (!origen || !edicion.planta) return;
    if (filas.some(f => f.origen_nombre.toLowerCase() === origen.toLowerCase())) return;
    filas.push({
      origen_nombre: origen,
      datos_json: edicion.planta,
      es_personalizada: false,
      updated_at: new Date().toISOString()
    });
  });

  if (!filas.length) {
    localStorage.setItem(STORAGE_MIGRACION_PLANTAS_KEY, "ok");
    return;
  }

  try {
    const { error } = await supabaseClient
      .from("plantas_custom")
      .upsert(filas, { onConflict: "origen_nombre" });

    if (error) {
      console.error("No se pudieron migrar plantas locales a Supabase:", error.message);
      return;
    }

    localStorage.setItem(STORAGE_MIGRACION_PLANTAS_KEY, "ok");
  } catch (errorDeRed) {
    if (desactivarNubePorErrorDeRed(errorDeRed, "migración de plantas locales")) return;
    console.error("No se pudieron migrar plantas locales a Supabase:", mensajeDesdeError(errorDeRed));
  }
}

async function cargarYAplicarPlantasCustom() {
  const filasNube = await cargarPlantasCustomDesdeNube();

  if (filasNube !== null) {
    filasNube.forEach(fila => {
      const origen = String(fila.origen_nombre || "").trim();
      const datos = fila.datos_json || {};
      if (!origen) return;

      if (fila.es_personalizada) {
        const existe = plantas.some(
          p => String(p._origenNombre || p.nombre || "").toLowerCase() === origen.toLowerCase()
        );
        if (!existe) {
          plantas.push({
            ...datos,
            _origenNombre: origen,
            _esPersonalizada: true
          });
        }
      } else {
        const index = plantas.findIndex(
          p => String(p._origenNombre || p.nombre || "").toLowerCase() === origen.toLowerCase()
        );
        if (index !== -1) {
          plantas[index] = {
            ...plantas[index],
            ...datos,
            _origenNombre: origen,
            _esPersonalizada: false
          };
        }
      }
    });
    return;
  }

  // Fallback a localStorage si Supabase no está disponible
  combinarPlantasBaseYCustom();
  aplicarEdicionesDePlantas();
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
        : normalizarHistorialAnotaciones(extra.historial),
      galeriaFotos: normalizarGaleriaFotos(cultivo.galeriaFotos).length
        ? normalizarGaleriaFotos(cultivo.galeriaFotos)
        : normalizarGaleriaFotos(extra.galeriaFotos)
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
  guardarEnStorageSeguro(STORAGE_PLANTAS_KEY, JSON.stringify(lista), "las plantas personalizadas");
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
  guardarEnStorageSeguro(STORAGE_EDICIONES_PLANTAS_KEY, JSON.stringify(lista), "las ediciones de plantas");
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

  try {
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

      if (plantaActualizada._esPersonalizada) {
        actualizarPersonalizadasEnStorage(plantaActualizada);
      } else {
        actualizarEdicionesBaseEnStorage(plantaActualizada);
      }

      await guardarPlantaCustomEnNube(
        origenActual,
        limpiarMetadatosPlanta(datosPlanta),
        plantaActualizada._esPersonalizada
      );

      plantas[index] = plantaActualizada;

      await renombrarCultivos(plantaPrev.nombre, plantaActualizada.nombre);
      limpiarModoEdicionPlanta();
    } else {
      const personalizadas = cargarPlantasPersonalizadas();
      personalizadas.push({
        ...datosPlanta,
        _origenNombre: nombre
      });
      guardarPlantasPersonalizadas(personalizadas);

      await guardarPlantaCustomEnNube(nombre, datosPlanta, true);

      const nuevaPlanta = {
        ...datosPlanta,
        _origenNombre: nombre,
        _esPersonalizada: true
      };

      plantas.push(nuevaPlanta);
      formPlanta.reset();
    }
  } catch (error) {
    alert(mensajeDesdeError(error, "No se pudo guardar la planta."));
    return;
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
    const galeriaFotos = normalizarGaleriaFotos(cultivo.galeriaFotos);

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
    const galeriaOrdenada = galeriaFotos
      .slice()
      .sort((a, b) => String(b.fecha || "").localeCompare(String(a.fecha || "")));
    const slides = [];

    if (imagenCultivo) {
      slides.push({
        id: "principal",
        url: imagenCultivo,
        fecha: "",
        etiqueta: "Referencia principal"
      });
    }

    galeriaOrdenada.forEach(foto => {
      slides.push({
        id: foto.id,
        url: foto.url,
        fecha: foto.fecha,
        etiqueta: foto.fecha
          ? `Exposición: ${formatearFecha(new Date(foto.fecha + "T00:00:00"))}`
          : "Exposición (sin fecha)"
      });
    });

    const card = document.createElement("div");
    card.className = "card";
    const nombreSeguro = escaparTextoParaOnclick(cultivo.planta);
    const idSeguro = escaparTextoParaOnclick(String(cultivo.id));
    const notasSeguro = escaparHtml(cultivo.notas || "");
    const fechaAnotacionSeguro = escaparHtml(fechaAnotacion);
    const fotoSeguro = escaparHtml(fotoPersonalizada);
    const fechaFotoExtraSegura = escaparHtml(fechaAnotacion || fechaISOHoy());
    const galeriaResumenHtml = galeriaOrdenada.length
      ? `
        <ul class="historial-lista">
          ${galeriaOrdenada.map(foto => {
            const fotoIdSeguro = escaparTextoParaOnclick(String(foto.id));
            const fechaTexto = foto.fecha
              ? formatearFecha(new Date(foto.fecha + "T00:00:00"))
              : "Sin fecha";
            return `
              <li class="historial-item">
                <div class="historial-texto">
                  <strong>${fechaTexto}</strong>
                </div>
                <div class="acciones">
                  <button type="button" class="btn-danger btn-mini" onclick="eliminarFotoExposicionCultivo('${idSeguro}', '${fotoIdSeguro}')">Eliminar foto</button>
                </div>
              </li>
            `;
          }).join("")}
        </ul>
      `
      : `<p class="historial-vacio">Todavía no agregaste fotos de exposición.</p>`;
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

    const mediaCultivo = slides.length
      ? `
        <div class="carrusel-cultivo">
          <button type="button" class="carrusel-btn carrusel-btn--prev" onclick="moverCarruselCultivo('${idSeguro}', -1)" aria-label="Foto anterior">‹</button>
          <div class="carrusel-track" data-carrusel-id="${idSeguro}">
            ${slides.map(slide => `
              <figure class="carrusel-slide">
                <img src="${escaparHtml(slide.url)}" alt="${escaparHtml(cultivo.planta)}">
                <figcaption>${escaparHtml(slide.etiqueta)}</figcaption>
              </figure>
            `).join("")}
          </div>
          <button type="button" class="carrusel-btn carrusel-btn--next" onclick="moverCarruselCultivo('${idSeguro}', 1)" aria-label="Foto siguiente">›</button>
        </div>
      `
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

            <label class="campo-foto campo-foto-principal" data-tipo-foto="principal">
              Foto (URL o ruta)
              <input type="text" name="fotoUrl" value="${fotoSeguro}" placeholder="/img/mi-planta.jpg o https://...">
            </label>

            <label class="campo-foto campo-foto-principal" data-tipo-foto="principal">
              O subir una foto
              <input type="file" name="fotoArchivo" accept="image/*">
            </label>

            <label>
              Fecha de exposición (foto adicional)
              <input type="date" name="fechaFotoExtra" value="${fechaFotoExtraSegura}">
            </label>

            <label class="campo-foto campo-foto-accesoria" data-tipo-foto="accesoria">
              Foto adicional (URL o ruta)
              <input type="text" name="fotoExtraUrl" placeholder="/img/exposicion.jpg o https://...">
            </label>

            <label class="campo-foto campo-foto-accesoria" data-tipo-foto="accesoria">
              O subir foto adicional
              <input type="file" name="fotoExtraArchivo" accept="image/*">
            </label>

            <label class="opcion-check opcion-check-anotacion" for="quitarFoto-${idSeguro}">
              <input type="checkbox" name="quitarFoto" id="quitarFoto-${idSeguro}">
              Quitar foto personalizada
            </label>

            <div class="acciones">
              <button type="submit" class="btn-secundario">cardar cambio</button>
            </div>
          </form>

          <div class="historial-anotaciones">
            <p><strong>Fotos de exposición:</strong></p>
            ${galeriaResumenHtml}
          </div>
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

    const formularioAnotacion = card.querySelector(".form-anotacion[data-id]");
    if (formularioAnotacion) {
      actualizarEstadoEdicionFotos(formularioAnotacion);
      ["input", "change"].forEach(tipoEvento => {
        formularioAnotacion.addEventListener(tipoEvento, () => {
          actualizarEstadoEdicionFotos(formularioAnotacion);
        });
      });
    }

    contenedorHuerto.appendChild(card);
  });
}

function actualizarEstadoEdicionFotos(formulario) {
  if (!formulario) return;

  const fotoActual = String(formulario.dataset.fotoActual || "").trim();
  const fotoUrlActual = String(formulario.elements.fotoUrl?.value || "").trim();
  const archivoPrincipal = formulario.elements.fotoArchivo?.files?.[0];
  const quitarFoto = Boolean(formulario.elements.quitarFoto?.checked);

  const fotoExtraUrl = String(formulario.elements.fotoExtraUrl?.value || "").trim();
  const archivoExtra = formulario.elements.fotoExtraArchivo?.files?.[0];

  const edicionPrincipal = quitarFoto || Boolean(archivoPrincipal) || fotoUrlActual !== fotoActual;
  const edicionAccesoria = Boolean(archivoExtra) || Boolean(fotoExtraUrl);

  formulario.querySelectorAll('[data-tipo-foto="principal"]').forEach((campo) => {
    campo.classList.toggle("foto-editando", edicionPrincipal);
  });

  formulario.querySelectorAll('[data-tipo-foto="accesoria"]').forEach((campo) => {
    campo.classList.toggle("foto-editando", edicionAccesoria);
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
  const fotoExtraUrl = String(formulario.elements.fotoExtraUrl?.value || "").trim();
  const archivoExtra = formulario.elements.fotoExtraArchivo?.files?.[0];
  const fechaFotoExtra = String(formulario.elements.fechaFotoExtra?.value || "").trim() || fechaISOHoy();
  const fotoActual = String(formulario.dataset.fotoActual || "").trim();
  const anotacionActual = obtenerAnotacionHuertoPorId(id);
  const galeriaActual = normalizarGaleriaFotos(anotacionActual.galeriaFotos);

  let fotoFinal = fotoUrl || fotoActual;
  let fotoExtraFinal = fotoExtraUrl;

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

  if (archivoExtra) {
    try {
      fotoExtraFinal = await leerArchivoComoDataURL(archivoExtra);
    } catch (error) {
      alert(error.message);
      return;
    }
  }

  const galeriaFotos = [...galeriaActual];

  if (fotoExtraFinal) {
    galeriaFotos.unshift({
      id: `foto-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      fecha: fechaFotoExtra,
      url: fotoExtraFinal
    });
  }

  const fotoEsDataUrl = /^data:/i.test(String(fotoFinal || ""));
  const hayFotosDataUrlEnGaleria = galeriaFotos.some(item => /^data:/i.test(String(item.url || "")));
  const cambiosParaNube = {
    notas,
    fechaAnotacion
  };

  // Evita enviar blobs base64 a Supabase: se guardan localmente para que no falle el fetch.
  if (!fotoEsDataUrl) {
    cambiosParaNube.foto = fotoFinal;
  }

  if (!hayFotosDataUrlEnGaleria) {
    cambiosParaNube.galeriaFotos = galeriaFotos;
  }

  let errorSincronizacion = null;

  try {
    await actualizarCultivoPersistido(id, cambiosParaNube);
  } catch (error) {
    errorSincronizacion = error;
  }

  try {
    guardarAnotacionHuertoPorId(id, {
      fechaAnotacion,
      foto: fotoFinal,
      galeriaFotos
    });

    try {
      await refrescarMiHuerto();
    } catch {
      cacheHuerto = cacheHuerto.map(item => (
        String(item.id) === String(id)
          ? {
            ...item,
            notas,
            fechaAnotacion,
            foto: fotoFinal,
            galeriaFotos
          }
          : item
      ));
      renderMiHuerto();
    }

    if (errorSincronizacion) {
      alert(`La foto complementaria se guardó en este dispositivo, pero no se pudo sincronizar todo en la nube: ${mensajeDesdeError(errorSincronizacion)}`);
    }
  } catch (error) {
    alert(`No se pudo guardar la anotación: ${error.message}`);
  }
}

function moverCarruselCultivo(id, direccion) {
  const track = document.querySelector(`[data-carrusel-id="${CSS.escape(String(id))}"]`);
  if (!track) return;

  const ancho = track.clientWidth;
  track.scrollBy({
    left: direccion * ancho,
    behavior: "smooth"
  });
}

async function eliminarFotoExposicionCultivo(id, fotoId) {
  const confirmar = window.confirm("¿Eliminar esta foto de exposición?");
  if (!confirmar) return;

  const anotacion = obtenerAnotacionHuertoPorId(id);
  const galeriaFotos = normalizarGaleriaFotos(anotacion.galeriaFotos)
    .filter(foto => String(foto.id) !== String(fotoId));

  guardarAnotacionHuertoPorId(id, { galeriaFotos });
  await refrescarMiHuerto();
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
  if (cultivo && debeUsarNubeHuerto()) {
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
  if (cultivo && debeUsarNubeHuerto()) {
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
  if (cultivo && debeUsarNubeHuerto()) {
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
    id: debeUsarNubeHuerto() ? undefined : Date.now(),
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
// SECCIONES NAVEGABLES
// ============================

function obtenerDetalleSeccionPorId(idSeccion) {
  const mapa = {
    seccionCatalogo,
    seccionHuerto,
    seccionNotas,
    seccionPlano
  };
  return mapa[idSeccion] || null;
}

function abrirSeccion(idSeccion) {
  const destino = obtenerDetalleSeccionPorId(idSeccion);
  if (!destino) return;

  [seccionCatalogo, seccionHuerto, seccionNotas, seccionPlano]
    .filter(Boolean)
    .forEach(seccion => {
      seccion.open = seccion === destino;
    });

  destino.scrollIntoView({ behavior: "smooth", block: "start" });

  if (destino === seccionPlano && mapaPlano) {
    setTimeout(() => {
      mapaPlano.invalidateSize();
    }, 140);
  }
}

// ============================
// MIS NOTAS
// ============================

function leerArchivosComoDataURL(archivos) {
  return Promise.all(
    Array.from(archivos || []).map(archivo => leerArchivoComoDataURL(archivo))
  );
}

function normalizarMisNotas(lista) {
  if (!Array.isArray(lista)) return [];

  return lista
    .map((nota, index) => {
      const fecha = String(nota?.fecha || "").trim();
      if (!fecha) return null;

      return {
        id: String(nota?.id || `nota-${index}`),
        fecha,
        texto: String(nota?.texto || "").trim(),
        fotos: Array.isArray(nota?.fotos)
          ? nota.fotos.map(f => obtenerRutaImagen(f)).filter(Boolean)
          : [],
        audio: String(nota?.audio || "").trim(),
        creadoEn: String(nota?.creadoEn || "")
      };
    })
    .filter(Boolean)
    .sort((a, b) => String(b.creadoEn || "").localeCompare(String(a.creadoEn || "")));
}

function cargarMisNotas() {
  const guardado = localStorage.getItem(STORAGE_MIS_NOTAS_KEY);
  if (!guardado) return [];

  try {
    return normalizarMisNotas(JSON.parse(guardado));
  } catch {
    return [];
  }
}

function guardarMisNotas(lista) {
  guardarEnStorageSeguro(STORAGE_MIS_NOTAS_KEY, JSON.stringify(normalizarMisNotas(lista)), "las notas personales");
}

function obtenerNombreMesLargo(mes, anio) {
  return new Date(anio, mes, 1).toLocaleDateString("es-UY", {
    month: "long",
    year: "numeric"
  });
}

function obtenerCantidadNotasPorFecha(fecha) {
  return cacheMisNotas.filter(nota => nota.fecha === fecha).length;
}

function renderCalendarioMisNotas() {
  if (!misNotasGrid || !misNotasMesActual) return;

  const primerDia = new Date(anioMisNotasActual, mesMisNotasActual, 1);
  const diasEnMes = new Date(anioMisNotasActual, mesMisNotasActual + 1, 0).getDate();
  const offset = (primerDia.getDay() + 6) % 7;

  misNotasMesActual.textContent = obtenerNombreMesLargo(mesMisNotasActual, anioMisNotasActual);

  const etiquetasSemana = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
  const encabezadoHtml = etiquetasSemana
    .map(etiqueta => `<div class="calendario-dia calendario-dia--encabezado">${etiqueta}</div>`)
    .join("");

  const celdasVacias = Array.from({ length: offset }, () => "<div class=\"calendario-dia calendario-dia--vacio\"></div>").join("");

  const diasHtml = Array.from({ length: diasEnMes }, (_, i) => {
    const dia = i + 1;
    const fecha = new Date(anioMisNotasActual, mesMisNotasActual, dia).toISOString().split("T")[0];
    const cantidad = obtenerCantidadNotasPorFecha(fecha);
    const claseSeleccion = fecha === fechaMisNotasSeleccionada ? "calendario-dia--activo" : "";

    return `
      <button type="button" class="calendario-dia ${claseSeleccion}" onclick="seleccionarFechaMisNotas('${fecha}')">
        <span>${dia}</span>
        ${cantidad ? `<small>${cantidad}</small>` : ""}
      </button>
    `;
  }).join("");

  misNotasGrid.innerHTML = encabezadoHtml + celdasVacias + diasHtml;
}

function renderListadoMisNotasDelDia() {
  if (!contenedorMisNotasDia || !misNotasSeleccionInfo) return;

  const fecha = fechaMisNotasSeleccionada || fechaISOHoy();
  const notasDia = cacheMisNotas.filter(nota => nota.fecha === fecha);
  misNotasSeleccionInfo.innerHTML = `<strong>${formatearFecha(new Date(fecha + "T00:00:00"))}</strong> - ${notasDia.length} nota${notasDia.length === 1 ? "" : "s"}`;

  if (!notasDia.length) {
    contenedorMisNotasDia.innerHTML = "<p>No hay notas para esta fecha.</p>";
    return;
  }

  contenedorMisNotasDia.innerHTML = notasDia
    .map(nota => {
      const fotosHtml = nota.fotos.length
        ? `
          <div class="nota-fotos">
            ${nota.fotos.map(url => `<img src="${escaparHtml(url)}" alt="Foto de nota">`).join("")}
          </div>
        `
        : "";

      const audioHtml = nota.audio
        ? `<audio controls src="${escaparHtml(nota.audio)}"></audio>`
        : "";

      const textoHtml = nota.texto
        ? `<p>${escaparHtml(nota.texto)}</p>`
        : "<p class=\"historial-vacio\">Nota sin texto.</p>";

      return `
        <article class="card nota-card">
          <div class="card-body">
            <h3>${formatearFecha(new Date(nota.fecha + "T00:00:00"))}</h3>
            ${textoHtml}
            ${fotosHtml}
            ${audioHtml}
            <div class="acciones">
              <button type="button" class="btn-danger" onclick="eliminarNotaPersonal('${escaparTextoParaOnclick(nota.id)}')">Eliminar nota</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function refrescarMisNotas() {
  cacheMisNotas = cargarMisNotas();
  renderCalendarioMisNotas();
  renderListadoMisNotasDelDia();
}

function reiniciarAudioTemporalMisNotas() {
  audioNotaTemporal = "";
  if (!previewAudioNota || !estadoAudioNota) return;

  previewAudioNota.pause();
  previewAudioNota.removeAttribute("src");
  previewAudioNota.classList.add("hidden");
  estadoAudioNota.textContent = "Sin audio grabado.";
}

async function alternarGrabacionAudioMisNotas() {
  if (!btnGrabarAudioNota || !estadoAudioNota) return;

  if (grabadoraAudioNota && grabadoraAudioNota.state === "recording") {
    grabadoraAudioNota.stop();
    return;
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Tu navegador no soporta grabación de audio.");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const grabador = new MediaRecorder(stream);
    const trozos = [];

    grabador.ondataavailable = (evento) => {
      if (evento.data && evento.data.size > 0) {
        trozos.push(evento.data);
      }
    };

    grabador.onstop = async () => {
      if (temporizadorAudioNota) {
        clearTimeout(temporizadorAudioNota);
        temporizadorAudioNota = null;
      }

      stream.getTracks().forEach(track => track.stop());
      btnGrabarAudioNota.textContent = "Grabar audio (max 1 min)";

      if (!trozos.length) {
        estadoAudioNota.textContent = "No se detectó audio.";
        return;
      }

      const blob = new Blob(trozos, { type: "audio/webm" });
      try {
        audioNotaTemporal = await leerArchivoComoDataURL(new File([blob], "nota-audio.webm", { type: "audio/webm" }));
        previewAudioNota.src = audioNotaTemporal;
        previewAudioNota.classList.remove("hidden");
        estadoAudioNota.textContent = "Audio grabado listo para guardar.";
      } catch (error) {
        estadoAudioNota.textContent = "No se pudo procesar el audio.";
        alert(mensajeDesdeError(error));
      }
    };

    grabador.start();
    grabadoraAudioNota = grabador;
    btnGrabarAudioNota.textContent = "Detener grabación";
    estadoAudioNota.textContent = "Grabando... (max 60 segundos)";

    temporizadorAudioNota = setTimeout(() => {
      if (grabador.state === "recording") {
        grabador.stop();
      }
    }, 60000);
  } catch (error) {
    alert(`No se pudo iniciar la grabación: ${mensajeDesdeError(error)}`);
  }
}

function dictarTextoMisNotas() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Tu navegador no soporta dictado por voz.");
    return;
  }

  if (reconocimientoVozNotaActivo) {
    reconocimientoVozNotaActivo.stop();
    return;
  }

  const reconocimiento = new SpeechRecognition();
  reconocimiento.lang = "es-UY";
  reconocimiento.interimResults = false;
  reconocimiento.maxAlternatives = 1;

  reconocimiento.onstart = () => {
    reconocimientoVozNotaActivo = reconocimiento;
    btnDictarNota.textContent = "Detener dictado";
  };

  reconocimiento.onresult = (evento) => {
    const texto = String(evento.results?.[0]?.[0]?.transcript || "").trim();
    if (!texto) return;

    misNotasTexto.value = misNotasTexto.value
      ? `${misNotasTexto.value}\n${texto}`
      : texto;
  };

  reconocimiento.onend = () => {
    reconocimientoVozNotaActivo = null;
    btnDictarNota.textContent = "Dictar texto";
  };

  reconocimiento.onerror = () => {
    reconocimientoVozNotaActivo = null;
    btnDictarNota.textContent = "Dictar texto";
  };

  reconocimiento.start();
}

async function manejarSubmitMisNotas(evento) {
  evento.preventDefault();

  const fecha = String(misNotasFecha?.value || "").trim() || fechaISOHoy();
  const texto = String(misNotasTexto?.value || "").trim();
  const fotoUrlTexto = String(misNotasFotoUrl?.value || "").trim();
  const fotoUrls = fotoUrlTexto
    ? fotoUrlTexto.split(",").map(item => obtenerRutaImagen(item)).filter(Boolean)
    : [];

  let fotosArchivo = [];
  if (misNotasFotosArchivo?.files?.length) {
    try {
      fotosArchivo = await leerArchivosComoDataURL(misNotasFotosArchivo.files);
    } catch (error) {
      alert(`No se pudieron leer las fotos: ${mensajeDesdeError(error)}`);
      return;
    }
  }

  const fotos = [...fotoUrls, ...fotosArchivo].filter(Boolean);
  const audio = String(audioNotaTemporal || "").trim();

  if (!texto && !fotos.length && !audio) {
    alert("Agregá texto, fotos o audio para guardar la nota.");
    return;
  }

  cacheMisNotas.unshift({
    id: `nota-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    fecha,
    texto,
    fotos,
    audio,
    creadoEn: new Date().toISOString()
  });

  try {
    guardarMisNotas(cacheMisNotas);
  } catch (error) {
    alert(mensajeDesdeError(error, "No se pudo guardar la nota"));
    return;
  }

  fechaMisNotasSeleccionada = fecha;
  mesMisNotasActual = new Date(fecha + "T00:00:00").getMonth();
  anioMisNotasActual = new Date(fecha + "T00:00:00").getFullYear();
  formMisNotas.reset();
  misNotasFecha.value = fechaISOHoy();
  reiniciarAudioTemporalMisNotas();
  refrescarMisNotas();
}

function seleccionarFechaMisNotas(fecha) {
  fechaMisNotasSeleccionada = fecha;
  renderCalendarioMisNotas();
  renderListadoMisNotasDelDia();
}

function cambiarMesMisNotas(delta) {
  const proximo = new Date(anioMisNotasActual, mesMisNotasActual + delta, 1);
  mesMisNotasActual = proximo.getMonth();
  anioMisNotasActual = proximo.getFullYear();
  renderCalendarioMisNotas();
}

function eliminarNotaPersonal(idNota) {
  const confirmar = window.confirm("¿Eliminar esta nota?");
  if (!confirmar) return;

  cacheMisNotas = cacheMisNotas.filter(nota => String(nota.id) !== String(idNota));
  guardarMisNotas(cacheMisNotas);
  refrescarMisNotas();
}

// ============================
// INIT
// ============================

async function init() {
  fechaMisNotasSeleccionada = fechaISOHoy();
  misNotasFecha.value = fechaISOHoy();
  refrescarMisNotas();

  inicializarMetadatosPlantasBase();
  await cargarYAplicarPlantasCustom();
  filtroMes.value = obtenerMesActual();

  poblarSelectPlantas();
  poblarFiltroCategorias();
  filtrarPlantas();
  await migrarPlantasLocalesASupabaseSiCorresponde();
  await migrarHuertoLocalASupabaseSiCorresponde();
  await refrescarMiHuerto();
  asegurarFechaHuertoInicial();
  inicializarPlanoSolar();

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

  botonesIrSeccion.forEach(boton => {
    boton.addEventListener("click", () => {
      abrirSeccion(String(boton.dataset.irSeccion || ""));
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarVentanaModal();
  });

  formHuerto.addEventListener("submit", manejarSubmitHuerto);
  formPlanta.addEventListener("submit", manejarSubmitPlanta);
  formMisNotas.addEventListener("submit", manejarSubmitMisNotas);
  btnMesNotasPrev.addEventListener("click", () => cambiarMesMisNotas(-1));
  btnMesNotasNext.addEventListener("click", () => cambiarMesMisNotas(1));
  btnDictarNota.addEventListener("click", dictarTextoMisNotas);
  btnGrabarAudioNota.addEventListener("click", alternarGrabacionAudioMisNotas);
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
window.moverCarruselCultivo = moverCarruselCultivo;
window.eliminarFotoExposicionCultivo = eliminarFotoExposicionCultivo;
window.seleccionarFechaMisNotas = seleccionarFechaMisNotas;
window.eliminarNotaPersonal = eliminarNotaPersonal;
window.eliminarZonaPlano = eliminarZonaPlano;

init().catch((error) => {
  console.error("Error al iniciar la app:", error);
});