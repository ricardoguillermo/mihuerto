const contenedorPlantas = document.getElementById("contenedorPlantas");
const buscador = document.getElementById("buscador");
const filtroMes = document.getElementById("filtroMes");
const filtroCategoria = document.getElementById("filtroCategoria");
const resumenMes = document.getElementById("resumenMes");

const modal = document.getElementById("modal");
const modalDetalle = document.getElementById("modalDetalle");
const cerrarModal = document.getElementById("cerrarModal");

const formHuerto = document.getElementById("formHuerto");
const huertoPlanta = document.getElementById("huertoPlanta");
const huertoFecha = document.getElementById("huertoFecha");
const huertoCantidad = document.getElementById("huertoCantidad");
const huertoLugar = document.getElementById("huertoLugar");
const huertoNotas = document.getElementById("huertoNotas");
const huertoPlantaManual = document.getElementById("huertoPlantaManual");
const huertoNoSemilla = document.getElementById("huertoNoSemilla");
const labelHuertoFecha = document.getElementById("labelHuertoFecha");
const contenedorHuerto = document.getElementById("contenedorHuerto");

// ============================
// CONFIG
// ============================

// const STORAGE_KEY = "miHuertoCalendarioSiembra";

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

// ============================
// LOCAL STORAGE
// ============================

function cargarHuerto() {
  const guardado = localStorage.getItem(STORAGE_KEY);
  return guardado ? JSON.parse(guardado) : [];
}

function guardarHuerto(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
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

function actualizarFormularioHuerto() {
  const esManual = huertoPlanta.value === "__manual__";
  const esPorSemilla = !huertoNoSemilla.checked;

  huertoPlantaManual.classList.toggle("hidden", !esManual);
  huertoPlantaManual.required = esManual;
  labelHuertoFecha.textContent = esPorSemilla ? "Fecha de siembra" : "Fecha de incorporación";
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
          <button class="btn-secundario" onclick="abrirModal('${planta.nombre}')">
            Ver detalle
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
    const coincideMes = !mes || planta.meses.includes(mes);
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

// ============================
// MI HUERTO
// ============================

function renderMiHuerto() {
  const lista = cargarHuerto();
  contenedorHuerto.innerHTML = "";

  if (!lista.length) {
    contenedorHuerto.innerHTML = `<p>No hay cultivos todavía.</p>`;
    return;
  }

  lista.forEach(cultivo => {
    const plantaBase = plantas.find(p => p.nombre === cultivo.planta);
    const fechaInicio = cultivo.fechaInicio || cultivo.fechaSiembra;
    const esPorSemilla = cultivo.esPorSemilla !== false;

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
    const notasTexto = cultivo.notas ? `<p><strong>Notas:</strong> ${cultivo.notas}</p>` : "";

    const card = document.createElement("div");
    card.className = "card";
    const tituloCultivo = plantaBase
      ? `<button class="card-link-titulo" type="button" onclick="irACatalogo('${cultivo.planta}')">${cultivo.planta}</button>`
      : cultivo.planta;

    card.innerHTML = `
      ${crearMediaPlanta(plantaBase, cultivo.planta)}
      <div class="card-body">
        <h3>${tituloCultivo}</h3>
        <p><strong>${esPorSemilla ? "Siembra" : "Incorporación"}:</strong> ${formatearFecha(new Date(fechaInicio))}</p>
        ${germinacionTexto}
        ${cosechaTexto}
        ${cantidadTexto}
        <p><strong>Lugar:</strong> ${cultivo.lugar || "-"}</p>
        ${calendarioTexto}
        ${notasTexto}
        <span class="estado ${estado.clase}">${estado.texto}</span>

        <div class="acciones">
          <button class="btn-danger" onclick="eliminarCultivo(${cultivo.id})">
            Eliminar
          </button>
        </div>
      </div>
    `;

    contenedorHuerto.appendChild(card);
  });
}

function eliminarCultivo(id) {
  const lista = cargarHuerto().filter(item => item.id !== id);
  guardarHuerto(lista);
  renderMiHuerto();
}

function manejarSubmitHuerto(e) {
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
    id: Date.now(),
    planta: nombreCultivo,
    fechaInicio: huertoFecha.value,
    cantidad,
    esPorSemilla: !huertoNoSemilla.checked,
    lugar: huertoLugar.value.trim(),
    notas: huertoNotas.value.trim()
  };

  const lista = cargarHuerto();
  lista.push(nuevaSiembra);
  guardarHuerto(lista);

  formHuerto.reset();
  actualizarFormularioHuerto();
  renderMiHuerto();
}

// ============================
// INIT
// ============================

function init() {
  filtroMes.value = obtenerMesActual();

  poblarSelectPlantas();
  filtrarPlantas();
  renderMiHuerto();

  buscador.addEventListener("input", filtrarPlantas);
  filtroMes.addEventListener("change", filtrarPlantas);
  filtroCategoria.addEventListener("change", filtrarPlantas);
  huertoPlanta.addEventListener("change", actualizarFormularioHuerto);
  huertoNoSemilla.addEventListener("change", actualizarFormularioHuerto);

  cerrarModal.addEventListener("click", cerrarVentanaModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarVentanaModal();
  });

  formHuerto.addEventListener("submit", manejarSubmitHuerto);
  actualizarFormularioHuerto();
}

window.abrirModal = abrirModal;
window.eliminarCultivo = eliminarCultivo;
window.irACatalogo = irACatalogo;

init();