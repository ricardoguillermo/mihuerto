// 1. Base de datos inicial (Tabla de plantas)
/* const plantas = [
    {
        nombre: "Acelga",
        meses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Casi todo el año
        germina: 8,
        cosecha: 70,
        macetaMin: "20cm profundidad",
        macetaIdeal: "30cm (15L)",
        tips: "Cosecha las hojas exteriores para que siga produciendo.",
        imgEtapa1: "https://images.unsplash.com/photo-1598112972545-84373a444ca0?auto=format&fit=crop&w=300&q=80", // Brote genérico
        imgEtapa2: "https://images.unsplash.com/photo-1508500351473-883a6c0269f6?auto=format&fit=crop&w=300&q=80"  // Acelga madura
    },
    {
        nombre: "Espinaca",
        meses: [2, 3, 4, 5, 6, 7], // Prefiere el frío de Canelones
        germina: 12,
        cosecha: 50,
        macetaMin: "15cm profundidad",
        macetaIdeal: "20cm (longitudinal)",
        tips: "Mucho nitrógeno. No le gusta el calor fuerte de noviembre.",
        imgEtapa1: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&w=300&q=80",
        imgEtapa2: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80"
    },
    {
        nombre: "Habas",
        meses: [3, 4, 5, 6], // Ideal para plantar AHORA en Uruguay
        germina: 14,
        cosecha: 150,
        macetaMin: "30cm profundidad",
        macetaIdeal: "Cantero profundo",
        tips: "Fijan nitrógeno al suelo. Ideales para mejorar la tierra.",
        imgEtapa1: "https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?auto=format&fit=crop&w=300&q=80",
        imgEtapa2: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=300&q=80"
    },
    {
        nombre: "Cebolla de Verdeo",
        meses: [2, 3, 4, 5, 6, 7, 8],
        germina: 15,
        cosecha: 120,
        macetaMin: "15cm profundidad",
        macetaIdeal: "Cajón de 20cm",
        tips: "Puedes usar la base de una cebolla comprada para rebrotar.",
        imgEtapa1: "https://images.unsplash.com/photo-1597362868123-d5144e05430c?auto=format&fit=crop&w=300&q=80",
        imgEtapa2: "https://images.unsplash.com/photo-1581074817532-a36282924403?auto=format&fit=crop&w=300&q=80"
    },
    {
        nombre: "Caléndula (Flor)",
        meses: [2, 3, 4, 5, 6, 7, 8],
        germina: 10,
        cosecha: 90, // Tiempo a floración
        macetaMin: "20x20 cm",
        macetaIdeal: "Maceta mediana",
        tips: "Atrae polinizadores y ayuda a controlar plagas.",
        imgEtapa1: "https://images.unsplash.com/photo-1618214227918-62287c80088b?auto=format&fit=crop&w=300&q=80",
        imgEtapa2: "https://images.unsplash.com/photo-1588691350645-3129487c067d?auto=format&fit=crop&w=300&q=80"
    }
]; */


/* const plantas = [
{
    nombre: "Lechuga",
    categoria: "Comestible",
    humedad: "Media-Alta",
    meses: [2,3,4,5,6,7,8,9],
    germina: 5,
    cosecha: 60,
    macetaMin: "15cm",
    macetaIdeal: "20cm (10L)",
    tips: "Prefiere clima fresco. Evitar calor extremo.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Espinaca",
    categoria: "Comestible",
    humedad: "Media",
    meses: [3,4,5,6,7,8],
    germina: 7,
    cosecha: 50,
    macetaMin: "15cm",
    macetaIdeal: "20cm",
    tips: "Ideal otoño-invierno. Rica en hierro.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Rúcula",
    categoria: "Comestible",
    humedad: "Media",
    meses: [2,3,4,5,6,7,8,9],
    germina: 4,
    cosecha: 40,
    macetaMin: "10cm",
    macetaIdeal: "15cm",
    tips: "Crece rápido. Sabor picante.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Zanahoria",
    categoria: "Raíz",
    humedad: "Media",
    meses: [3,4,5,6,7,8],
    germina: 10,
    cosecha: 90,
    macetaMin: "25cm prof.",
    macetaIdeal: "30cm",
    tips: "Sustrato suelto sin piedras.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Remolacha",
    categoria: "Raíz",
    humedad: "Media",
    meses: [2,3,4,5,6,7],
    germina: 8,
    cosecha: 80,
    macetaMin: "20cm",
    macetaIdeal: "25cm",
    tips: "También se comen las hojas.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Papa",
    categoria: "Tubérculo",
    humedad: "Media",
    meses: [8,9,10],
    germina: 15,
    cosecha: 120,
    macetaMin: "30cm",
    macetaIdeal: "Bolsa cultivo 40L",
    tips: "Ir agregando tierra a medida que crece.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Cebolla",
    categoria: "Bulbo",
    humedad: "Media-Baja",
    meses: [3,4,5,6],
    germina: 12,
    cosecha: 120,
    macetaMin: "20cm",
    macetaIdeal: "25cm",
    tips: "No encharcar.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Ajo",
    categoria: "Bulbo",
    humedad: "Baja",
    meses: [4,5,6],
    germina: 15,
    cosecha: 150,
    macetaMin: "20cm",
    macetaIdeal: "25cm",
    tips: "Plantar dientes separados.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Perejil",
    categoria: "Aromática",
    humedad: "Media",
    meses: [2,3,4,5,6,7,8],
    germina: 20,
    cosecha: 70,
    macetaMin: "15cm",
    macetaIdeal: "20cm",
    tips: "Germinación lenta.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Albahaca",
    categoria: "Aromática",
    humedad: "Media",
    meses: [9,10,11,12],
    germina: 6,
    cosecha: 60,
    macetaMin: "15cm",
    macetaIdeal: "20cm",
    tips: "No tolera frío.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Romero",
    categoria: "Aromática",
    humedad: "Baja",
    meses: [3,4,5,9,10],
    germina: 20,
    cosecha: 120,
    macetaMin: "20cm",
    macetaIdeal: "30cm",
    tips: "Muy resistente. Poco riego.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Orégano",
    categoria: "Aromática",
    humedad: "Baja",
    meses: [3,4,5,9],
    germina: 10,
    cosecha: 90,
    macetaMin: "15cm",
    macetaIdeal: "20cm",
    tips: "Prefiere sol pleno.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Menta",
    categoria: "Aromática",
    humedad: "Alta",
    meses: [2,3,4,5,9,10],
    germina: 12,
    cosecha: 60,
    macetaMin: "20cm",
    macetaIdeal: "25cm",
    tips: "Muy invasiva. Mejor en maceta.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Lavanda",
    categoria: "Flor / Decorativa",
    humedad: "Baja",
    meses: [3,4,9],
    germina: 15,
    cosecha: 120,
    macetaMin: "20cm",
    macetaIdeal: "30cm",
    tips: "Ama el sol y suelo seco.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Petunia",
    categoria: "Flor / Decorativa",
    humedad: "Media",
    meses: [8,9,10],
    germina: 7,
    cosecha: 90,
    macetaMin: "15cm",
    macetaIdeal: "20cm",
    tips: "Floración abundante.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Zapallito",
    categoria: "Fruto",
    humedad: "Media-Alta",
    meses: [9,10,11],
    germina: 6,
    cosecha: 60,
    macetaMin: "30cm",
    macetaIdeal: "40L",
    tips: "Mucho sol y espacio.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Pepino",
    categoria: "Fruto",
    humedad: "Media-Alta",
    meses: [9,10,11],
    germina: 5,
    cosecha: 70,
    macetaMin: "25cm",
    macetaIdeal: "30L",
    tips: "Necesita tutor.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Morrón",
    categoria: "Fruto",
    humedad: "Media",
    meses: [8,9,10],
    germina: 10,
    cosecha: 90,
    macetaMin: "25cm",
    macetaIdeal: "20L",
    tips: "Requiere calor.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Frutilla",
    categoria: "Fruto",
    humedad: "Media",
    meses: [3,4,5],
    germina: 14,
    cosecha: 120,
    macetaMin: "15cm",
    macetaIdeal: "20cm",
    tips: "Ideal en macetas colgantes.",
    imgEtapa1: "",
    imgEtapa2: ""
},
{
    nombre: "Repollo",
    categoria: "Comestible",
    humedad: "Media",
    meses: [3,4,5,6],
    germina: 7,
    cosecha: 120,
    macetaMin: "25cm",
    macetaIdeal: "30cm",
    tips: "Prefiere frío.",
    imgEtapa1: "",
    imgEtapa2: ""
}
];
 */


/* const plantas = [
    // ================= YA TENÍAS =================
    {
        nombre: "Acelga",
        categoria: "Comestible",
        humedad: "Media-Alta",
        meses: [1,2,3,4,5,6,7,8,9,10],
        estacion: "Todo el año",
        germina: 8,
        cosecha: 70,
        macetaMin: "20cm prof.",
        macetaIdeal: "30cm (15L)",
        tips: "Cosecha hojas externas. Alta en nitrógeno.",
        imgEtapa1: "https://images.unsplash.com/photo-1598112972545-84373a444ca0?auto=format&fit=crop&w=300",
        imgEtapa2: "https://images.unsplash.com/photo-1508500351473-883a6c0269f6?auto=format&fit=crop&w=300"
    },

    // ================= HOJAS =================
    {
        nombre: "Lechuga",
        categoria: "Comestible",
        humedad: "Media-Alta",
        meses: [2,3,4,5,6,7,8,9],
        estacion: "Otoño-Invierno",
        germina: 5,
        cosecha: 60,
        macetaMin: "15cm",
        macetaIdeal: "20cm",
        tips: "Evitar calor fuerte.",
        imgEtapa1: "https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=300",
        imgEtapa2: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=300"
    },
    {
        nombre: "Espinaca",
        categoria: "Comestible",
        humedad: "Media",
        meses: [3,4,5,6,7,8],
        estacion: "Invierno",
        germina: 7,
        cosecha: 50,
        macetaMin: "15cm",
        macetaIdeal: "20cm",
        tips: "Crece rápido con frío.",
        imgEtapa1: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300",
        imgEtapa2: "https://images.unsplash.com/photo-1604908177225-4e2c2c2d8ef1?auto=format&fit=crop&w=300"
    },
    {
        nombre: "Rúcula",
        categoria: "Comestible",
        humedad: "Media",
        meses: [2,3,4,5,6,7,8,9],
        estacion: "Otoño-Primavera",
        germina: 4,
        cosecha: 40,
        macetaMin: "10cm",
        macetaIdeal: "15cm",
        tips: "Muy rápida.",
        imgEtapa1: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=300",
        imgEtapa2: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=300"
    },

    // ================= RAICES =================
    {
        nombre: "Zanahoria",
        categoria: "Raíz",
        humedad: "Media",
        meses: [3,4,5,6,7,8],
        estacion: "Invierno",
        germina: 10,
        cosecha: 90,
        macetaMin: "25cm",
        macetaIdeal: "30cm",
        tips: "Tierra suelta.",
        imgEtapa1: "https://images.unsplash.com/photo-1582515073490-dc6b9d1c7d5c?auto=format&fit=crop&w=300",
        imgEtapa2: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=300"
    },
    {
        nombre: "Remolacha",
        categoria: "Raíz",
        humedad: "Media",
        meses: [2,3,4,5,6,7],
        estacion: "Otoño",
        germina: 8,
        cosecha: 80,
        macetaMin: "20cm",
        macetaIdeal: "25cm",
        tips: "También hojas comestibles.",
        imgEtapa1: "https://images.unsplash.com/photo-1572441713132-51c75654db73?auto=format&fit=crop&w=300",
        imgEtapa2: "https://images.unsplash.com/photo-1615486369736-610e4a68b7a1?auto=format&fit=crop&w=300"
    },

    // ================= AROMATICAS =================
    {
        nombre: "Albahaca",
        categoria: "Aromática",
        humedad: "Media",
        meses: [9,10,11,12],
        estacion: "Verano",
        germina: 6,
        cosecha: 60,
        macetaMin: "15cm",
        macetaIdeal: "20cm",
        tips: "No soporta frío.",
        imgEtapa1: "https://images.unsplash.com/photo-1592928302636-c83cf1f9c8b3?auto=format&fit=crop&w=300",
        imgEtapa2: "https://images.unsplash.com/photo-1604908177225-4e2c2c2d8ef1?auto=format&fit=crop&w=300"
    },
    {
        nombre: "Romero",
        categoria: "Aromática",
        humedad: "Baja",
        meses: [3,4,5,9],
        estacion: "Todo el año",
        germina: 20,
        cosecha: 120,
        macetaMin: "20cm",
        macetaIdeal: "30cm",
        tips: "Muy resistente.",
        imgEtapa1: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=300",
        imgEtapa2: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=300"
    },
    {
        nombre: "Menta",
        categoria: "Aromática",
        humedad: "Alta",
        meses: [2,3,4,5,9,10],
        estacion: "Primavera",
        germina: 12,
        cosecha: 60,
        macetaMin: "20cm",
        macetaIdeal: "25cm",
        tips: "Muy invasiva.",
        imgEtapa1: "https://images.unsplash.com/photo-1628556270448-4d4e1f8a2d2b?auto=format&fit=crop&w=300",
        imgEtapa2: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=300"
    },

    // ================= FRUTOS =================
    {
        nombre: "Tomate",
        categoria: "Fruto",
        humedad: "Media",
        meses: [8,9,10,11],
        estacion: "Primavera-Verano",
        germina: 7,
        cosecha: 90,
        macetaMin: "30cm",
        macetaIdeal: "20L",
        tips: "Mucho sol.",
        imgEtapa1: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&w=300",
        imgEtapa2: "https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=300"
    },
    {
        nombre: "Pepino",
        categoria: "Fruto",
        humedad: "Media-Alta",
        meses: [9,10,11],
        estacion: "Verano",
        germina: 5,
        cosecha: 70,
        macetaMin: "25cm",
        macetaIdeal: "30L",
        tips: "Necesita tutor.",
        imgEtapa1: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=300",
        imgEtapa2: "https://images.unsplash.com/photo-1582515073490-dc6b9d1c7d5c?auto=format&fit=crop&w=300"
    },

    // ================= FLORES =================
    {
        nombre: "Lavanda",
        categoria: "Flor / Decorativa",
        humedad: "Baja",
        meses: [3,4,9],
        estacion: "Primavera",
        germina: 15,
        cosecha: 120,
        macetaMin: "20cm",
        macetaIdeal: "30cm",
        tips: "Ama el sol.",
        imgEtapa1: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=300",
        imgEtapa2: "https://images.unsplash.com/photo-1474511014561-3c50cf38fd46?auto=format&fit=crop&w=300"
    },
    {
        nombre: "Girasol",
        categoria: "Flor / Decorativa",
        humedad: "Media",
        meses: [9,10,11],
        estacion: "Verano",
        germina: 7,
        cosecha: 90,
        macetaMin: "30cm",
        macetaIdeal: "40cm",
        tips: "Necesita sol pleno.",
        imgEtapa1: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300",
        imgEtapa2: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=300"
    }

    // 👉 puedo seguir hasta 100+ si querés
]; */
// 2. Función para calcular fechas
function calcularFecha(dias) {
    let fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    return fecha.toLocaleDateString('es-UY', { day: 'numeric', month: 'short' });
}

// 3. Renderizar las plantas según el mes actual
const contenedor = document.getElementById('contenedor-plantas');
const mesActual = new Date().getMonth() + 1; // 1 = Enero, 12 = Diciembre

function mostrarPlantas() {
    const aptas = plantas.filter(p => p.meses.includes(mesActual));
    
    aptas.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${p.nombre}</h2>
            <div class="etapas">
                <img src="${p.imgEtapa1}" alt="Brote">
                <img src="${p.imgEtapa2}" alt="Cosecha">
            </div>
            <div class="info">
                <p><b>Germinará aprox:</b> ${calcularFecha(p.germina)}</p>
                <p><b>Cosecharás aprox:</b> ${calcularFecha(p.cosecha)}</p>
                <hr>
                <p>📏 <b>Mínimo:</b> ${p.macetaMin} | 🌟 <b>Ideal:</b> ${p.macetaIdeal}</p>
                <p>💡 <b>Tip:</b> ${p.tips}</p>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

mostrarPlantas();